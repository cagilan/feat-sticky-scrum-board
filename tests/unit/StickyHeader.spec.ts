import { shallowMount } from '@vue/test-utils';
import StickyHeader from '@/components/StickyHeader.vue';

describe('StickyHeader.vue', () => {
  it('renders props.column when initialized', () => {
    const columns = '';
    const wrapper = shallowMount(StickyHeader, {
      props: { columns },
    });
    expect(wrapper.text()).toMatch(columns);
  });
});
