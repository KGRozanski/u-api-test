import { InjectionToken } from "@angular/core";
import { Application } from "pixi.js";

export const PIXI_APPLICATION = new InjectionToken<Application>('pixiApp');
