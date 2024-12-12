<template>
  <div class="board">
    <div 
      v-for="(cell, index) in board" 
      :key="index" 
      class="cell" 
      @click="handleClick(index)"
    >
      {{ cell }}
    </div>
    <button @click="$emit('reset')">Reiniciar Juego</button>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    board: Array,
    currentPlayer: String,
  },
  methods: {
    handleClick(index) {
      this.$emit("move", index);
    },
  },
};
</script>