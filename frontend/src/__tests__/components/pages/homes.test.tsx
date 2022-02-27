import { screen, render } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import { RecoilRoot } from "recoil";
import '@testing-library/jest-dom';
import { Top } from "components/pages/homes/Top";

describe("rederテスト", () => {
  test("レンダリングされるか試す", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Top />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText('Topページ')).toBeInTheDocument();
  });
});