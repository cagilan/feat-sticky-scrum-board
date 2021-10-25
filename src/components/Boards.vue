<template>
  <div class="boards">
    <div class="newboard">
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
      v-on:archiveBoard="archiveBoard"
    ></BoardList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import BoardList from "./BoardList.vue";

export default defineComponent({
  name: "Boards",
  components: { BoardList },
  data() {
    return {
      boardName: undefined,
      boards: []
    };
  },
  methods: {
    /**
     * @private
     */
    newBoard() {
      if (this.boardName) {
        this.$emit("newBoard", this.boardName);
      } else {
        // eslint-disable-next-line no-alert
        alert("Please enter a valid board name");
      }
    },

    /**
     * @private
     */
    chooseBoard(board: unknown) {
      this.$emit("chooseBoard", board);
    },

    /**
     * @private
     */
    sendBoards() {
      ipcRenderer.send("boardList", this.boards);
    },

    /**
     * @private
     */
    deleteBoard(board: { board: unknown }) {
      const boards = JSON.parse(localStorage.getItem("boardData"));
      const filteredBoards = boards.filter(b => b.board !== board.board);
      localStorage.setItem("boardData", JSON.stringify(filteredBoards));
      this.boards = filteredBoards;
    },

    /**
     * @private
     */
    archiveBoard(board: unknown) {
      localStorage.setItem("archives", JSON.stringify(board));
      this.deleteBoard(board);
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.boards = JSON.parse(localStorage.getItem("boardData"));
    ipcRenderer.on("openBoard", (event: unknown, msg: unknown) => {
      // eslint-disable-next-line no-shadow
      const board = this.boards.find(board => board.board === msg);
      this.chooseBoard(board);
    });
  },
  watch: {
    boards(oldBoards, newBoards) {
      if (oldBoards !== newBoards) {
        // eslint-disable-next-line no-console
        console.log("sending boards");
        this.sendBoards();
      }
    }
  }
});
</script>

<style scoped>
.boards {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}
.boardname {
  font-size: 2em;
  margin: 5px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
}
.newboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #ddd;
  padding: 20px;
  background: #f7f7f7;
}
.newboard button {
  margin-top: 20px;
}
</style>
