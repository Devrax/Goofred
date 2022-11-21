import { HandlerContext } from "$fresh/server.ts";

const BASE_URL = 'https://accounts.google.com/o/oauth2/auth';

export const handler = {
  GET: (_req: Request, _ctx: HandlerContext): Response => {
    const body = 'Hello World';
    return new Response(body);
  }
}
