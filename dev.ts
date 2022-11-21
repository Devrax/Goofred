#!/usr/bin/env -S deno run -A --watch=static/,routes/
import dev from "$fresh/dev.ts";
import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

const flags = parse(Deno.args, {
    string: ["configuration"],
    default: { configuration: 'development' }
});

const ENV_TARGET = await Deno.readTextFile(`./environment/.env.${flags.configuration}`);

await Deno.writeTextFile('.env', ENV_TARGET);

await dev(import.meta.url, "./main.ts");
