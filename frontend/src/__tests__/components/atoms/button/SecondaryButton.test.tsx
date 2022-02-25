import { render, screen } from '@testing-library/react';
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
});
