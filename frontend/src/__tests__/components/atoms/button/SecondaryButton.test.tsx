import { SecondaryButton } from 'components/atoms/button/SecondaryButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('SecondaryButtonコンポーネントのテスト', () => {
  it('ボタン名が表示される', () => {
    const wrapper = shallow(
      <SecondaryButton>
        ボタン
      </SecondaryButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
