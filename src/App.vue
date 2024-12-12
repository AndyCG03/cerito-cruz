<template>
  <div class="app">
    <h1>Tic-Tac-Toe</h1>
    <h2>{{ statusMessage }}</h2>
    <Board :board="board" :winningLine="winningLine" :isDraw="isDraw" :disabled="isGameOver" :xWins="xWins"
      :oWins="oWins" :draws="draws" @square-click="handleSquareClick" />
    <div class="scoreboard">
      <p>Victorias X: {{ xWins }}</p>
      <p>Victorias O: {{ oWins }}</p>
      <p>Empates: {{ draws }}</p>
    </div>
    <button @click="resetGame" class="reset-btn">Reiniciar Juego</button>

    <footer>
      <h3>Hecho por Andy Clemente Gago</h3>
    </footer>
  </div>


</template>

<script>
import { ref, computed } from 'vue';
import Board from './components/Board.vue';
import { calculateWinner } from './utils/helpers.js';

export default {
  components: { Board },
  setup() {
    const board = ref(Array(9).fill(null));
    const isXNext = ref(true);
    const winningLine = ref([]);
    const xWins = ref(0); // Contador de victorias para X
    const oWins = ref(0); // Contador de victorias para O
    const draws = ref(0);
    const isDraw = ref(false);
    const isGameOver = ref(false);

    const statusMessage = computed(() => {
      const result = calculateWinner(board.value);

      if (result) {
        winningLine.value = result.line;
        isGameOver.value = true;
        setTimeout(() => {
          if (result.winner === 'X') {
            xWins.value += 1;
          } else if (result.winner === 'O') {
            oWins.value += 1;
          }
        }, 1000); // Retraso de 1 segundo para evitar errores
        return `Ganador: ${result.winner}`;
      } else if (board.value.every(cell => cell !== null)) {
        // Caso de empate
        winningLine.value = [];
        isDraw.value = true;
        isGameOver.value = true;
        setTimeout(() => {
          draws.value += 1;
        }, 1000);  // Retraso de 1 segundo para evitar errores
        return `¡Es un empate!`;
      } else {
        winningLine.value = [];
        return `Siguiente jugador: ${isXNext.value ? 'X' : 'O'}`;
      }
    });

    const handleSquareClick = (index) => {
      if (board.value[index] || isGameOver.value) return;
      board.value[index] = isXNext.value ? 'X' : 'O';
      isXNext.value = !isXNext.value;
    };

    const resetGame = () => {
      board.value = Array(9).fill(null);
      isXNext.value = true;
      winningLine.value = [];
      isDraw.value = false;
      isGameOver.value = false;
    };

    return { board, statusMessage, handleSquareClick, resetGame, winningLine, xWins, oWins, draws, isDraw, isGameOver };
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.app {
  text-align: center;
  width: 100%;
  max-width: 400px;
  user-select: none;
}

h1 {
  font-size: 2rem;
  color: #333;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

h3 {
  align-self: center;
  font-size: 80%;
  color: #333;
}

.scoreboard {
  margin-top: 30px;
  font-size: 1.2rem;
}

button.reset-btn {
  padding: 10px;
  background-color: #f04e30;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

button.reset-btn:hover {
  background-color: #d0432b;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.board.disabled {
  opacity: 0.5;
  pointer-events: none;
}

@media (max-width: 600px) {
  .board {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .square {
    font-size: 1.5rem;
  }

  .scoreboard {
    font-size: 1rem;
  }

  button.reset-btn {
    font-size: 1rem;
  }
}
</style>
