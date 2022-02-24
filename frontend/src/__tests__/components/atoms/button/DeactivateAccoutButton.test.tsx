import { DeactivateAcountButton } from 'components/atoms/button/DeactivateAcountButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { RecoilRoot } from 'recoil';
Enzyme.configure({ adapter: new Adapter() });

describe('DeactivateAcountButtonコンポーネントのテスト', () => {
  it('ログインしているときはボタン名が表示される', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('ログインしていないときはボタン名が表示されない', () => {
    const wrapper = shallow(
      <RecoilRoot>
        <DeactivateAcountButton />
      </RecoilRoot>
    );
    expect(wrapper).toMatchSnapshot();
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
