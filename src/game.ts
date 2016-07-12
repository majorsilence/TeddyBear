/// <reference path="./Sprite.ts" />

module Majorsilence.TeddyBear.Game {
    var fpsCount = 0;
    var fps = 0;
    var startTime = 0;

    var Timer = function () {
        this.date = new Date();
    }

    Timer.prototype.update = function () {
        var d = new Date();
        this.date = d;
    }

    Timer.prototype.getMilliseconds = function () {
        return this.date.getTime();
    }

    Timer.prototype.getSeconds = function () {
        return Math.round(this.date.getTime() / 1000);
    }

    export function Init() {
        var canvas = <HTMLCanvasElement>document.getElementById('game');
        var c = canvas.getContext('2d');

        // Initialize our sprites
        var spritesheet = 'assets/img/sprite1.png';

        var gray = new Sprite(spritesheet, 60, 60, 0, 0, 5, 5000);
        var yellow = new Sprite(spritesheet, 60, 60, 0, 60, 5, 2500);
        var red = new Sprite(spritesheet, 60, 60, 0, 120, 5, 1666);
        var blue = new Sprite(spritesheet, 60, 60, 0, 180, 5, 1250);
        var green = new Sprite(spritesheet, 60, 60, 0, 240, 5, 1000);

        var timer = new Timer();

        c.font = '14px _sans';

        var startTime = timer.getSeconds();
        draw(startTime);

        function draw(timeStamp) {
            timer.update();

            if (timeStamp !== timer.getSeconds()) {
                fps = fpsCount;
                fpsCount = 0;
            }
            else {
                fpsCount++;
            }

            c.fillStyle = "#FFFFFF";
            c.fillRect(0, 0, canvas.width, canvas.height);

            c.fillStyle = "#000000";

            gray.setPosition(40, 60);
            gray.animate(c, timer);
            gray.draw(c);

            yellow.setPosition(80, 100);
            yellow.animate(c, timer);
            yellow.draw(c);

            red.setPosition(120, 140);
            red.animate(c, timer);
            red.draw(c);

            blue.setPosition(160, 180);
            blue.animate(c, timer);
            blue.draw(c);

            green.setPosition(200, 220);
            green.animate(c, timer);
            green.draw(c);

            c.fillText("Elapsed Time: " + (timeStamp - startTime) + " seconds", 10, 20);
            c.fillText("FPS: " + fps, 10, 40);

            setTimeout(function () {
                draw(timer.getSeconds());
            }, 1);

        }
    }
}