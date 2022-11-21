import { HandlerContext } from "$fresh/server.ts";

export const handler = {
  GET: (_req: Request, _ctx: HandlerContext): Response => {
    const body = 'Hello World';
    return new Response(body);
  }
}
