import { NgModule } from '@angular/core';

import { GameComponent } from './game.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { DebugComponent } from './core/components/debug/debug.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GameComponent,
    ToolbarComponent,
    DebugComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
})
export class GameModule { }
