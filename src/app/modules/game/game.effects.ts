import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as GameActions from './game.actions';


@Injectable()
export class GameEffects {

  gameGames$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(GameActions.gameGames),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => GameActions.gameGamesSuccess({ data })),
          catchError(error => of(GameActions.gameGamesFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
