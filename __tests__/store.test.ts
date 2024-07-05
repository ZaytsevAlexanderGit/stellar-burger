import store, { rootReducer } from '../src/services/store';

describe('rootReducer', () => {
  test('Работа rootReducer', () => {
    const expectedState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(expectedState).toEqual(store.getState());
  });
});
