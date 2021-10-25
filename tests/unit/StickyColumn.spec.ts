import { shallowMount } from '@vue/test-utils';
import StickyColumn from '@/components/StickyColumn.vue';

describe('StickyColumn.vue', () => {
  it('renders props.column when initialized', () => {
    const name = '';
    const wrapper = shallowMount(StickyColumn, {
      props: { name },
    });
    expect(wrapper.text()).toMatch(name);
  });
});
