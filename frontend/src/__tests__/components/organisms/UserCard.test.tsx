import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Card } from "components/atoms/card/Card";
import { User } from "types/api/session";
import { UserCard } from "components/organisms/users/UserCard";


describe('UserCardコンポーネントのテスト', () => {
  const user: User = {
    id: 1,
    name: '大輔',
    gender: '男',
    passwordDigeset: 'peter4peter4',
    admin: false,
  }
  test('ユーザー情報が表示される', () => {
    render(
      <Card>
        <UserCard user={user} />
      </Card>
    );
    // expect(screen.getByText('大輔')).toBeInTheDocument();
    // expect(screen).toMatchSnapshot();
    // expect(screen.getByText('大輔')).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();

  });
});