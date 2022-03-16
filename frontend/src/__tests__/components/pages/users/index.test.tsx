
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { UserResponseData } from "types/users/response";
import { UserCard } from "components/organisms/users/UserCard";
import { userDatas } from "__tests__supports/userDatas";

describe('ユーザー一覧ページのコンポーネントのテスト', () => {
  const users = userDatas;
  test('ユーザー一覧ページが表示される', () => {
    render(
      <>
        <h1 className='mt-6'>ユーザーを探すページ</h1>
        {users.map((user: UserResponseData) => (<UserCard key={user.id} user={user} />))}
      </>
    );

    users.map((user: UserResponseData) => (
        expect(screen.getByText(user.name))
      )
    );
    expect(screen.getAllByText('男性')).toHaveLength(2);
    expect(screen.getAllByText('女')).toHaveLength(1);
  });
});