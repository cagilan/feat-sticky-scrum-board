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
    const { stickies } = props;
    /**
     * @private
     */
    const sortStickies = (col: any) => {
      const notes = [];
      // @ts-ignore
      stickies.forEach((sticky) => {
        // @ts-ignore
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
    const transferSticky = (data: any, col: any) => {
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
