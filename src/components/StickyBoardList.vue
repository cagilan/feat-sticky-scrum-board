<template>
  <div class="board-list">
    <div class="card" v-for="(board, index) in boards" :key="index">
      <div class="card-body">
        <p class="card-title">{{ board.board }}</p>
        <button
          type="button"
          class="btn btn-secondary btn-lg"
          @click="openBoard(board)"
        >
          Open
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg"
          @click="deleteBoard(board)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StickyBoardList',
  props: ['boards'],
  setup(props, { emit }) {
    /**
     * @private
     */
    const openBoard = (board: string) => {
      emit('chooseBoard', board);
    };

    /**
     * @private
     */
    const deleteBoard = (board: string) => {
      emit('deleteBoard', board);
    };
    return {
      openBoard,
      deleteBoard,
    };
  },
});
</script>

<style scoped>
.board-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: scroll;
  max-height: 800px;
}

.board-list .card {
  margin: 30px auto;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 5px 5px 30px 7px rgba(68, 67, 67, 0.25),
    -5px -5px 30px 7px rgba(78, 78, 78, 0.22);
  cursor: pointer;
  transition: 0.4s;
}

.board-list .card-title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  color: rgb(255, 98, 0);
  font-family: sans-serif;
  font-size: 24px;
  height: 40px;
}

.board-list button {
  margin: 20px;
}

.board-list .card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
}
</style>
