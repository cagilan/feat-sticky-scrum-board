import { shallowMount } from '@vue/test-utils';
import StickyBoardList from '@/components/StickyBoardList.vue';

describe('StickyBoardList.vue', () => {
  it('renders props.column when initialized', () => {
    const boards = '';
    const wrapper = shallowMount(StickyBoardList, {
      props: { boards },
    });
    expect(wrapper.text()).toMatch(boards);
  });
});
