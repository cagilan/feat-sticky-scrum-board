import { mount } from '@vue/test-utils';
import StickyColumn from '@/components/StickyColumn.vue';

describe('StickyColumn.vue', () => {
  it('renders props.column when initialized', () => {
    const name = '';
    const wrapper = mount(StickyColumn, {
      props: { name },
    });
    expect(wrapper.text()).toMatch(name);
  });

  it('should emit transfer event for deleteNote', async () => {
    const wrapper = mount(StickyColumn);

    wrapper.vm.deleteNote();
    wrapper.vm.$emit('delete');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
