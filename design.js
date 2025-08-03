import assert from "node:assert/strict";
import icons from "./icons-by-slug.js";

export const IMG_DIMS = [1200, 630];

// normalized to 0-1, * max(...IMG_DIMS) //
export const ICON_SIZE = 0.04;
export const LARGE_ICON_SIZE = ICON_SIZE * 3;

// gap between icons on both axises
// note that icons' origin point are (0.5, 0.5)
export const GAP_SIZE = ICON_SIZE;

// always in center
// bg color = brand color of this icon
export const LARGE_ICON = "simpleicons";

// icons that were in v4 but are obsolete -> random available icons in latest
const subst = {
    "virb": "googledisplayandvideo360", // idk
    "twitter": "x",
    "wii": "twitch",
    "twilio": "folo",
    "x-dot-org": "xdotorg",
    "webcomponents-dot-org": "webcomponentsdotorg",
    "trip-dot-com": "tripdotcom",
    "xamarin": "chakraui"
}

export const SURROUNDING_ICONS = [
    ["todoist", "timescale", "tinder", "trove", subst["virb"], "waze", "vivaldi", "vk", "wagtail", "tripadvisor", "tmux", "woo"],
    ["vlcmediaplayer", "v8", "yarn", "viadeo", "wireshark", "xsplit", "unacademy", "ycombinator", "wheniwork", "wish", "webassembly", "ulule"],
    ["trulia", "yale", "wistia", "uikit", "treehouse", null, null, "xrp", "transportforireland", subst["twitter"], "whatsapp", "xdadevelopers"],
    ["wix", "xero", "xiaomi", subst["wii"], "tui", null, null, "xampp", subst["x-dot-org"], "webpack", "xcode", "wattpad"],
    ["webflow", "zorin", "zhihu", "zoiper", "zingat", subst["webcomponents-dot-org"], "udemy", "typescript", subst["trip-dot-com"], "ubuntu", subst["twilio"], "truenas"],
    ["udacity", "webmin", "trustpilot", "vfairs", "wemo", "vultr", "upwork", subst["xamarin"], "zulip", "thunderbird", "travisci", "v"]
];

export const SURROUND_ROW_NUM = 6, SURROUND_COLUMN_NUM = 12;
assert(SURROUNDING_ICONS.length == SURROUND_ROW_NUM);
for (const row of SURROUNDING_ICONS)
{
    assert(row.length == SURROUND_COLUMN_NUM);
    for (const slug of row)
    {
        if (slug === null) continue;
        assert(icons[slug], `Unknown icon ${slug}`);
    }
}