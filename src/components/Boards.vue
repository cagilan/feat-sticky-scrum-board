<template>
  <div class="sticky-boards">
    <div class="sticky-boards__newboard">
      <div class="input-group input-group-lg">
        <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
        <input
          type="text"
          v-model="boardName"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
        />
      </div>
      <button type="button" class="btn btn-primary btn-lg" @click="newBoard">
        Create new scrum board
      </button>
    </div>
    <BoardList
      v-bind:boards="boards"
      v-on:chooseBoard="chooseBoard"
      v-on:deleteBoard="deleteBoard"
    ></BoardList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ipcRenderer } from 'electron';
import BoardList from './BoardList.vue';

export default defineComponent({
  name: 'Boards',
  components: { BoardList },
  data() {
    return {
      boardName: undefined,
      boards: [],
    };
  },
  methods: {
    /**
     * @private
     */
    newBoard() {
      if (this.boardName) {
        this.$emit('newBoard', this.boardName);
      } else {
        // eslint-disable-next-line no-alert
        alert('Please enter a valid board name');
      }
    },

    /**
     * @private
     */
    chooseBoard(board: string) {
      this.$emit('chooseBoard', board);
    },

    /**
     * @private
     */
    sendBoards() {
      ipcRenderer.send('boardList', this.boards);
    },

    /**
     * @private
     */
    deleteBoard(board: { board: string }) {
      const boards = JSON.parse(localStorage.getItem('stickyBoardData'));
      const filteredBoards = boards.filter((b: { board: string; }) => b.board !== board.board);
      localStorage.setItem('stickyBoardData', JSON.stringify(filteredBoards));
      this.boards = filteredBoards;
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.boards = JSON.parse(localStorage.getItem('stickyBoardData'));
    ipcRenderer.on('openBoard', (event: Event, msg: string) => {
      // eslint-disable-next-line no-shadow
      const board = this.boards.find((board: { board: string; }) => board.board === msg);
      this.chooseBoard(board);
    });
  },
  watch: {
    boards(oldBoards, newBoards) {
      if (oldBoards !== newBoards) {
        // eslint-disable-next-line no-console
        console.log('sending boards');
        this.sendBoards();
      }
    },
  },
});
</script>

<style scoped>
.sticky-boards {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}
.sticky-boards__newboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #ddd;
  padding: 20px;
  background: #f7f7f7;
}
.sticky-boards__newboard button {
  margin-top: 20px;
}
</style>
