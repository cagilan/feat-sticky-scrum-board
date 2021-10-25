<template>
  <div class="sticky-board">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      v-bind:name="column"
      v-bind:stickies="sortStickies(column)"
      v-on:delete="deleteNote"
      v-on:transfer="transferSticky"
    ></Column>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Stickies } from '../types/notes';
import Column from './Column.vue';

export default defineComponent({
  name: 'StickyBoard',
  components: {
    Column,
  },
  props: {
    stickies: Array,
    columns: Array,
  },
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { stickies } = props;
    /**
     * @private
     */
    const sortStickies = (col: string) => {
      // const notes = [];
      const notes = [] as Array<Stickies>;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      stickies.forEach((sticky) => {
        if (col === sticky.column) {
          notes.push(sticky);
        }
      });
      return notes;
    };

    /**
     * @private
     */
    const deleteNote = (id: string) => {
      emit('delete', id);
    };

    /**
     * @private
     */
    const transferSticky = (data: string, col: string) => {
      emit('transfer', data, col);
    };

    return {
      sortStickies,
      deleteNote,
      transferSticky,
    };
  },
});
</script>

<style scoped>
.sticky-board {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 70vh;
  max-height: 70vh;
}
@media only screen and (max-width: 500px) {
  .sticky-board {
    flex-direction: column;
  }
}
</style>
