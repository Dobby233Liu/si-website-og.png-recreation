import * as icons from "simple-icons";

/**
 * @type {Record<string, import("simple-icons").SimpleIcon>}
 */
export default ((map) => {
    for (const icon of Object.values(icons))
        map[icon.slug] = icon;
    return map;
})({});