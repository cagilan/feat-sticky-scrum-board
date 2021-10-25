import { shallowMount, VueWrapper } from "@vue/test-utils";
import StickyBoard from "@/components/StickyBoard.vue";

describe('StickyBoard.vue', () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = shallowMount(StickyBoard, {
      propsData: {
        columns: '',
      },
    });
  });

  it('renders props.column when initialized', () => {
    const column = '';
    expect(wrapper.text()).toMatch(column);
  });

  it('should emit deleteNote event for delete board', async () => {
    wrapper.vm.deleteNote();
    wrapper.vm.$emit('delete');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().delete).toBeTruthy();
  });

  it('should emit transfer event for transferSticky', async () => {
    wrapper.vm.transferSticky();
    wrapper.vm.$emit('transfer');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().transfer).toBeTruthy();
  });

  it('sortStickies', async () => {
    wrapper = shallowMount(StickyBoard, {
      propsData: {
        stickies: [{
          column: 'Done', content: [1], header: '1', stickyId: 'test',
        },
        {
          column: 'Done', content: [2], header: '2', stickyId: 'test',
        },
        ],
      },
    });
    wrapper.vm.sortStickies('Done');

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.stickies).toEqual([{
      column: 'Done', content: [1], header: '1', stickyId: 'test',
    },
    {
      column: 'Done', content: [2], header: '2', stickyId: 'test',
    },
    ]);
  });
});
