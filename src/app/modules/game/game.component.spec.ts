import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [GameComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(GameComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'pixi-test'`, () => {
		const fixture = TestBed.createComponent(GameComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('pixi-test');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(GameComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.content span')?.textContent).toContain('pixi-test app is running!');
	});
});
