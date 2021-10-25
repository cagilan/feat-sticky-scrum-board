<template>
  <div class="note-content">
    <div class="card">
      <div class="card-body">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg"
            >Enter your task header</span
          >
          <input
            type="text"
            v-model="taskHead"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
          />
        </div>
        <div class="input-group" style="margin-top: 10px;">
          <span class="input-group-text">Enter your task</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            v-model="task"
          ></textarea>
        </div>
        <div class="note-content__buttons">
          <button
            type="button"
            class="btn btn-info btn-lg"
            @click="createSticky"
          >
            Create Note
          </button>
          <button
            type="button"
            class="btn btn-dark btn-lg"
            @click="backToBoards"
          >
            Back to boards
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: ['stickies', 'columns'],
  data() {
    return {
      taskHead: '',
      task: '',
    };
  },
  methods: {
    createSticky() {
      if (this.taskHead && this.task) {
        this.$emit('createSticky', this.taskHead, this.task);
        this.taskHead = '';
      } else {
        alert('Please enter a valid task header and task details...');
      }

      this.task = '';
    },

    backToBoards() {
      this.$emit('backToBoards');
    },
  },
});
</script>

<style scoped>
.note-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
}

.note-content__buttons {
  text-align: center;
  margin-top: 20px;
}

.note-content__buttons button {
  margin: 10px;
}
</style>
