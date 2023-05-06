import { Inject, Injectable, Injector } from "@angular/core";
import { PIXI_APPLICATION } from "../tokens/application.di-token";
import { Application } from "pixi.js";
import * as PIXI from 'pixi.js';


const manifest = {
    bundles: [
        {
            name: 'hero',
            assets: [
                {
                    name: 'hero',
                    srcs: 'assets/img/hero/Character/character.json',
                }
            ],
        }
    ]
};


export function assetsLoader(injector: Injector): Function {
    const INSTANCE: any = injector.get(PIXI_APPLICATION);
    if (!INSTANCE) { throw new Error('Not found PIXI application instance!') }
    const Application: Application = INSTANCE[0];

    return async () => {
        await PIXI.Assets.init({ manifest });
        await PIXI.Assets.loadBundle('hero');
    }
}