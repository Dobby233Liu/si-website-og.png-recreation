import icons from "./icons-by-slug.js";
import { Image } from "skia-canvas";
import Color from "color";

/**
 * Asynchronously renders an SVG string into an Image object.
 * 
 * @param {string} svg - The SVG string to be rendered.
 * @returns {Promise<Image>} A promise that resolves to the rendered Image object.
 * @throws {Error} If the SVG string is invalid or the image fails to decode.
 */
async function renderSvg(svg)
{
    const img = new Image();
    img.src = Buffer.from(svg, "utf-8");
    await img.decode();
    return img;
}

/**
 * Renders an icon with the specified fill style.
 * 
 * @param {string|Object} icon - The icon to render. Can be either a string (icon ID) or an icon object containing svg and hex properties.
 * @param {"colorized"|"colorized-light"|"light"} [fillStyle="light"] - The fill style to apply to the icon.
 * @returns {Promise} A promise that resolves with the rendered SVG.
 * @throws {Error} Throws an error if the specified icon ID does not exist in the icons object.
 */
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
            const lightness = color.lightness();
            // I have no idea what I'm doing LOL
            if (lightness <= 12.5)
                color = color.lightness(100 - lightness);
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