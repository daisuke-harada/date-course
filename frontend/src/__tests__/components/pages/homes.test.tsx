import { render } from "@testing-library/react";
import { App } from 'App'

describe("rederテスト", () => {
  it("レンダリングされるか試す", () => {
    render(
      <App />
    );
  });
});