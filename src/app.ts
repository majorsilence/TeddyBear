//import * as utils from "./util_helpers.ts";

/// <reference path="./util_helpers.ts" />
/// <reference path="./game.ts" />

class Startup {
    public static main(): number {
        console.log('Hello World');
        Majorsilence.TeddyBear.UtilHelpers.LogMessage("Test multi file app");
        
        Majorsilence.TeddyBear.UtilHelpers.LogMessage("Test multi file app 2");


        window.onload = function () {
             Majorsilence.TeddyBear.Game.Init();            

        }
        return 0;
    }
}

Startup.main();