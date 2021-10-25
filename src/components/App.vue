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
// @ts-nocheck
import { defineComponent, ref } from 'vue';
import InputHeader from './components/InputHeader.vue';
import StickyBoard from './components/StickyBoard.vue';
import Boards from './components/Boards.vue';
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
    createSticky(header: any, content: any) {
      this.stickies.push({
        stickyId: `S${this.count + 1}`,
        header,
        content,
        column: 'To Do Items',
      });
      this.count++;
      this.saveStickies();
    },

    /**
     * @private
     */
    moveSticky(data, col) {
      const noteObj = JSON.parse(data);
      const moveNote = this.stickies.find((s) => s.stickyId == noteObj.stickyId);
      const newCol = col;
      moveNote.column = newCol;
      this.saveStickies();
    },

    /**
     * @private
     */
    saveStickies() {
      if (!this.selectedBoard) {
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
      savedData.find((board) => {
        if (board.board == this.selectedBoard) {
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
    deleteNote(id) {
      const note = this.stickies.findIndex((sticky) => sticky.stickyId == id);
      this.stickies.splice(note, 1);
      this.saveStickies();
    },

    /**
     * @private
     */
    newBoard(board) {
      this.selectedBoard = board;
      this.stickies = [];
      this.saveStickies();
    },

    /**
     * @private
     */
    loadBoard(board) {
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
