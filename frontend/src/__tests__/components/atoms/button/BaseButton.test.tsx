import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BaseButton } from 'components/atoms/button/BaseButton'

describe('BaseButtonコンポーネントのテスト', () => {
  test('ボタン名が表示される', () => {
    render(
      <BaseButton>
        ボタン
      </BaseButton>
    );
    expect(screen.getByText('ボタン')).toBeInTheDocument();
  });

  test('ボタンをクリックする', () => {
    const mockOnClick = jest.fn();
    render(
      <BaseButton onClickEvent={mockOnClick}>
        ボタン
      </BaseButton>
    );

    // buttonをクリックする
    fireEvent.click(screen.getByRole('button'));

    // mock関数がクリックされて一度呼び出されたことを示す。
    expect(mockOnClick).toHaveBeenCalledTimes(1);

  });
});
