// "use strict;"

// function convertAllSrcToAbsolute() {
//     /** Convert all src attributes to absolute path */
//     const srcs = document.querySelectorAll("[src]");
//     for (const src of srcs) {
//         const url = new URL(src.src, window.location.href);
//         src.src = url.href;
//     }
// }

(() => {
    function convertAllHrefToAbsolute() {
        /** Convert all href attributes to absolute path */
        const hrefs = document.querySelectorAll("[href]");
        for (const href of hrefs) {
            const url = new URL(href.href, window.location.href);
            href.href = url.href;
            // if the href is one of
            // https://meded.utoronto.ca/medicine/community/utoronto/css/bootstrap.css?release=58.4
            // https://meded.utoronto.ca/medicine/community/utoronto/css/common.css?release=58.4
            // https://meded.utoronto.ca/medicine/community/utoronto/css/style.css?release=58.4
            // Convert it to a relative path by replacing / and ? with _ and remove https:// and add suffix .css
            if (
                href.href == "https://meded.utoronto.ca/medicine/community/utoronto/css/bootstrap.css?release=58.4" ||
                href.href == "https://meded.utoronto.ca/medicine/community/utoronto/css/common.css?release=58.4" ||
                href.href == "https://meded.utoronto.ca/medicine/community/utoronto/css/style.css?release=58.4"
            ) {
                href.href = convertUrlToLocal(href.href) + ".css";
            }
        }
    }

    function convertUrlToLocal(url) {
        /** Convert a url to a filename */
        return url.replace("https://", "").replace(/\//g, "_").replace(/\?/g, "_");
    }

    function downloadCurrentDom() {
        /** Download the current rendered DOM as HTML */
        const html = document.documentElement.outerHTML;
        const blob = new Blob([html], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // Set the download file name to the current window's url
        a.download = convertUrlToLocal(window.location.href) + ".html";
        a.click();
        URL.revokeObjectURL(url);
    }

    // Save a copy of the current DOM
    const originalDom = document.documentElement.innerHTML;
    document.querySelector(".welcome-block")?.remove();
    document.querySelector("#community-my-membership")?.remove();
    document.querySelector("#event-comments-section")?.remove();
    document.querySelector(`.brand > img`).src = "logo.png";
    convertAllHrefToAbsolute();
    downloadCurrentDom();
    // Restore the original DOM
    document.documentElement.innerHTML = originalDom;
})();
