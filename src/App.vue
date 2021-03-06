<template>
  <div id="app">
    <StickyBoards
      v-if="!selectedBoard"
      v-on:newBoard="newBoard"
      v-on:chooseBoard="loadBoard"
    ></StickyBoards>
    <StickyHeader
      v-if="selectedBoard"
      v-on:createSticky="createSticky"
      v-bind:stickies="stickies"
      v-bind:columns="columns"
      v-on:backToBoards="backToBoards"
    ></StickyHeader>
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
import { defineComponent } from 'vue';
import StickyHeader from './components/StickyHeader.vue';
import StickyBoard from './components/StickyBoard.vue';
import StickyBoards from './components/StickyBoards.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stickies } from './types/notes';

export default defineComponent({
  components: { StickyHeader, StickyBoard, StickyBoards },
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
    createSticky(header: string, content: string) {
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
    moveSticky(data: string, col: string) {
      const noteObj = JSON.parse(data);
      const moveNote = this.stickies
        .find((s: { stickyId: string; }) => s.stickyId === noteObj.stickyId);
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
      if (!localStorage.getItem('stickyBoardData')) {
        return localStorage.setItem('stickyBoardData', JSON.stringify([data]));
      }
      const savedData = JSON.parse(localStorage.getItem('stickyBoardData'));
      let boardExists = false;
      // eslint-disable-next-line array-callback-return
      savedData.find((boards: { board: string; stickies: Array<Stickies>; }) => {
        if (boards.board === this.selectedBoard) {
          // eslint-disable-next-line no-param-reassign
          boards.stickies = this.stickies;
          boardExists = true;
        }
      });
      if (boardExists) {
        return localStorage.setItem('stickyBoardData', JSON.stringify(savedData));
      }
      savedData.push(data);
      return localStorage.setItem('stickyBoardData', JSON.stringify(savedData));
    },

    /**
     * @private
     */
    deleteNote(id: string) {
      const note = this.stickies
        .findIndex((sticky: { stickyId: string; }) => sticky.stickyId === id);
      this.stickies.splice(note, 1);
      this.saveStickies();
    },

    /**
     * @private
     */
    newBoard(board: string) {
      this.selectedBoard = board;
      this.stickies = [];
      this.saveStickies();
    },

    /**
     * @private
     */
    loadBoard(board: { stickies: Array<Stickies>; board: string; }) {
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
