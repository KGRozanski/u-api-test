import { NgModule } from '@angular/core';

import { GameComponent } from './game.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { DebugComponent } from './core/components/debug/debug.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './core/components/chat/chat.component';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './game.effects';

@NgModule({
	declarations: [GameComponent, ToolbarComponent, DebugComponent, ChatComponent],
	imports: [CommonModule, EffectsModule.forFeature([GameEffects])],
	providers: [],
})
export class GameModule {}
