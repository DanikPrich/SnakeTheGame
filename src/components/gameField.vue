<template>
<div class="game__field">
	<!-- eslint-disable-next-line -->
	<div v-for="line in $field" class="game__line">
		<!-- eslint-disable-next-line -->
		<div 
		v-for="point in line" 
		class="game__block"
		:class="{
			'game__block-head' : point == 0,
			'game__block-body' : point == 1,
			'game__block-food': point == 2
		}"
		> 
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
		border: 1px white solid
		background-color: lightgrey
		&-food
			// background:  url('../img/apple.png')
			background: center / contain no-repeat url("../img/apple.png")
			background-color: lightgrey

		&-head
			background-color: black
		
		



</style>