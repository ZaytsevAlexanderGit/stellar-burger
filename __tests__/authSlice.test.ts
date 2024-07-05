import {
  authSlice,
  getUserFromServer,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../src/services/authSlice';

describe('Тестирование редьюсера authSlice', () => {
  describe('Тестирование экшена getUserFromServer', () => {
    const typesOfActions = {
      pending: {
        type: getUserFromServer.pending.type,
        payload: null
      },
      fulfilled: {
        type: getUserFromServer.fulfilled.type,
        payload: {
          user: {
            email: 'test@email.ru',
            name: 'Some Name'
          }
        }
      },
      rejected: {
        type: getUserFromServer.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = authSlice.reducer(initialState, typesOfActions.pending);
      expect(currState.authDataLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.isAuthChecked).toEqual(true);
      expect(currState.user).toEqual(typesOfActions.fulfilled.payload.user);
    });
  });

  describe('Тестирование экшена registerUser', () => {
    const typesOfActions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: {
          user: {
            email: 'test@email.ru',
            name: 'Some Name'
          }
        }
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = authSlice.reducer(initialState, typesOfActions.pending);
      expect(currState.authDataLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.isAuthChecked).toEqual(true);
      expect(currState.user).toEqual(typesOfActions.fulfilled.payload.user);
    });
  });

  describe('Тестирование экшена loginUser', () => {
    const typesOfActions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: {
          user: {
            email: 'test@email.ru',
            name: 'Some Name'
          }
        }
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = authSlice.reducer(initialState, typesOfActions.pending);
      expect(currState.authDataLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.isAuthChecked).toEqual(true);
      expect(currState.user).toEqual(typesOfActions.fulfilled.payload.user);
    });
  });

  describe('Тестирование экшена updateUser', () => {
    const typesOfActions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: {
          user: {
            email: 'test@email.ru',
            name: 'Some Name'
          }
        }
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = authSlice.reducer(initialState, typesOfActions.pending);
      expect(currState.authDataLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.user).toEqual(typesOfActions.fulfilled.payload.user);
    });
  });

  describe('Тестирование экшена logoutUser', () => {
    const typesOfActions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'Error message' }
      }
    };

    test('Тест состояния pending', () => {
      const currState = authSlice.reducer(initialState, typesOfActions.pending);
      expect(currState.authDataLoading).toBe(true);
    });

    test('Тест состояния rejected', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.rejected
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual(typesOfActions.rejected.error.message);
    });

    test('Тест состояния fulfilled', () => {
      const currState = authSlice.reducer(
        initialState,
        typesOfActions.fulfilled
      );
      expect(currState.authDataLoading).toBe(false);
      expect(currState.error).toEqual('');
      expect(currState.isAuthChecked).toEqual(false);
      expect(currState.user).toEqual(typesOfActions.fulfilled.payload);
    });
  });
});
