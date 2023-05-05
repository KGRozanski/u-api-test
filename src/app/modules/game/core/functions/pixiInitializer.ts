import * as PIXI from 'pixi.js';

export default function pixiInitializer(): PIXI.Application {
	// The application will create a renderer using WebGL, if possible,
	// with a fallback to a canvas render. It will also setup the ticker
	// and the root stage PIXI.Container
	return new PIXI.Application({
		resizeTo: window,
		resolution: window.devicePixelRatio,
		autoDensity: true,
		antialias: true,
	});
}
