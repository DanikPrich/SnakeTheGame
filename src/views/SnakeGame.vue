<template>
  <div class="game">
    <keyboard-events @keyup="keyboardEvent"></keyboard-events>
    <game-field/>
    <button @click="startGame">Start</button>
    <button @click="refreshGame"> Refresh </button>
    <!-- <input type="number" placeholder="Game speed" class="game__speed" v-model="$gameSpeed"> -->
    <span class="game__score">Score: {{$score}}</span>
    <span class="game__over" v-show="$gameOver">GAME OVER!</span>

    <div class="controll">
      <div class="controll__block">
        <div class="controll__block-top">
          <button @click="controllButton(0)" class="controll__block-button">Top</button>
        </div>
        <div class="controll__block-center">
          <button @click="controllButton(3)" class="controll__block-button">Left</button>
          <button @click="controllButton(1)" class="controll__block-button">Right</button>
        </div>
        <div class="controll__block-top">
          <button @click="controllButton(2)" class="controll__block-button">Bot</button>
        </div>
        <!-- <button class="controll__block-button">Top</button>
        <button class="controll__block-button">Top</button>
        <button class="controll__block-button">Top</button>
        <button class="controll__block-button">Top</button> -->
      </div>
    </div>
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
      $score: 'score',
      $gameSpeed: 'gameSpeed'
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

        }, 200)
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
    },

    controllButton(e) {
      this.changeDirection(e)
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
  &__score
    color: green
    font-size: 16px
    margin-left: 15px
  

.controll
  width: 330px
  display: flex
  justify-content: center
  &__block
    width: 150px
    height: 150px
    margin-top: 15px
    &-top
      display: flex
      justify-content: center
    &-center
      display: flex
      justify-content: space-between
    &-button
      width: 50px
      height: 50px
</style>
