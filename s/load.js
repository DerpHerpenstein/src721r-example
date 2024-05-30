let z;
window.id = parseInt(document.currentScript.getAttribute("id"));
window.onload = () => {
    appendCB = async () => {
        document.body.innerHTML += `<canvas id="canvas" width="1024px" height="1024px" style="aspect-ratio:1x1;padding:0;margin:auto;display:block;max-width:100%;max-height:100%;position:absolute;top:0;bottom:0;left:0;right:0"></canvas>`;
        let t = new Append();
        try {
            await t.js(["nft.min.js.gz"]);
            await t.js(["A10207619717431880000"]);
            setTimeout(setup, 500);
        } catch (a) {
            await t.error(a, a);
        }
    };
    var t = document.createElement("script");
    t.setAttribute("src", "/s/A6677669155563188000"), document.body.appendChild(t);
};
