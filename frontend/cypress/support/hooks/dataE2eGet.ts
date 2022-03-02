export const dataE2eGet = (dataE2e: string) => {
  return cy.get(`[data-e2e=${dataE2e}]`);
};