import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DangerButton } from 'components/atoms/button/DangerButton'

describe('DangerButtonコンポーネントのテスト', () => {
  test('ボタン名が表示される', () => {
    render(
      <DangerButton>
        ボタン
      </DangerButton>
    );
    expect(screen.getByText('ボタン')).toBeInTheDocument();
  });

  test('ボタンをクリックする', () => {
    const mockOnClick = jest.fn();
    render(
      <DangerButton onClickEvent={mockOnClick}>
        ボタン
      </DangerButton>
    );

    // buttonをクリックする
    fireEvent.click(screen.getByRole('button'));

    // mock関数がクリックされて一度呼び出されたことを示す。
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
