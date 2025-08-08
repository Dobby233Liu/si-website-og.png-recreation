import * as design from "./design.js";
import icons from "./icons-by-slug.js";
import { Canvas, Window } from "skia-canvas";
import { renderIcons as renderIcon } from "./render-icons.js";

/**
 * @param {Canvas} canvas 
 */
async function paintIconBox(canvas)
{
    const w = canvas.width, h = canvas.height;
    const ctx = canvas.getContext("2d");

    // background
    ctx.fillStyle = `#${icons[design.LARGE_ICON].hex}`;
    ctx.fillRect(0, 0, w, h);

    const maxBaseDim = Math.max(w, h);
    const approxAreaW = maxBaseDim * (design.GAP_SIZE + (design.ICON_SIZE + design.GAP_SIZE) * design.SURROUND_COLUMN_NUM);
    const approxAreaH = maxBaseDim * (design.GAP_SIZE + (design.ICON_SIZE + design.GAP_SIZE) * design.SURROUND_ROW_NUM);

    const xOff = (w - approxAreaW) / 2;
    const yOff = (h - approxAreaH) / 2;

    const iconSize = maxBaseDim * design.ICON_SIZE;
    const gapSize = maxBaseDim * design.GAP_SIZE;
    const largeIconSize = maxBaseDim * design.LARGE_ICON_SIZE;

    let x = xOff + gapSize + iconSize/2, y = yOff + gapSize + iconSize/2;
    const posInc = gapSize + iconSize;
    const xStart = x;

    /**
     * @param {string} slug
     */
    async function drawIcon(slug, size=iconSize, fillStyle="colorized-light")
    {
        const img = await renderIcon(slug, fillStyle);
        const aspectRatio = img.width/img.height; // well this is probably always 1 but still
        const iconW = size*aspectRatio, iconH = size;
        ctx.drawImage(img, x - iconW/2, y - iconH/2, iconW, iconH);
    }

    for (const row of design.SURROUNDING_ICONS)
    {
        for (const slug of row)
        {
            if (slug !== null)
                await drawIcon(slug);
            x += posInc;
        }
        x = xStart;
        y += posInc;
    }

    x = xOff + approxAreaW / 2;
    y = yOff + approxAreaH / 2;
    await drawIcon(design.LARGE_ICON, largeIconSize, "light");
}

const canvas = new Canvas(...design.IMG_DIMS);
new Window({ canvas: canvas });

await paintIconBox(canvas);
await canvas.saveAs("og.svg");