import * as design from "./design.js";
import icons from "./icons-by-slug.js";
import { Canvas, Window } from "skia-canvas";
import { renderIcons as renderIcon } from "./render-icons.js";

async function paintIconBox(canvas)
{
    const w = canvas.width, h = canvas.height;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = `#${icons[design.LARGE_ICON].hex}`;
    ctx.fillRect(0, 0, w, h);

    const maxDim = Math.max(w, h);
    const fullWPresumed = maxDim * (design.GAP_SIZE + (design.ICON_SIZE + design.GAP_SIZE) * design.SURROUND_COLUMN_NUM);
    const fullHPresumed = maxDim * (design.GAP_SIZE + (design.ICON_SIZE + design.GAP_SIZE) * design.SURROUND_ROW_NUM);

    const iconSize = maxDim * design.ICON_SIZE;
    const gapSize = maxDim * design.GAP_SIZE;
    const largeIconSize = maxDim * design.LARGE_ICON_SIZE;

    const xStart = (w - fullWPresumed) / 2;
    const yStart = (h - fullHPresumed) / 2;
    const posInc = gapSize + iconSize;

    let x = xStart + gapSize, y = yStart + gapSize;
    async function drawIcon(slug, size=iconSize, fillStyle="colorized-light")
    {
        const img = await renderIcon(slug, fillStyle);
        const aspectRatio = img.width/img.height;
        const iconW = size*aspectRatio, iconH = size;
        ctx.drawImage(img, x, y, iconW, iconH);
    }

    for (const row of design.SURROUNDING_ICONS)
    {
        for (const slug of row)
        {
            if (slug !== null)
                await drawIcon(slug);
            x += posInc;
        }
        x = xStart + gapSize;
        y += posInc;
    }

    x = xStart + fullWPresumed / 2 - largeIconSize / 2;
    y = yStart + fullHPresumed / 2 - largeIconSize / 2;
    await drawIcon(design.LARGE_ICON, largeIconSize, "light");
}

const canvas = new Canvas(...design.IMG_DIMS);
const win = new Window({ canvas: canvas });

await paintIconBox(canvas);
await canvas.saveAs("og.png");