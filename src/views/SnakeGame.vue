<template>
  <div class="game">
    <keyboard-events @keyup="keyboardEvent"></keyboard-events>
    <game-field/>
    <button @click="startGame">Start</button>
    <button @click="refreshGame"> Refresh </button>
    <span class="game__over" v-show="$gameOver">GAME OVER!</span>
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
  watch: {
    $gameOver(newVal, oldVal) {
      if (newVal == true) clearInterval(this.interval);
    }
  },
  computed:{
    ...mapState('snakeGame',{
      $field :'field',
      $head: 'head',
      $gameActive : 'gameActive',
      $gameOver : 'gameOver',
    })
  },
  methods: {
    ...mapActions({
      gameInit: "snakeGame/gameInit",
      gameTick: "snakeGame/gameTick",
      
    }),
    ...mapMutations({
      changeXHead: 'snakeGame/changeXHead',
      changeDirection: 'snakeGame/changeDirection',
      setGameActive: 'snakeGame/setGameActive'
    }),

    startGame() {
      if(!this.$gameActive) {
        this.setGameActive(true)
        this.interval = setInterval(()=>{
          this.gameTick()

        }, 300)
      }
    },

    refreshGame() {
      clearInterval(this.interval);
      this.gameInit();
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

<style lang="sass" scoped>

.game
  &__over
    color: red
    font-size: 16px
    margin-left: 15px

</style>
