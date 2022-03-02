
//とりあえず動いてるか
describe('Users', () => {
  it('ログイン画面でログインを行う', () => {
    cy.visit('/login');
    cy.contains('ログイン画面');
    cy.contains('新規登録はこちら');
    cy.get('[data-e2e="name-input"]').type('daisuke');
    cy.get('[data-e2e="password-input"]').type('daisuke');

    cy.intercept('POST', 'api/v1/login',  (req) => {
      req.reply({loginStatus: true, user: {
        id: 1,
        name: "daisuke",
        email: "daisuke@gmail.com",
        gender: '男',
        passwordDigest: 'daisukedaisuke',
        createdAt: new Date( '2017/11/27 20:30' ),
        updatedAT: new Date( '2017/11/27 20:30' )
      }});
    }).as('loginUser');

    cy.intercept('GET', 'api/v1/users/1', (req) => {
      req.reply({user: {
        id: 1,
        name: "daisuke",
        email: "daisuke@gmail.com",
        gender: '男',
        passwordDigest: 'daisukedaisuke',
        createdAt: new Date( '2017/11/27 20:30' ),
        updatedAT: new Date( '2017/11/27 20:30' )
      }})
    }).as('myPage');

    cy.get('[data-e2e="login-button"').click();
    cy.wait('@loginUser');
    cy.contains('ログインに成功しました');
    cy.wait('@myPage');
    cy.contains('daisuke');
  })
});
