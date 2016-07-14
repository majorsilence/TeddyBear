/// <reference path="./Timer.ts" />

var Sprite = function(src: string, width : number, height: number, offsetX : number, offsetY : number, frames :number, duration:number){
	this.spritesheet = null;
	this.offsetYsetX = 0;
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
	if(this.duration > 0 && this.frames > 0){
		this.ftime = d.getTime() + (this.duration / this.frames);
	}
	else{
		this.ftime = 0;
	}
}

Sprite.prototype.setSpritesheet = function(src){
	if(src instanceof Image){
		this.spritesheet = src;
	}
	else{
		this.spritesheet = new Image();
		this.spritesheet.src = src;
	}
}

Sprite.prototype.setPosition = function(x: number, y:number){
	this.posX = x;
	this.posY = y;
}

Sprite.prototype.setOffset = function(x: number, y: number){
	this.offsetX = x;
	this.offsetY = y;
}

Sprite.prototype.setFrames = function(fcount: number){
	this.currentFrame = 0;
	this.frames = fcount;
}

Sprite.prototype.setDuration = function(duration: number){
	this.duration = duration;
}

Sprite.prototype.animate = function(c : CanvasRenderingContext2D, t: Timer){
	if(t.getMilliseconds() > this.ftime){
		this.nextFrame();
	}

	this.draw(c);
}

Sprite.prototype.nextFrame = function(){
	if(this.duration > 0){
		var d = new Date();

		if(this.duration > 0 && this.frames > 0){
			this.ftime = d.getTime() + (this.duration / this.frames);
		}
		else{
			this.ftime = 0;
		}

		this.offsetX = this.width * this.currentFrame;

		if(this.currentFrame === (this.frames-1)){
			this.currentFrame = 0;
		}
		else{
			this.currentFrame++;
		}
	}
}

Sprite.prototype.draw = function(c: CanvasRenderingContext2D){
	if(this.shown){
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
