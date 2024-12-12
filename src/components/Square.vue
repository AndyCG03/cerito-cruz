<template>
    <button
      :class="[ 
        'square', 
        { 
          'winning-square': isWinning, 
          'draw-square': isDraw, 
          'disabled': isDisabled 
        },
        { 
          'x': value === 'X', 
          'o': value === 'O' 
        }
      ]"
      @click="$emit('click')"
      :disabled="isDisabled"
    >
      {{ value }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: null,
      },
      isWinning: {
        type: Boolean,
        default: false,
      },
      isDraw: {
        type: Boolean,
        default: false,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  /* Efecto al pasar el mouse por encima */
  .square:hover {
    background-color: #e6e6e6;
  }
  
  /* Efecto al hacer clic */
  .square:active {
    transform: scale(0.95);
  }
  
  /* Celdas ganadoras con fondo verde */
  .winning-square {
    background-color: #90ee90; /* Verde claro */
    border-color: #008000; /* Verde */
  }
  
  /* Estilo para 'X' y 'O' con opacidad 0.8 */
  .x {
    color: red; /* Rojo para X */
    opacity: 0.7;
  }
  
  .o {
    color: blue; /* Azul para O */
    opacity: 0.7;
  }
  
  /* Celdas desactivadas (cuando se termina el juego) */
  .disabled {
    pointer-events: none;
    background-color: #e0e0e0;
  }
  
  /* Estilo para el fondo de las casillas de empate */
  .draw-square {
    background-color: #f0f0f0;
  }
  
  /* Adaptación para pantallas pequeñas */
  @media (max-width: 600px) {
    .square {
      width: 70px;
      height: 70px;
      font-size: 1.5rem;
    }
  }
  </style>


