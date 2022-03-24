import { userDatas } from '../fixtures/users/userDatas';
import { dataE2eGet } from '../support/hooks/dataE2eGet';
import { userSigninSuccessInput } from './../support/hooks/session';
describe('managementCourse', () => {
  beforeEach(() => {
    cy.visit('/login');
    userSigninSuccessInput(userDatas[0]);
  });

  it('デートコース作成画面が表示される', () => {
    cy.visit('managementCourses/createCourse');
    cy.contains('デートコース作成ページです');
  });
});