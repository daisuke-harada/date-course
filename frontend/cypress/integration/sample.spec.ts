
//とりあえず動いてるか
describe('Users', () => {
  it('ログイン画面でログインを行う', () => {
    //cy.server();
    cy.visit('http://localhost:3000/login');
    cy.contains('ログイン画面');
    cy.contains('新規登録はこちら');
    cy.get('[data-e2e="name-input"]').type('daisuke');
    cy.get('[data-e2e="password-input"]').type('daisuke');
    // cy.intercept('POST', 'http://localhost:7777/api/v1/login').as('loginUser');
    cy.get('[data-e2e="login-button"').click();
    // cy.wait('@loginUser');
    cy.contains('daisuke');
    // cy.contains('ログインしてるよー');
  })
});
