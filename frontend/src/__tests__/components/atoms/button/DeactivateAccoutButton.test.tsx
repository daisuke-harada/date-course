import { DeactivateAcountButton } from 'components/atoms/button/DeactivateAcountButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { RecoilRoot, useRecoilState } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('recoil');

describe('DeactivateAcountButtonコンポーネントのテスト', () => {
  it('ログインしていないときはボタンが表示されない', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper.text()).toEqual('');
  });

  it('ログインしているときはボタン名が表示される', () => {
    const mockState = { state: true};
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(mockState);
      }))
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper.text()).toEqual('退会');
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
