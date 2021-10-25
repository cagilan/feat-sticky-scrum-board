import { shallowMount } from '@vue/test-utils';
import StickyNote from '@/components/StickyNote.vue';

describe('StickyNote.vue', () => {
  it('renders props.column when initialized', () => {
    const note = '';
    const wrapper = shallowMount(StickyNote, {
      props: { note },
    });
    expect(wrapper.text()).toMatch(note);
  });
});
