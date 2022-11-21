import { Head } from "$fresh/runtime.ts";
import Navigation from "../islands/Navigation.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from '@env';
import ChromeWebstoreAuth from "../islands/ChromeWebstoreAuth.tsx";
import { HomeProps } from "../interfaces/Home.type.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { CLIENT_ID, PORT, REDIRECT_URI } = config();
    const renderableData: HomeProps = { 
      access_URL: `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}${PORT ? ':' + PORT : ''}/authenticated`
    }
    return await ctx.render(renderableData);
    
  },
}

export default function Home({ data }: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>Goofred</title>
      </Head>
      <body>
        <main class="bg-green-100 dark:bg-green-700 min-h-screen w-full transition transition-colors duration-500">
          <Navigation />
          <ChromeWebstoreAuth {...data} />
        </main>
      </body>
    </>
  );
}
