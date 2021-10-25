<template>
  <div id="app">
    <Boards
      v-if="!selectedBoard"
      v-on:newBoard="newBoard"
      v-on:chooseBoard="loadBoard"
    ></Boards>
    <InputHeader
      v-if="selectedBoard"
      v-on:createSticky="createSticky"
      v-bind:stickies="stickies"
      v-bind:columns="columns"
      v-on:backToBoards="backToBoards"
    ></InputHeader>
    <StickyBoard
      v-if="selectedBoard"
      v-bind:stickies="stickies"
      v-bind:columns="columns"
      v-on:transfer="moveSticky"
      v-on:delete="deleteNote"
    ></StickyBoard>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineComponent } from 'vue';
import InputHeader from './InputHeader.vue';
import StickyBoard from './StickyBoard.vue';
import Boards from './Boards.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  components: { InputHeader, StickyBoard, Boards },
  data() {
    return {
      stickies: [],
      columns: ['To Do Items', 'Work In Progress', 'Done'],
      count: 0,
      selectedBoard: undefined,
    };
  },
  methods: {
    /**
     * @private
     */
    createSticky(header: unknown, content: unknown) {
      this.stickies.push({
        stickyId: `S${this.count + 1}`,
        header,
        content,
        column: 'To Do Items',
      });
      // eslint-disable-next-line no-plusplus
      this.count++;
      this.saveStickies();
    },

    /**
     * @private
     */
    moveSticky(data, col) {
      const noteObj = JSON.parse(data);
      const moveNote = this.stickies.find((s) => s.stickyId === noteObj.stickyId);
      const newCol = col;
      moveNote.column = newCol;
      this.saveStickies();
    },

    /**
     * @private
     */
    saveStickies() {
      if (!this.selectedBoard) {
        // eslint-disable-next-line no-console
        return console.log('no board');
      }
      const board = this.selectedBoard;
      const { stickies } = this;
      const data = {
        board,
        stickies,
      };
      if (!localStorage.getItem('boardData')) {
        return localStorage.setItem('boardData', JSON.stringify([data]));
      }
      const savedData = JSON.parse(localStorage.getItem('boardData'));
      let boardExists = false;
      // eslint-disable-next-line
      savedData.find((board) => {
        if (board.board === this.selectedBoard) {
          // eslint-disable-next-line no-param-reassign
          board.stickies = this.stickies;
          boardExists = true;
        }
      });
      if (boardExists) {
        return localStorage.setItem('boardData', JSON.stringify(savedData));
      }
      savedData.push(data);
      return localStorage.setItem('boardData', JSON.stringify(savedData));
    },

    /**
     * @private
     */
    deleteNote(id: unknown) {
      const note = this.stickies.findIndex((sticky) => sticky.stickyId === id);
      this.stickies.splice(note, 1);
      this.saveStickies();
    },

    /**
     * @private
     */
    newBoard(board: unknown) {
      this.selectedBoard = board;
      this.stickies = [];
      this.saveStickies();
    },

    /**
     * @private
     */
    loadBoard(board: { stickies: string|unknown[]; board: unknown; }) {
      this.stickies = board.stickies;
      this.selectedBoard = board.board;
      this.count = board.stickies.length;
    },

    /**
     * @private
     */
    backToBoards() {
      this.selectedBoard = undefined;
    },
  },
});
</script>

<style>
body {
  margin: 0px;
}
#app {
  min-height: 100vh;
  max-height: 100vh;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
