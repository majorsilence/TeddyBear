/// <reference path="./Timer.ts" />

class Sprite {
	spritesheet: any;
	offsetX: number;
	offsetY: number;
	width: number;
	height: number;
	frames: number;
	currentFrame: number;
	duration: number;
	posX: number;
	posY: number;
	shown: boolean;
	zoomLevel: number;
	ftime: number;

	constructor(src: string, width: number, height: number, offsetX: number, offsetY: number, frames: number, duration: number) {
		this.spritesheet = null;
		this.offsetX = 0;
		this.offsetY = 0;
		this.width = width;
		this.height = height;
		this.frames = 1;
		this.currentFrame = 0;
		this.duration = 1;
		this.posX = 0;
		this.posY = 0;
		this.shown = true;
		this.zoomLevel = 1;

		this.setSpritesheet(src);
		this.setOffset(offsetX, offsetY);
		this.setFrames(frames);
		this.setDuration(duration);

		var d = new Date();
		if (this.duration > 0 && this.frames > 0) {
			this.ftime = d.getTime() + (this.duration / this.frames);
		}
		else {
			this.ftime = 0;
		}
	}

	setSpritesheet(src) {
		if (src instanceof Image) {
			this.spritesheet = src;
		}
		else {
			this.spritesheet = new Image();
			this.spritesheet.src = src;
		}
	}

	setPosition(x: number, y: number) {
		this.posX = x;
		this.posY = y;
	}

	setOffset(x: number, y: number) {
		this.offsetX = x;
		this.offsetY = y;
	}

	setFrames(fcount: number) {
		this.currentFrame = 0;
		this.frames = fcount;
	}

	setDuration(duration: number) {
		this.duration = duration;
	}

	animate(c: CanvasRenderingContext2D, t: Timer) {
		if (t.getMilliseconds() > this.ftime) {
			this.nextFrame();
		}

		this.draw(c);
	}

	nextFrame() {
		if (this.duration > 0) {
			var d = new Date();

			if (this.duration > 0 && this.frames > 0) {
				this.ftime = d.getTime() + (this.duration / this.frames);
			}
			else {
				this.ftime = 0;
			}

			this.offsetX = this.width * this.currentFrame;

			if (this.currentFrame === (this.frames - 1)) {
				this.currentFrame = 0;
			}
			else {
				this.currentFrame++;
			}
		}
	}

	draw(c: CanvasRenderingContext2D) {
		if (this.shown) {
			c.drawImage(this.spritesheet,
				this.offsetX,
				this.offsetY,
				this.width,
				this.height,
				this.posX,
				this.posY,
				this.width * this.zoomLevel,
				this.height * this.zoomLevel);
		}
	}

}