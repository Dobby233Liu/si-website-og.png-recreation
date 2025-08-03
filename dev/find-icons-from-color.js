import icons from "simple-icons-v4"; // alias of simple-icons@4
import readline from "node:readline/promises";
import { copy } from "copy-paste/promises.js";

const ICONS_BY_COLOR = {};
for (const icon of Object.values(icons))
{
    const hex = icon.hex?.toLowerCase();
    if (!hex) continue;

    if (!ICONS_BY_COLOR.hasOwnProperty(hex))
        ICONS_BY_COLOR[hex] = [];
    ICONS_BY_COLOR[hex].push(icon);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
while (true)
{
    const i = await rl.question("color : ");
    const result = ICONS_BY_COLOR[i.toLowerCase()];
    if (!result || result.length == 0)
    {
        console.log("no icons found");
    }
    else
    {
        for (const icon of result)
            console.log(icon.slug);
        if (result.length == 1)
            copy(result[0].slug);
    }
    console.log("");
}
rl.close();