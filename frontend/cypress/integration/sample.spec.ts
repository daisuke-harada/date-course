
//とりあえず動いてるか
describe('Users', () => {
  it('ログイン画面でログインを行う', () => {
    cy.visit('/login');
    cy.contains('ログイン画面');
    cy.contains('新規登録はこちら');
    cy.get('[data-e2e="name-input"]').type('daisuke');
    cy.get('[data-e2e="password-input"]').type('daisuke');
    cy.intercept('POST', 'api/v1/login',  (req) => {
      req.reply({loginStatus: true, user: {name: 'daisuke', gender:'男'}});
    });
    cy.get('[data-e2e="login-button"').click();
    //cy.wait('@loginUser');
    cy.contains('daisuke');
    // cy.contains('ログインしてるよー');
  })
});
