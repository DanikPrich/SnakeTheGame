<template>
  <div class="game">
    <keyboard-events @keyup="keyboardEvent"></keyboard-events>
    <game-field/>

    <div class="game__bottom">
      <button @click="startGame" class="game__bottom-btns game__bottom-btns_start ">Start</button>
      <span class="game__bottom-score" v-show="!$gameOver">Score: {{$score}}</span>
      <button @click="refreshGame" class="game__bottom-btns game__bottom-btns_refresh"> Refresh </button>
    </div>


    <!-- <span class="game__over" v-show="$gameOver">GAME OVER!</span> -->
    <div class="game__over" v-show="$gameOver">
      <span class="game__over-title">You loose it</span>
      <span class="game__over-text">Score: {{$score}}</span>
    </div>

    <div class="controll">
      <div class="controll__block">
        <div class="controll__block-top">
          <button @click="controllButton(0)" class="controll__block-button controll__block-button_top"></button>
        </div>
        <div class="controll__block-center">
          <button @click="controllButton(3)" class="controll__block-button controll__block-button_left"></button>
          <button @click="controllButton(1)" class="controll__block-button controll__block-button_right"></button>
        </div>
        <div class="controll__block-top">
          <button @click="controllButton(2)" class="controll__block-button controll__block-button_bot"></button>
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
      setGameActive: 'snakeGame/setGameActive',
      changeDirection: 'snakeGame/setDirection',
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
  &__bottom
    width: 375px
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 5px
    &-btns
      width: 100px
      height: 30px
      // margin-top: 10px
      // margin-right: 10px
      border-radius: 5px
      border: 1px solid lightgrey
      background-color: #fff
      cursor: pointer
      color: black
      font-size: 16px
      &_start
        justify-content: start
      &_refresh
        justify-content: center
    &-score
      color: green
      font-size: 16px
      // margin-left: 15px
  &__over
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    height: 60px
    width: 200px
    padding: 10px
    background-color: rgba(255, 255, 255, 0.9)
    position: absolute
    top: 156px
    left: 85px
    text-align: center
    border-radius: 10px
    
    &-title
      color: red
      font-size: 28px
      // margin-left: 15px
      font-weight: bold
    &-text
      color: green
  

.controll
  width: 375px
  display: flex
  justify-content: center
  &__block
    width: 200px
    height: 200px
    margin-top: 15px
    &-top
      display: flex
      justify-content: center
    &-center
      display: flex
      justify-content: space-between
    &-button
      width: 66px
      height: 66px
      font-size: 28px
      &_right
        background: center / contain no-repeat url("../img/Arrow.png")
      &_left
        background: center / contain no-repeat url("../img/Arrow.png")
        transform: rotate(180deg)
      &_top
        background: center / contain no-repeat url("../img/Arrow.png")
        transform: rotate(270deg)
      &_bot
        background: center / contain no-repeat url("../img/Arrow.png")
        transform: rotate(90deg)

</style>
