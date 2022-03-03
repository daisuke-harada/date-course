import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Card } from "components/atoms/card/Card";
import { UserCard } from "components/organisms/users/UserCard";
import { UserResponseData } from "types/users/response";
import { userDatas } from "__tests__supports/userDatas";

describe('UserCardコンポーネントのテスト', () => {
  const user: UserResponseData = userDatas[0];

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