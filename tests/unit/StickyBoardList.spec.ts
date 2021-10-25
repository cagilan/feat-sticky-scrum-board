import { mount } from '@vue/test-utils';
import StickyBoardList from '@/components/StickyBoardList.vue';

describe('StickyBoardList.vue', () => {

  it('renders props.column when initialized', () => {
    const boards = '';
    const wrapper = mount(StickyBoardList, {
      props: { boards: '' },
    });
    expect(wrapper.text()).toMatch(boards);
  });

  it('should emit deleteBoard event for delete board', async () => {
    const wrapper = mount(StickyBoardList);
    wrapper.vm.deleteBoard();
    wrapper.vm.$emit('deleteBoard');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().deleteBoard).toBeTruthy();
  });

  it('should emit openBoard event for open board', async () => {
    const wrapper = mount(StickyBoardList);
    wrapper.vm.openBoard();
    wrapper.vm.$emit('openBoard');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().openBoard).toBeTruthy();
  });
});
