import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Card } from "components/atoms/card/Card";
import { UserCard } from "components/organisms/users/UserCard";
import { UserResponseData } from "types/api/response";

describe('UserCardコンポーネントのテスト', () => {
  const user: UserResponseData = {
    id: 1,
    name: '大輔',
    gender: '男',
    passwordDigeset: 'peter4peter4',
    admin: false,
    createdAt: new Date( '2017/11/27 20:30' ),
    updatedAt: new Date( '2017/11/27 20:30' ),
  };

  test('ユーザー情報が表示される', () => {
    render(
      <Card>
        <UserCard user={user} />
      </Card>
    );
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.gender)).toBeInTheDocument();
  });
});