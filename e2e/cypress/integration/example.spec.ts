it('ルートパスに訪問できるか', () => {
  cy.visit('/');
  cy.contains('Topページ');
})

