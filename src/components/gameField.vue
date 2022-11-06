<template>
<div class="game__field">
	<!-- eslint-disable-next-line -->
	<div v-for="line in $field" class="game__line">
		<!-- eslint-disable-next-line -->
		<div 
		v-for="point in line" 
		class="game__block"
		
		> 
			<div :class="{
				'game__block-head' : point == 0,
				'game__block-body' : point == 1,
				'game__block-food': point == 2
			}">

			</div>
			<!-- <div class="game__block-food">

			</div> -->
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		data() {
			return {
			}
		},

		computed: {
			...mapState("snakeGame", {
				$field: "field"
			})
		}
		
	}
</script>

<style lang="sass" scoped>

.game
	&__field
	&__line
		display: flex
	&__block
		width: 23px
		height: 23px
		margin: 0
		border: 0.5px white solid
		background-color: lightgrey
		&-food
			// background:  url('../img/apple.png')
			width: 100%
			height: 100%
			background: center / contain no-repeat url("../img/apple.png")
			background-color: lightgrey
		&-head
			width: 100%
			height: 100%
			background-color: #ff7c00
			border-radius: 100%
			color: grey
		&-body
			width: 100%
			height: 100%
			background-color: #40ae1a
			border-radius: 100%

		
		



</style>