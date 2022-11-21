import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

const STORE_KEY_THEME = 'theme';

const changeTheme = () => {
    if(!IS_BROWSER) return; 
    const body = document.body;
    
    if(body.className === 'dark') {
        localStorage.setItem(STORE_KEY_THEME, '');
        body.classList.remove('dark');
    } else {
        localStorage.setItem(STORE_KEY_THEME, 'dark');
        body.classList.add('dark');
    }
    
}

export default function Navigation() {

    useEffect(() => {
        if(IS_BROWSER) {
            if (localStorage.getItem(STORE_KEY_THEME) === 'dark' || (localStorage.getItem(STORE_KEY_THEME) == null) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark');
              } else {
                document.body.classList.remove('dark');
              }
        }
    }, [])

    return (
       <nav class="w-full bg-green-200 dark:bg-green-800 p-5 shadow-md flex justify-between items-center transition transition-colors duration-500">
            <h1 class="text-xl text-green-900 dark:text-green-100 font-bold transition transition-colors duration-500">Goofred</h1>

            <button class="flex h-8 items-center justify-center w-8 focus:outline-none" onClick={() => changeTheme()}>
                <span class="border border-green-900 dark:border-green-100 w-6 h-6 block rounded-full overflow-hidden dark:rotate-180 duration-500 transition-all m-0">
                    <span class="block w-full h-full bg-green-900 dark:bg-green-100 translate-x-[50%] transition transition-colors duration-500"></span>
                </span>
            </button>
       </nav>
    )
}
