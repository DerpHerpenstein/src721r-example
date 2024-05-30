let rotation= { x: 0, y: 0, z: 0};
let speed = -0.15;

let bgColor = ["#FF7777", "#77FF77", "#7777FF", "#FFFF77", "#FFFF77", "#77FFFF"]
let cubeColor = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFF00", "#00FFFF"]

let coefficients = {
    bg: [1000, 2000, 3000, 5000, 7000, 10000],                         
    cube: [1000, 2000,4000, 6000, 8000, 10000],             
};

let seeds = {
    bg:1,
	cube:2,
};

function createSVG(color){
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 100 100">
				<style>
					.derp {
					font: bold 20px serif;
					fill: black;
					}
				</style>
				<rect width="100%" height="100%" fill="${color}"/>
				<text x="8" y="25" class="derp">SRC721R</text>
			</svg>`;
}

function addTexture(svgData, id){
	console.log(svgData);
	let sd = "data:image/svg+xml;base64," + btoa(svgData);
	var si = new Image();
	si.src = sd;
	si.id = id;
	si.hidden = true;
	document.body.appendChild(si);
}

let setupImage = async() => {
	bgIndex = await getTrait(coefficients.bg, seeds.bg, window.id)
	cubeIndex = await getTrait(coefficients.cube, seeds.cube, window.id)
	console.log(createSVG(bgColor[bgIndex]))
	addTexture(createSVG(bgColor[bgIndex]), "bgsvg");
	addTexture(createSVG(cubeColor[cubeIndex]), "cubesvg");

}
setupImage();

setup = () => {

	W.reset(canvas);
	W.camera({rx:-3,y:2,z:3});
	W.ambient(1);
	W.cube({n:"sign", w:1, h:1, d:1, b:"#222", mix:0.5, t:cubesvg, y:1.75, z:-1.25 });
	W.plane({n:"backf", size:7, b:"#222", mix:0.5, t:bgsvg, y:2, z:-5, rx:0});
	draw();
}

draw = () => {
	requestAnimationFrame(draw);
	rotation.x+=speed;
	rotation.y+=speed;
	W.move({n:"sign", rx:rotation.x, ry:rotation.y, rz:rotation.z});
}




// Trait generation related functions
function bufferToHex(buffer) {
	return [...new Uint8Array(buffer)]
		.map(b => b.toString(16).padStart(2, "0"))
		.join("");
}

async function sha256(seed) {
	const encoder = new TextEncoder();
	const data = encoder.encode(seed);
	try {
		const hash = await crypto.subtle.digest("SHA-256", data);
		return hash;
	} catch (e) {
		return new Uint8Array([39, 15]);// most generic, occurs when no https or localhost because of the crypto library
	}
}

async function getTrait(coefficients, seed, id) {
	let layerSeed = bufferToHex(await sha256(seed + id));
	layerSeed = BigInt('0x' + layerSeed) % 10000n;
	for (let i = 0; i < coefficients.length; i++)
		if (layerSeed <= coefficients[i])
			return (i)
}