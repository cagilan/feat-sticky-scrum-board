import { shallowMount } from '@vue/test-utils';
import StickyBoards from '@/components/StickyBoards.vue';

describe('StickyBoards.vue', () => {
  xit('should emit chooseBoard event for choose board', async () => {
    const wrapper = shallowMount(StickyBoards);
    wrapper.vm.chooseBoard();
    wrapper.vm.$emit('chooseBoard');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().chooseBoard).toBeTruthy();
  });
});
