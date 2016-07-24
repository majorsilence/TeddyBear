/// <reference path="./Timer.ts" />
/// <reference path="./Sprite.ts" />


module Majorsilence.TeddyBear.Game {
    var fpsCount = 0;
    var fps = 0;
    var startTime = 0;

    export function Init() {
        var canvas = <HTMLCanvasElement>document.getElementById('game');
        var c = canvas.getContext('2d');

        // Initialize our sprites
        var spritesheet = 'assets/img/bear.png';

        var width= 48;
        var height = 48;
        var bearForward = new Sprite(spritesheet, width, height, 6*width, 0, 3, 500);


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

            bearForward.setPosition(40, 60);
            bearForward.animate(c, timer);
            bearForward.draw(c);

            c.fillText("Elapsed Time: " + (timeStamp - startTime) + " seconds", 10, 20);
            c.fillText("FPS: " + fps, 10, 40);

            setTimeout(function () {
                draw(timer.getSeconds());
            }, 1);

        }
    }
}