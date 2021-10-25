<template>
  <div
    class="column"
    @dragover.prevent="dragOn"
    @dragleave.prevent="dragLeave"
    @drop.prevent="dropItem"
  >
    <h3 class="header">{{ name }}</h3>
    <StickyNote
      v-for="(sticky, index) in stickies"
      :key="index"
      v-bind:note="sticky"
      v-on:delete="deleteNote"
    ></StickyNote>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StickyNote from './StickyNote.vue';

export default defineComponent({
  components: { StickyNote },
  props: {
    name: String,
    stickies: Array,
  },
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { name } = props;

    const dropItem = (e: {
      dataTransfer: { getData: (arg0: string) => string };
      target: { className: string; style: { background: string } };
    }) => {
      const data = e.dataTransfer.getData('sticky');
      if (e.target.className === 'column') {
        e.target.style.background = 'white';
        emit('transfer', data, name);
      }
    };

    const dragOn = (e: { target: HTMLDivElement }) => {
      const column = e.target;
      if (column.className === 'column') {
        column.style.background = 'lightgrey';
      }
    };

    const deleteNote = (id: string) => {
      emit('delete', id);
    };

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      dropItem,
      dragOn,
      deleteNote,
    };
  },
});
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  width: 28%;
  margin: 15px;
  border: rgb(133, 132, 132) solid 1px;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  background: white;
}
@media only screen and (max-width: 500px) {
  .column {
    min-width: 90%;
    min-height: 30%;
  }
}

.column::-webkit-scrollbar {
  width: 10px;
  display: block;
}

.column::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 15px;
  display: none;
}

.column::-webkit-scrollbar-thumb {
  background: rgb(78, 119, 196);
}

.column::-webkit-scrollbar-thumb:hover {
  background: #555;
  width: 15px;
}

.header {
  position: sticky;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: white;
  top: 0;
  width: 100%;
}
</style>
