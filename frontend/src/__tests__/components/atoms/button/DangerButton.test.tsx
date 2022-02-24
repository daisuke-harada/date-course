import { DangerButton } from 'components/atoms/button/DangerButton'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('DangerButtonコンポーネントのテスト', () => {
  it('ボタン名が表示される', () => {
    const wrapper = shallow(
      <DangerButton>
        ボタン
      </DangerButton>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('ボタンをクリックする', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <DangerButton onClickEvent={mockOnClick}>
        ボタン
      </DangerButton>
    );
    wrapper.simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });
});
