import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton'


describe('SecondaryButtonコンポーネントのテスト', () => {
  test('ボタン名が表示される', () => {
    render(
      <SecondaryButton>
        ボタン
      </SecondaryButton>
    );
    expect(screen.getByText('ボタン')).toBeInTheDocument();
  });

  test('ボタンをクリックする', () => {
    const mockOnClick = jest.fn();
    render(
      <SecondaryButton onClickEvent={mockOnClick}>
        ボタン
      </SecondaryButton>
    );

    // buttonをクリックする
    fireEvent.click(screen.getByRole('button'));

    // mock関数がクリックされて一度呼び出されたことを示す。
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
