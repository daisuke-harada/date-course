import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { App } from 'App';

describe('Rendering', () => {
  it('トップページのテキストを表示する', () => {
    render(
      <App />
    ); // Topコンポーネントをレンダリング
    expect(screen.getByText('トップページです')).toBeInTheDocument();
  });
});