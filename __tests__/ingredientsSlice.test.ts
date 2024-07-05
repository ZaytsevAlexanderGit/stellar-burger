import {
  getIngredientsFromServer,
  ingredientsSlice,
  initialState
} from '../src/services/ingredientsSlice';

describe('Тестирование редьюсера ingredientsSlice', () => {
  describe('Тестирование экшена getIngredientsFromServer', () => {
    const typesOfActions = {
      pending: {
        type: getIngredientsFromServer.pending.type,
        payload: null
      },
      fulfilled: {
        type: getIngredientsFromServer.fulfilled.type,
        payload: {
          data: [
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png'
            }
          ]
        }
      },
      rejected: {
        type: getIngredientsFromServer.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = ingredientsSlice.reducer(
        initialState,
        typesOfActions.pending
      );
      expect(currState.isIngredientsLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = ingredientsSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.isIngredientsLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = ingredientsSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.isIngredientsLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.ingredients).toEqual(typesOfActions.fulfilled.payload);
    });
  });
});
