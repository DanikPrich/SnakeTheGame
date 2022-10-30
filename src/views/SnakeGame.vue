<template>
  <div class="game">
    <game-field/>
    <button @click="startGame">Start</button>
    <keyboard-events @keyup="keyboardEvent"></keyboard-events>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { gameField, keyboardEvents } from '@/components'

export default {
  name: 'SnakeGame',
  data() {
    return {
      interval: null
    }
  },
  components: {
    gameField,
    keyboardEvents
  },
  computed:{
    ...mapState('snakeGame',{
      $field :'field',
      $head: 'head'
    })
  },
  methods: {
    ...mapActions({
      gameInit: "snakeGame/gameInit",
      gameTick: "snakeGame/gameTick"
    }),
    ...mapMutations({
      changeXHead: 'snakeGame/changeXHead',
      changeDirection: 'snakeGame/changeDirection'
    }),

    startGame() {
      this.interval = setInterval(()=>{
        this.gameTick()

      }, 800)
    },

    keyboardEvent(e) {
      // debugger

      switch(e.code){
        case 'ArrowUp': this.changeDirection(0)
        break;
        case 'ArrowRight': this.changeDirection(1)
        break;
        case 'ArrowDown': this.changeDirection(2)
        break;
        case 'ArrowLeft': this.changeDirection(3)
        break;
      }

      //ArrowRight ArrowDown ArrowLeft ArrowUp
    }

    /* goRight() {
      this.changeXHead(this.$head[1] + 1)
    } */
  },
  mounted() {
    this.gameInit();
  }
}
</script>
