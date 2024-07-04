const baseURL = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.intercept('GET', `${baseURL}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', `${baseURL}/auth/user`, {
    fixture: 'user.json'
  }).as('getUser');

  cy.intercept('POST', `${baseURL}/auth/user`, {
    fixture: 'ingredients.json'
  }).as('postLogin');

  cy.intercept('POST', `${baseURL}/orders`, {
    fixture: 'orderResponse.json'
  }).as('postOrder');

  cy.visit('http://localhost:4000');
});

describe('Тестируем конструктор без авторизации', function () {
  it('Добавление второй булки в бургер', () => {
    cy.get('[data-cy=bun-1]').children('button').click();
    expect(
      cy
        .get('[data-cy=burger-top]')
        .contains('Флюоресцентная булка R2-D3 (верх)')
    );
  });

  it('Тест изменения булки в заказе', () => {
    cy.get('[data-cy=bun-1]').children('button').click();
    expect(
      cy
        .get('[data-cy=burger-top]')
        .contains('Флюоресцентная булка R2-D3 (верх)')
    );
    cy.get('[data-cy=bun-0]').children('button').click();
    expect(
      cy.get('[data-cy=burger-top]').contains('Краторная булка N-200i (верх)')
    );
  });

  it('Тест добавления ингредиентов без булки', () => {
    cy.get('[data-cy=main-1]').children('button').click();
    cy.get('[data-cy=sauce-1]').children('button').click();
    expect(
      cy
        .get('[data-cy=burger-ingredients]')
        .contains('Филе Люминесцентного тетраодонтимформа')
    );
    expect(
      cy
        .get('[data-cy=burger-ingredients]')
        .contains('Соус фирменный Space Sauce')
    );
  });

  it('Тест добавления ингредиентов с булкой', () => {
    cy.get('[data-cy=bun-1]').children('button').click();
    cy.get('[data-cy=main-1]').children('button').click();
    cy.get('[data-cy=sauce-1]').children('button').click();
    expect(
      cy
        .get('[data-cy=burger-ingredients]')
        .contains('Филе Люминесцентного тетраодонтимформа')
    );
    expect(
      cy
        .get('[data-cy=burger-ingredients]')
        .contains('Соус фирменный Space Sauce')
    );
  });
});

describe('Тестируем модальное окно ингредиента', function () {
  it('Открытие модального окна', () => {
    cy.get('[data-cy=bun-1]').click();
    expect(cy.get('#modals').contains('Флюоресцентная булка R2-D3'));
  });

  it('Закрытие модального окна крестиком', () => {
    cy.get('[data-cy=bun-1]').click();
    cy.get('#modals').contains('Флюоресцентная булка R2-D3');
    cy.get('#modals').find('button').click();
    expect(cy.get('#modals').children().should('have.length', 0));
  });

  it('Закрытие модального окна по клику снаружи', () => {
    cy.get('[data-cy=bun-1]').click();
    cy.get('#modals').contains('Флюоресцентная булка R2-D3');
    cy.get('body').click(0, 0);
    expect(cy.get('#modals').children().should('have.length', 0));
  });
});

describe('Тестируем оформление заказа', function () {
  beforeEach(() => {
    localStorage.setItem('refreshToken', 'pleasePass');
    cy.setCookie('accessToken', 'pleasePass');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Заказ бургера', () => {
    cy.get('[data-cy=bun-0]').children('button').click();
    cy.get('[data-cy=main-2]').children('button').click();
    cy.get('[data-cy=main-3]').children('button').click();
    cy.get('[data-cy=sauce-0]').children('button').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('button').contains('Оформить заказ').click();
    expect(cy.get('#modals').find('h2').should('have.text', '44955'));
    cy.get('body').click(0, 0);
    expect(cy.get('#modals').children().should('have.length', 0));
    expect(cy.get('[data-cy=burger-top]').should('have.length', 0));
    expect(cy.get('[data-cy=burger-ingredients]').should('have.length', 1));
  });
});
