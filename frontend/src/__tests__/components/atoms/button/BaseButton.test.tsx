import { BaseButton } from 'components/atoms/button/BaseButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('BaseButtonコンポーネントのテスト', () => {
  it('ボタン名が表示される', () => {
    const wrapper = shallow(
      <BaseButton>
        ボタン
      </BaseButton>
    );
    /* eslint-disable */
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  it('ボタンをクリックする', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <BaseButton onClickEvent={mockOnClick}>
        ボタン
      </BaseButton>
    );
    wrapper.simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });
});
