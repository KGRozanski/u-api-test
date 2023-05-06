import { gameReducer, initialState } from './game.reducer';

describe('Game Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = gameReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
