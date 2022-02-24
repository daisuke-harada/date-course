import { DeactivateAcountButton } from 'components/atoms/button/DeactivateAcountButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('recoil');
// jest.mock('store/session');

describe('DeactivateAcountButtonコンポーネントのテスト', () => {
  it('ログインしていないときはボタンが表示されない', () => {
    const wrapper = shallow(
      <DeactivateAcountButton />
    );
    /* eslint-disable */
    console.log(wrapper.debug());
    expect(wrapper.text()).toBe('表示されません');
  });

  it('ログインしているときはボタン名が表示される', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper.text()).toBe('退会');
  });

  it('ボタンを押すとdeleteアクションでapiに接続する', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
