import { Point } from 'pixi.js';

export function carToIso(vector: Point): Point {
	return new Point(vector.x * 0.5 + vector.y * -0.5, vector.x * 0.25 + vector.y * 0.25);
}
