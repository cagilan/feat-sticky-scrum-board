import { shallowMount } from '@vue/test-utils';
import StickyBoard from '@/components/StickyBoard.vue';

describe('StickyBoard.vue', () => {
  it('renders props.column when initialized', () => {
    const column = '';
    const wrapper = shallowMount(StickyBoard, {
      props: { column },
    });
    expect(wrapper.text()).toMatch(column);
  });
});
