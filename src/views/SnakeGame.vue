<template>
  <div class="game">
    <keyboard-events @keyup="keyboardEvent"></keyboard-events>
    <game-field/>

    <div class="game__bottom">
      <button @click="startGame" class="game__bottom-btn game__bottom-btns_start ">Start</button>
      <span class="game__bottom-score" v-show="!$gameOver">Score: {{$score}}</span>

      
      <button @click="refreshGame" class="game__bottom-btn game__bottom-btns_refresh"> Refresh </button>
    </div>

    <label for="speed">Speed:</label>
    <select name="speed" @change="setNewGameSpeed" v-model="gameSpeedValue" class="game__speed">
      <option value="1000">1</option>
      <option value="700">2</option>
      <option value="500">3</option>
      <option value="300">4</option>
      <option value="200">5</option>
    </select>

    <!-- <span class="game__over" v-show="$gameOver">GAME OVER!</span> -->
    <div class="game__over" v-show="$gameOver">
      <span class="game__over-title">You loose it</span>
      <span class="game__over-text">Score: {{$score}}</span>
    </div>

    <div class="controll">
      <div class="controll__block">
        <div class="controll__block-top">
          <button @click="controllButton('top')" class="controll__block-button controll__block-button_top"></button>
        </div>
        <div class="controll__block-center">
          <button @click="controllButton('left')" class="controll__block-button controll__block-button_left"></button>
          <button @click="controllButton('right')" class="controll__block-button controll__block-button_right"></button>
        </div>
        <div class="controll__block-top">
          <button @click="controllButton('bottom')" class="controll__block-button controll__block-button_bot"></button>
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
      interval: null,
      gameSpeedValue: 300
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
      setDirection: 'snakeGame/setDirection',
      setGameSpeed: 'snakeGame/setGameSpeed',
    }),

    startGame() {
      if(!this.$gameActive) {
        this.setGameActive(true)
        this.interval = setInterval(()=>{
          this.gameTick()

        }, this.$gameSpeed)
      }
    },

    refreshGame() {
      clearInterval(this.interval);
      this.gameInit();
    },

    keyboardEvent(e) {
      // debugger

      switch(e.code){
        case 'ArrowUp': this.setDirection('top')
        break;
        case 'ArrowRight': this.setDirection('right')
        break;
        case 'ArrowDown': this.setDirection('bottom')
        break;
        case 'ArrowLeft': this.setDirection('left')
        break;
      }
    },

    controllButton(e) {
      this.setDirection(e)
    },

    setNewGameSpeed() {
      this.setGameSpeed(this.gameSpeedValue)
    }
  },
  mounted() {
    this.gameInit();
  }
}
</script>

<style lang="sass" scoped>

.game
  max-width: 250px
  margin: 0 auto
  padding-top: 20px

  &__field 
    display: flex
    flex-direction: column
    justify-content: space-between
    border: 5px solid #bedfff

  &__bottom
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    margin: 10px 0
    &-btn
      width: 85px
      height: 30px
      // margin-top: 10px
      // margin-right: 10px
      border-radius: 5px
      border: 1px solid lightgrey
      background-color: #fff
      cursor: pointer
      color: black
      font-size: 16px
      &:hover 
        background-color: #e6f4ff
      &_start
        justify-content: start
        margin-bottom: 10px
      &_refresh
        justify-content: center
    &-score
      color: green
      font-size: 12px
      // margin-left: 15px
  &__over
    position: absolute
    top: 110px
    left: 50%
    transform: translateX(-50%)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    // height: 60px
    // width: 200px
    padding: 10px 30px
    background-color: rgba(255, 255, 255, 0.9)
    text-align: center
    border-radius: 10px
    &-title
      color: red
      font-size: 13px
      // margin-left: 15px
      font-weight: bold
    &-text
      color: green
  &__speed
    width: 42px
    height: 25px
    font-size: 16px
    margin-left: 10px



.controll
  // width: 375px
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

@media (min-width: 330px)
  .game
    max-width: 310px
    &__bottom
      &-btn
        width: 100px
        height: 40px
      &-score
        font-size: 14px
    &__over
      top: 140px
      padding: 10px 30px
      &-title
        font-size: 19px
      &-text
        font-size: 16px
    

@media (min-width: 500px)
  .game
    max-width: 460px
    &__bottom
      &-score
        font-size: 19px
    &__over
      top: 200px
      &-title
        font-size: 30px
      &-text
        font-size: 20px
    
  .controll
    &__block
      width: 180px
      &-button
        width: 60px
        height: 60px
      

@media (min-width: 800px)
  .game
    max-width: 760px

    &__bottom
      &-btn
        width: 150px
        height: 40px
    
    &__over
      top: 340px
      &-title
        font-size: 35px
      &-text
        font-size: 24px
  .controll
    display: none

// @media (min-width: 1024px)
//   .game
//     max-width: 990px
</style>
