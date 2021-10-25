import { shallowMount } from '@vue/test-utils';
import StickyBoards from '@/components/StickyBoards.vue';

describe('StickyBoards.vue', () => {
  xit('renders props.column when initialized', () => {
    const column = '';
    const wrapper = shallowMount(StickyBoards, {
      props: { column },
    });
    expect(wrapper.text()).toMatch(column);
  });
});
