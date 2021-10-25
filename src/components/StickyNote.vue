<template>
  <div
    v-bind:id="note.stickyId"
    class="note"
    draggable="true"
    @dragstart="startDrag"
    @dragover.stop
  >
    <h2>{{ note.header }}</h2>
    <p v-for="(item, index) in note.content" class="content" :key="index">
      {{ item }}
    </p>
    <button
      type="button"
      class="btn btn-danger btn-lg"
      @click="deleteNote(note.stickyId)"
    >
      Delete the task
    </button>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
export default {
  props: {
    note: Object,
  },
  methods: {
    startDrag(e: {
      dataTransfer: { setData: (arg0: string, arg1: string) => void };
    }) {
      e.dataTransfer.setData('sticky', JSON.stringify(this.note));
    },
    deleteNote(id: any) {
      this.$emit('delete', id);
    },
  },
  beforeMount() {
    let items = this.note.content;
    try {
      items = items.split('\n');
      this.note.content = items;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.note {
  background: lightgoldenrodyellow;
  min-width: 50%;
  max-width: 70%;
  margin: 15px;
  text-align: left;
  padding: 10px;
  border: solid lightgray 1px;
}
.note:hover {
  cursor: grabbing;
  box-shadow: 4px 4px 2px grey;
}
.content {
  word-wrap: break-word;
}
</style>
