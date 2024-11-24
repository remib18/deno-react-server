enum ConsoleColor {
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
}

export enum LogLevel {
  NOTSET = 0,
  DEBUG = 10,
  INFO = 20,
  WARNING = 30,
  ERROR = 40,
  CRITICAL = 50,
}

export const allowedLogLevels = [
  LogLevel.NOTSET,
  LogLevel.DEBUG,
  LogLevel.INFO,
  LogLevel.WARNING,
  LogLevel.ERROR,
  LogLevel.CRITICAL,
];

export class Logger {
  public static get logLevel(): LogLevel {
    return parseInt(Deno.env.get("LOG_LEVEL") || LogLevel.INFO.toString());
  }

  public static get logLevelName(): string {
    return Logger.levelToString(Logger.logLevel);
  }

  public static debug(area: string, ...message: unknown[]) {
    if (Logger.shouldLog(LogLevel.DEBUG)) {
      console.log(
        Logger.format(
          new Date(),
          area,
          message,
          LogLevel.DEBUG,
          ConsoleColor.Cyan
        )
      );
    }
  }

  public static info(area: string, ...message: unknown[]) {
    if (Logger.shouldLog(LogLevel.INFO)) {
      console.log(
        Logger.format(
          new Date(),
          area,
          message,
          LogLevel.INFO,
          ConsoleColor.White
        )
      );
    }
  }

  public static warning(area: string, ...message: unknown[]) {
    if (Logger.shouldLog(LogLevel.WARNING)) {
      console.log(
        Logger.format(
          new Date(),
          area,
          message,
          LogLevel.WARNING,
          ConsoleColor.Yellow
        )
      );
    }
  }

  public static error(area: string, ...message: unknown[]) {
    if (Logger.shouldLog(LogLevel.ERROR)) {
      console.log(
        Logger.format(
          new Date(),
          area,
          message,
          LogLevel.ERROR,
          ConsoleColor.Red
        )
      );
    }
  }

  private static levelToString(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return "DEB";
      case LogLevel.INFO:
        return "INFO";
      case LogLevel.WARNING:
        return "WARN";
      case LogLevel.ERROR:
        return "ERR";
      case LogLevel.CRITICAL:
        return "CRIT";
      case LogLevel.NOTSET:
        return "____";
    }
  }

  private static shouldLog(level: LogLevel): boolean {
    const logLevel = Deno.env.get("LOG_LEVEL");

    if (logLevel === undefined) {
      return false;
    }

    const logLevelNumber = parseInt(logLevel);

    return level >= logLevelNumber;
  }

  private static format(
    time: Date,
    area: string,
    message: unknown[],
    level: LogLevel,
    color: ConsoleColor = ConsoleColor.White
  ): string {
    const fullMessage = `${time.toISOString()} ${Logger.levelToString(
      level
    )} [${area}] ${message.map(Logger.normalizeString).join(" ")}`;
    if (color === ConsoleColor.White || Deno.noColor) {
      return fullMessage;
    }
    return `\x1b[${color}m${fullMessage}\x1b[0m`;
  }

  private static normalizeString(str: unknown): string {
    if (typeof str === "string" || typeof str === "number" || typeof str === "boolean") {
      return str.toString();
    }
    return JSON.stringify(str);
  }
}
