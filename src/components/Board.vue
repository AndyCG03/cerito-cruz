<template>
  <div class="board" :class="{'board-draw': isDraw}">
    <button 
      v-for="(value, index) in board" 
      :key="index"
      :class="[ 
        'square', 
        winningLine.includes(index) ? 'winning-square' : '', 
        value === 'X' ? 'x' : value === 'O' ? 'o' : ''
      ]"
      @click="handleClick(index)"
      :disabled="isDisabled || value !== null"
    >
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    board: Array,
    winningLine: Array,
    isDisabled: Boolean,
    isDraw: Boolean 
  },
  methods: {
    handleClick(index) {
      this.$emit('square-click', index);
    }
  }
};
</script>

<style scoped>
.board {
  display: grid; 
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center; 
  align-items: center;
  margin: 20px;
}

.square {
  width: 100px;
  height: 100px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #333;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: background-color 0.3s, transform 0.1s;
}

.square:hover {
  background-color: #e6e6e6;
}

.square:active {
  transform: scale(0.95);
}

.winning-square {
  background-color: #90ee90; 
  border-color: #008000; 
}

.x {
  color: red;
  opacity: 0.7;
}

.o {
  color: blue;
  opacity: 0.7;
}

/* desactivar celdas */
.disabled {
  pointer-events: none;
  background-color: #e0e0e0;
}

.board-draw .square {
  background-color: #d3d3d3; 
  cursor: not-allowed;
}

/* en moviles */
@media (max-width: 600px) {
  .square {
    width: 70px;
    height: 70px;
    font-size: 1.5rem;
  }
}
</style>
