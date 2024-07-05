import {
  constructorSlice,
  emptyIngredient,
  removeIngredient,
  setBun,
  setIngredient,
  swapIngredient
} from '../src/services/constructorSlice';

describe('Тестирование редьюсера constructorSlice', () => {
  describe('Тестирование экшена setIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: emptyIngredient,
        ingredients: []
      }
    };

    const expectedResult = {
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          }
        ]
      }
    };

    test('Добавление булки в конструктор', () => {
      const newState = constructorSlice.reducer(
        initialState,
        setBun({
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResult.constructorItems.bun;

      expect(bun).toEqual({
        ...expectedBun
      });
    });

    test('Добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice.reducer(
        initialState,
        setIngredient({
          _id: '643d69a5c3f7b9001cfa0946',
          name: 'Хрустящие минеральные кольца',
          type: 'main',
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
        })
      );

      const ingredient = newState.constructorItems.ingredients[0];
      const expectedIngredient = expectedResult.constructorItems.ingredients[0];

      expect(ingredient).toEqual({
        ...expectedIngredient,
        id: expect.any(String)
      });
    });
  });

  describe('Тестирование экшена removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: emptyIngredient,
        ingredients: [
          {
            id: 'IngredientToRemove',
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          }
        ]
      }
    };
    const expectedResult = {
      constructorItems: {
        bun: emptyIngredient,
        ingredients: []
      }
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice.reducer(
        initialState,
        removeIngredient('IngredientToRemove')
      );

      const newIngredients = newState.constructorItems.ingredients;
      const expected = expectedResult.constructorItems.ingredients;

      expect(expected).toEqual(newIngredients);
    });
  });

  describe('Тестирование экшена перемещения swapIngredients', () => {
    const initialState = {
      constructorItems: {
        bun: emptyIngredient,
        ingredients: [
          {
            id: 'Item__1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: 'Item__2',
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
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            id: 'Item__3',
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-02-large.png'
          }
        ]
      }
    };
    const expectedResult = {
      constructorItems: {
        bun: emptyIngredient,
        ingredients: [
          {
            id: 'Item__2',
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
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            id: 'Item__1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: 'Item__3',
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-02-large.png'
          }
        ]
      }
    };

    test('Перемещение ингредиента вверх direction=Up', () => {
      const newState = constructorSlice.reducer(
        initialState,
        swapIngredient({ id: 'Item__2', direction: 'Up' })
      );
      const expected = expectedResult.constructorItems.ingredients;
      const newIngredients = newState.constructorItems.ingredients;

      expect(expected).toEqual(newIngredients);
    });
    test('Перемещение ингредиента вниз direction=Down', () => {
      const newState = constructorSlice.reducer(
        initialState,
        swapIngredient({ id: 'Item__1', direction: 'Down' })
      );
      const expected = expectedResult.constructorItems.ingredients;
      const newIngredients = newState.constructorItems.ingredients;

      expect(expected).toEqual(newIngredients);
    });
  });
});
