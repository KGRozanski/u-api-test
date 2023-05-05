import { APP_INITIALIZER, NgModule } from '@angular/core';

import { GameComponent } from './game.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { DebugComponent } from './core/components/debug/debug.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './core/components/chat/chat.component';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './game.effects';
import pixiInitializer from './core/functions/pixiInitializer';
import { PIXI_APPLICATION } from './core/tokens/application.di-token';

@NgModule({
	declarations: [GameComponent, ToolbarComponent, DebugComponent, ChatComponent],
	imports: [CommonModule, EffectsModule.forFeature([GameEffects])],
	providers: [
		{
			provide: PIXI_APPLICATION,
			useFactory: pixiInitializer,
			multi: true,
		},
	],
})
export class GameModule {}
