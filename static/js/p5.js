function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background("#282828"); // Gruvbox dark background
	noFill();
	stroke("#d4be98"); // Gruvbox light foreground
	strokeWeight(2);

	// Reduce sensitivity: wider range for mouseX and mouseY
	let freq = map(mouseX, 0, width, 0.005, 0.02); // Slower frequency change
	let amp = map(mouseY, 0, height, 300, 10); // Slower amplitude change

	// Wave centered at canvas midpoint
	beginShape();
	for (let x = 0; x < width; x++) {
		let y =
			height / 2 + sin((x - width / 2) * freq + frameCount * 0.02) * amp;
		vertex(x, y);
	}
	endShape();

	// Secondary wave with different color and offset
	stroke("#d8a657"); // Gruvbox green
	beginShape();
	for (let x = 0; x < width; x++) {
		let y =
			height / 2 +
			cos((x - width / 2) * freq * 1.5 + frameCount * 0.03) * (amp * 0.5);
		vertex(x, y);
	}
	endShape();
}
