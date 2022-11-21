import { MutableRef, useRef } from "preact/hooks";
import { HomeProps } from "../interfaces/Home.type.ts";

export default function ChromeWebstoreAuth({
  access_URL
}: HomeProps) {
  const anchor: MutableRef<HTMLAnchorElement | null> = useRef(null);

  return (
    <article class="flex flex-col justify-center items-center" style={{height: '80vh'}}>
      <a href={access_URL} ref={anchor}></a>
      <button
        class="focus:outline-none border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-500 dark:border-green-400 dark:bg-green-400"
        onClick={() => anchor.current != null && anchor.current.click()}
      >
        Get your Access Token
      </button>
    </article>
  );
}
