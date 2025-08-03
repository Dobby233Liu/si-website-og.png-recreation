import * as icons from "simple-icons";

export default ((map) => {
    for (const icon of Object.values(icons))
        map[icon.slug] = icon;
    return map;
})({});