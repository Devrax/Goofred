import { Head } from "$fresh/runtime.ts";
import Navigation from "../../islands/Navigation.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from '@env';

export const handler: Handlers = {
  async GET(req, ctx) {
    let renderableData: any = {};
    const { CLIENT_ID, PORT, REDIRECT_URI, CLIENT_SECRET} = config();
    if(req.url.includes('?code=')) {
      const [code, scope] = decodeURIComponent(req.url).replace(`http://${req.headers.get('host')}/authenticated?code=`, '').split('&scope=');
      console.log(scope, code);

      const requestAccessToken = await fetch(`https://accounts.google.com/o/oauth2/token`, {
        method: 'POST',
        body: JSON.stringify({client_id:CLIENT_ID,client_secret:CLIENT_SECRET,code,grant_type:"authorization_code", redirect_uri: `${REDIRECT_URI}${PORT ? ':' + PORT : ''}/authenticated`})
      });
      const access = await requestAccessToken.json();
      console.log(access.access_token)

      const headers = new Headers();
      headers.append('Authorization', `${access.token_type} ${access.access_token}`);
      headers.append('x-goog-api-version', '2');
      headers.append('Content-Length', '0');
      headers.append('Expect', '');

      const request = await fetch(`https://www.googleapis.com/chromewebstore/v1.1/items/llkpfhlejdgeoefgoelmdhdkhmckoolb?projection=DRAFT`, {
        method: 'GET',
        headers
      });
      renderableData = await request.json();

    }

    return await ctx.render(renderableData);
  },
}

export default function Authenticated({ data }: PageProps<any>) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Goofred</title>
      </Head>
      <body>
        <main class="bg-green-100 dark:bg-green-700 min-h-screen w-full transition transition-colors duration-500">
          <Navigation />
          
        </main>
      </body>
    </>
  );
}
