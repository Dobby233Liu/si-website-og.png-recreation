import icons from "./icons-by-slug.js";
import { Image } from "skia-canvas";
import Color from "color";

async function renderSvg(svg)
{
    const img = new Image();
    img.src = Buffer.from(svg, "utf-8");
    await img.decode();
    return img;
}

export async function renderIcons(icon, fillStyle)
{
    if (typeof icon == "string")
    {
        const iconId = icon;
        icon = icons[iconId];
        if (!icon)
            throw new Error(`Icon ${iconId} does not exist`);
    }

    let { svg, hex } = icon;
    let color = new Color(`#${hex}`);

    // not going to implement more than these
    switch (fillStyle)
    {
        case "colorized-light":
            // I have no idea what I'm doing LOL
            let lightness = color.lightness();
            if (lightness <= 12.5)
                color = color.lightness(lightness == 0 ? 100 : lightness + 87.5);
            else if (lightness <= 20)
                color = color.lighten(1);
        case "colorized":
            svg = svg.replace("<svg", `<svg fill="${color.hex()}"`);
            break;
        case "light":
        default:
            svg = svg.replace("<svg", `<svg fill="#fff"`);
            break;
    }

    return renderSvg(svg);
}