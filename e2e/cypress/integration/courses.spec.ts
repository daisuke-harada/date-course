import { apiDateSpotShowAccess } from 'cypress/support/backendAccessMock/dateSpots/apiDateSpotAccess';
import { testUser } from 'cypress/fixtures/users/response';
import { userSigninSuccess } from 'cypress/support/hooks/session';
import { apiDateSpotIndexAccess } from 'cypress/support/backendAccessMock/dateSpots/apiDateSpotAccess';
import { addressAndDateSpotTestDatas } from 'cypress/fixtures/dateSpots/addressAndDateSpotTestDatas';
import { dataE2eGet } from 'cypress/support/hooks/dataE2eGet';
import { apiCourseCreateAccess, apiCourseDeleteAccess, apiCourseIndexAccess, apiCourseShowAccess } from 'cypress/support/backendAccessMock/courses/apiCourseAccess';
import { UserResponseData } from 'cypress/support/types/users/response';
import { AddressAndDateSpotJoinData } from 'cypress/support/types/dateSpots/response';
import { courseTestDatas } from 'cypress/fixtures/courses/courseTestDatas';

const firstDateSpot = addressAndDateSpotTestDatas.find((data) => data.id === 1);
const secondDateSpot = addressAndDateSpotTestDatas.find((data) => data.id === 2);
const thirdDateSpot = addressAndDateSpotTestDatas.find((data) => data.id === 3);
const addressAndDateSpots = [firstDateSpot, secondDateSpot, thirdDateSpot];

const inputMangementCourse = (travelMode: string, authority: string, addressAndDateSpots: AddressAndDateSpotJoinData[]) => {
  apiDateSpotIndexAccess(addressAndDateSpotTestDatas);
  addressAndDateSpots.map((addressAndDateSpot) => {
    cy.visit('/dateSpots/index');
    apiDateSpotShowAccess(addressAndDateSpot);
    dataE2eGet(`courseAddButtonId-${addressAndDateSpot.dateSpot.id}`).last().click();
  });

  dataE2eGet('travelMode-select').select(travelMode);

  if(authority === '非公開'){
    dataE2eGet('course-not-open-radio').check();
  };
};

const createCourse = (testUser: UserResponseData, travelMode: string, authority: string) => {
  const courseData = {
    id:1,
    user: testUser,
    travelMode: travelMode,
    authority: authority,
    courseDuringSpots: addressAndDateSpots,
    noDuplicatePrefectureNames: ['福岡']
  };

  inputMangementCourse(travelMode, authority, addressAndDateSpots);
  apiCourseCreateAccess(courseData.id);
  apiCourseShowAccess(courseData);
  cy.contains('登録').click();

  // デートコース内のデートスポット情報を表示させるために必要。
  addressAndDateSpots.map((addressAndDateSpot) => apiDateSpotShowAccess(addressAndDateSpot));

  // 登録されたデートスポットがデートコース詳細ページに表示されているか確認。
  addressAndDateSpots.map((addressAndDateSpot) => {
    cy.contains(addressAndDateSpot.dateSpot.name);
    cy.contains(addressAndDateSpot.reviewTotalNumber);
    cy.contains(addressAndDateSpot.cityName);
    cy.contains(addressAndDateSpot.genreName);
  });
};

describe('courses', () => {
  it('デートコースの交通手段を"車"に選択し、公開ステータスで登録する', () => {
    userSigninSuccess(testUser);
    createCourse(testUser, 'DRIVING', '公開');
    cy.contains('車で移動');
    cy.contains('他のユーザーに公開');
  });

  it('デートコースの交通手段を"歩く"に選択肢し、公開ステータスで登録する', () => {
    userSigninSuccess(testUser);
    createCourse(testUser, 'WALKING', '公開');
    cy.contains('歩きで移動');
    cy.contains('他のユーザーに公開');
  });

  it('デートコースの交通手段を"自転車"に選択肢し、公開ステータスで登録する', () => {
    userSigninSuccess(testUser);
    createCourse(testUser, 'BICYCLING', '公開');
    cy.contains('自転車で移動');
    cy.contains('他のユーザーに公開');
  });

  it('デートコース詳細ページを表示する', () => {
    const courseData = {
      id:1,
      user: testUser,
      travelMode: 'DRIVING',
      authority: '公開',
      courseDuringSpots: addressAndDateSpots,
      noDuplicatePrefectureNames: ['福岡']
    };
    apiCourseShowAccess(courseData);
    cy.visit(`/courses/${courseData.id}`);

    // デートコース内のデートスポット情報を表示させるために必要。
    addressAndDateSpots.map((addressAndDateSpot) => apiDateSpotShowAccess(addressAndDateSpot));

    // 登録されたデートスポットがデートコース詳細ページに表示されているか確認。
    addressAndDateSpots.map((addressAndDateSpot) => {
      cy.contains(addressAndDateSpot.dateSpot.name);
      cy.contains(addressAndDateSpot.reviewTotalNumber);
      cy.contains(addressAndDateSpot.cityName);
      cy.contains(addressAndDateSpot.genreName);
    });
  });

  it('デートコースを削除する', () => {
    userSigninSuccess(testUser);
    const courseData = {
      id:1,
      user: testUser,
      travelMode: 'DRIVING',
      authority: '公開',
      courseDuringSpots: addressAndDateSpots,
      noDuplicatePrefectureNames: ['福岡']
    };
    apiCourseShowAccess(courseData);
    cy.visit(`/courses/${courseData.id}`);
    apiCourseDeleteAccess(courseData.id);
    cy.contains('デートコースを削除').click();
    cy.contains('デートコースを削除しました');
    cy.contains(testUser.name);
    cy.contains(testUser.gender);
  });

  it('デートコースを、非公開ステータスで登録する', () => {
    userSigninSuccess(testUser);
    createCourse(testUser, 'DRIVING', '非公開');
    cy.contains('車で移動');
    cy.contains('他のユーザーに非公開');
  });

  it('デートコース作成ページでデートスポットを1つ削除する', () => {
    userSigninSuccess(testUser);
    inputMangementCourse('DRIVING', '公開', addressAndDateSpots);
    dataE2eGet(`courseDeleteButtonId-${firstDateSpot.dateSpot.id}`).click();
  });

  it('デートコース作成ページでデートスポットを2つ削除する', () => {
    userSigninSuccess(testUser);
    inputMangementCourse('DRIVING', '公開', addressAndDateSpots);
    dataE2eGet(`courseDeleteButtonId-${firstDateSpot.dateSpot.id}`).click();
    dataE2eGet(`courseDeleteButtonId-${secondDateSpot.dateSpot.id}`).click();
  });

  it('デートコース作成ページでデートスポットを全て削除する', () => {
    userSigninSuccess(testUser);
    inputMangementCourse('DRIVING', '公開', addressAndDateSpots);
    cy.contains('全て削除').click();
    cy.contains('目的地は登録されていません。');
    cy.contains('デートスポットをデートコースに追加してみましょう。');
  });

  it('デートコース作成ページでデートスポットの順番を入れ替える', () => {
    userSigninSuccess(testUser);
    inputMangementCourse('DRIVING', '公開', addressAndDateSpots);
    dataE2eGet(`spot-change-select-${firstDateSpot.id}`).select(secondDateSpot.id);
    dataE2eGet(`spot-change-button-${firstDateSpot.id}`).click();
  });

  it('デートコース作成ページからデートスポット詳細ページに遷移する', () => {
    userSigninSuccess(testUser);
    inputMangementCourse('DRIVING', '公開', addressAndDateSpots);
    apiDateSpotShowAccess(firstDateSpot);
    cy.contains(firstDateSpot.dateSpot.name).click();
    cy.contains(firstDateSpot.dateSpot.name);
    cy.contains(firstDateSpot.averageRate);
    cy.contains(firstDateSpot.cityName);
    cy.contains(firstDateSpot.genreName);
  })

  it('デートコース一覧ページを表示する', () => {
    apiCourseIndexAccess(courseTestDatas);
    cy.visit('/courses/index');
    courseTestDatas.map((data) => {
      cy.contains(`${data.user.name}さんの投稿`);
      data.noDuplicatePrefectureNames.map((name) => cy.contains(name));
    });
  });

  it('デートコース一覧ページからデートコース詳細ページに遷移する', () => {
    apiCourseIndexAccess(courseTestDatas);
    cy.visit('/courses/index');
    courseTestDatas.map((data) => {
      cy.contains(`${data.user.name}さんの投稿`);
      data.noDuplicatePrefectureNames.map((name) => cy.contains(name));
    });

    apiCourseShowAccess(courseTestDatas[0]);

    // デートコース内のデートスポット情報を表示させるために必要。
    courseTestDatas[0].courseDuringSpots.map((addressAndDateSpot) => apiDateSpotShowAccess(addressAndDateSpot));

    cy.contains('詳細を見る').first().click();

    courseTestDatas[0].courseDuringSpots.map((addressAndDateSpot) => {
      cy.contains(addressAndDateSpot.dateSpot.name);
      cy.contains(addressAndDateSpot.cityName);
      cy.contains(addressAndDateSpot.genreName);
    });
  })
});