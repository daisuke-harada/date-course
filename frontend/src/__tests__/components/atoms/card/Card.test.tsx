import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { Card } from "components/atoms/card/Card";

describe('BaseButtonコンポーネントのテスト', () => {
  test('カードが表示される。', () => {
    render(
      <Card>
        カードが表示される
      </Card>
    );
    expect(screen.getByText('カードが表示される')).toBeInTheDocument();
  });
});