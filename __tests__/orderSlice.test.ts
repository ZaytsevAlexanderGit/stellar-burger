import {
  getOrderByNumberFromServer,
  getOrdersFromServer,
  initialState,
  orderBurger,
  orderSlice
} from '../src/services/orderSlice';

describe('Тестирование редьюсера orderSlice', () => {
  describe('Тестирование экшена getOrdersFromServer', () => {
    const typesOfActions = {
      pending: {
        type: getOrdersFromServer.pending.type,
        payload: null
      },
      fulfilled: {
        type: getOrdersFromServer.fulfilled.type,
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
        type: getOrdersFromServer.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.pending
      );
      expect(currState.isOrdersReceiving).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.isOrdersReceiving).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.isOrdersReceiving).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.orders.total).toEqual(
        typesOfActions.fulfilled.payload.total
      );
      expect(currState.orders.totalToday).toEqual(
        typesOfActions.fulfilled.payload.totalToday
      );
      expect(currState.orders.orders).toEqual(
        typesOfActions.fulfilled.payload.orders
      );
    });
  });

  describe('Тестирование экшена getOrderByNumberFromServer', () => {
    const typesOfActions = {
      pending: {
        type: getOrderByNumberFromServer.pending.type,
        payload: null
      },
      fulfilled: {
        type: getOrderByNumberFromServer.fulfilled.type,
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
          ]
        }
      },
      rejected: {
        type: getOrderByNumberFromServer.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.pending
      );
      expect(currState.isOrdersReceiving).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.isOrdersReceiving).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.isOrdersReceiving).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.orderModalData).toEqual(
        typesOfActions.fulfilled.payload.orders[0]
      );
    });
  });

  describe('Тестирование экшена orderBurger', () => {
    const typesOfActions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: {
          success: true,
          name: 'Краторный бессмертный spicy метеоритный бургер',
          order: {
            ingredients: [
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
                  'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa0942',
                name: 'Соус Spicy-X',
                type: 'sauce',
                proteins: 30,
                fat: 20,
                carbohydrates: 40,
                calories: 30,
                price: 90,
                image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
                image_mobile:
                  'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
                image_large:
                  'https://code.s3.yandex.net/react/code/sauce-02-large.png',
                __v: 0
              },
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
                  'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0
              }
            ],
            _id: '6686b5ec856777001bb1fd08',
            owner: {
              name: 'TestName',
              email: 'TestEmail@yandex.ru',
              createdAt: '2024-06-24T07:30:35.771Z',
              updatedAt: '2024-07-03T16:23:12.930Z'
            },
            status: 'done',
            name: 'Краторный бессмертный spicy метеоритный бургер',
            createdAt: '2024-07-04T14:47:08.924Z',
            updatedAt: '2024-07-04T14:47:09.598Z',
            number: 44955,
            price: 6937
          }
        }
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.pending
      );
      expect(currState.orderRequest).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.orderRequest).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = orderSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.orderRequest).toBe(false);
      expect(currState.ingredients).toEqual([]);
      expect(currState.orderModalData).toEqual(
        typesOfActions.fulfilled.payload.order
      );
    });
  });
});
