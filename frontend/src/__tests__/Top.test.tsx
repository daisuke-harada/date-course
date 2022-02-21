import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Top } from 'components/pages/homes/Top';
import { RecoilRoot } from 'recoil';

describe('Rendering', () => {
  it('トップページのテキストを表示する', () => {
    render(
      <RecoilRoot>
         <Top />
      </RecoilRoot>
    ); // Topコンポーネントをレンダリング
    expect(screen.getByText('トップページです')).toBeInTheDocument();
  });
});