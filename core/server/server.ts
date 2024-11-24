import { allowedLogLevels, Logger, LogLevel } from "./logger.ts";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

class Context {
  public readonly request: Request;
  public response: Response | null;

  constructor(request: Request, response: Response | null = null) {
    this.request = request;
    this.response = response;
  }

  /**
   * The HTTP method of the request.
   */
  public get method(): HTTPMethod {
    return this.request.method as HTTPMethod;
  }

  /**
   * The path of the request URL.
   */
  public get pathname(): string {
    return new URL(this.request.url).pathname;
  }

  /**
   * The query parameters of the request URL.
   */
  public get query(): Record<string, string> {
    return Object.fromEntries(new URL(this.request.url).searchParams);
  }

  /**
   * The headers of the request.
   */
  public get headers(): Record<string, string> {
    return Object.fromEntries(this.request.headers.entries());
  }

  /**
   * The body of the request.
   */
  public get body(): ReadableStream<Uint8Array> | null {
    return this.request.body;
  }

  /**
   * The parameters of a `FormData` body.
   */
  public get formParams(): Promise<Record<string, string>> {
    if (!this.request.body) {
      return Promise.resolve({});
    }

    return this.request
      .formData()
      .then((formData) => {
        const params: Record<string, string> = {};

        for (const [key, value] of formData.entries()) {
          params[key] = value.toString();
        }

        return params;
      })
      .catch((error) => {
        Logger.error(
          "Server.context",
          `Error parsing form data: ${error.message}`
        );
        return {};
      });
  }
}

export type Middleware = (
  ctx: Context,
  next: () => Promise<void>
) => Promise<void>;

type serverOptions = {
  logRequests: boolean;
}

const defaultServerOptions: serverOptions = {
  logRequests: true
}

export class Server {
  private middlewares: Middleware[] = [];

  constructor(options: serverOptions = defaultServerOptions) {

    if (options.logRequests) {
      this.middlewares.push(Server.logRequestsMiddleware);
    }
    this.middlewares.push(Server.securityHeadersMiddleware);
  }

  public register(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  public listen(port: number, hostname = "0.0.0.0") {
    Deno.serve(
      {
        port,
        onListen: () => {
          Server.verifyAndNormalizeEnvironments();
          Logger.info(
            "Server",
            `Server is listening on ${hostname}:${port}. Available on http://localhost:${port}/`
          );
        },
        onError: (error) => {
          Logger.error(
            "Server",
            // @ts-expect-error - error extends Error
            `Error starting server: ${error?.message ?? "Unknown error"}`
          );
          Deno.exit(1);
        },
      },
      this.handleRequest.bind(this)
    );
  }

  private async handleRequest(request: Request): Promise<Response> {
    const context = new Context(request);

    let index = -1;

    const next = async () => {
      index++;
      if (index < this.middlewares.length) {
        await this.middlewares[index](context, next);
      }
    };

    await next();

    return context.response || new Response("Not found", { status: 404 });
  }

  private static verifyAndNormalizeEnvironments() {
    const logLevel = Deno.env.get("LOG_LEVEL");

    if (logLevel === undefined) {
      Deno.env.set("LOG_LEVEL", LogLevel.INFO.toString());
      Logger.info(
        "Server",
        "LOG_LEVEL environment variable not set, defaulting to INFO."
      );
      return;
    }

    const logLevelNumber = parseInt(logLevel);

    if (isNaN(logLevelNumber)) {
      Logger.error("Server", "LOG_LEVEL environment variable is not a number.");
      Deno.exit(1);
    }

    if (
      !allowedLogLevels.includes(logLevelNumber) ||
      logLevelNumber === LogLevel.NOTSET
    ) {
      Logger.error(
        "Server",
        "LOG_LEVEL environment variable is not in the allowed range."
      );
      Deno.exit(1);
    }

    Logger.info(
      "Server",
      "LOG_LEVEL environment variable set to",
      Logger.logLevelName
    );
  }

  private static get securityHeadersMiddleware(): Middleware {
    return async (ctx, next) => {
      await next();
      if (!ctx.response) {
        throw new Error("Response is not set in the context. Cannot set security headers.");
      }
      ctx.response.headers.set("X-Content-Type-Options", "nosniff");
      ctx.response.headers.set("X-Frame-Options", "DENY");
      ctx.response.headers.set("X-XSS-Protection", "1; mode=block");
    }
  }

  /**
   * Middleware that logs requests.
   * format: [method] path - status (time)
   * @private
   */
  private static get logRequestsMiddleware(): Middleware {
    return async (ctx, next) => {
      const start = Date.now();
      await next();
      const end = Date.now();
      if (!ctx.response) {
        throw new Error("Response is not set in the context. Cannot log request.");
      }
      Logger.info(
        "Server",
        `[${ctx.method}] ${ctx.pathname} - ${ctx.response.status} (${end - start}ms)`
      );
    }
  }
}