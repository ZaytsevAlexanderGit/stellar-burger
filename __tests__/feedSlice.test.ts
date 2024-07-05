import {
  feedsSlice,
  getFeedsFromServer,
  initialState
} from '../src/services/feedSlice';

describe('Тестирование редьюсера feedSlice', () => {
  describe('Тестирование экшена getFeedsFromServer', () => {
    const typesOfActions = {
      pending: {
        type: getFeedsFromServer.pending.type,
        payload: null
      },
      fulfilled: {
        type: getFeedsFromServer.fulfilled.type,
        payload: {
          orders: [
            {
              _id: '6686de1b856777001bb1fd52',
              ingredients: [
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный био-марсианский метеоритный бургер',
              createdAt: '2024-07-04T17:38:35.144Z',
              updatedAt: '2024-07-04T17:38:35.589Z',
              number: 44967
            }
          ],
          total: 3,
          totalToday: 2
        }
      },
      rejected: {
        type: getFeedsFromServer.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = feedsSlice.reducer(
        initialState,
        typesOfActions.pending
      );
      expect(currState.isFeedsLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = feedsSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.isFeedsLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = feedsSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.isFeedsLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.totalInfo.total).toEqual(
        typesOfActions.fulfilled.payload.total
      );
      expect(currState.totalInfo.totalToday).toEqual(
        typesOfActions.fulfilled.payload.totalToday
      );
      expect(currState.feeds).toEqual(typesOfActions.fulfilled.payload.orders);
    });
  });
});
