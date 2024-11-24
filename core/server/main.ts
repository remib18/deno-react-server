import {Middleware, Server} from './server.ts';

const server = new Server();

const homeMiddleware: Middleware = async (ctx, next) => {
	const data = {
		headers: ctx.headers,
		query: ctx.query,
		body: await ctx.body,
		method: ctx.method,
		pathname: ctx.pathname
	}
	ctx.response = new Response(JSON.stringify(data), {
		headers: new Headers({
			"Content-Type": "application/json"
		})
	});
	await next();
}

server.register(homeMiddleware);

server.listen(3000);