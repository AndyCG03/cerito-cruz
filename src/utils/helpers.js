export function calculateWinner(board) {
    const lines = [
      [0, 1, 2], // Filas
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columnas
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonales
      [2, 4, 6],
    ];
  
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
  
    return null;
  }