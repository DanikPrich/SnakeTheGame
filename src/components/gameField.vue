<template>
<div class="game__field">
	<!-- eslint-disable-next-line -->
	<div v-for="(line, indexLine) in $field" class="game__line">
		<!-- eslint-disable-next-line -->
		<div 
			v-for="(value, indexRow) in line" 
			class="game__block"
			:style="{ backgroundColor: (indexLine + indexRow) % 2 == 0 ? '#f0f8ff' : '#e6f4ff'}"
		> 
			<!-- {{ (indexLine + indexRow) % 2 == 0 ? 1 : 0 }} -->
			<div :class="{
				'game__block-head' : value == 0,
				'game__block-body' : value == 1,
				'game__block-food': value == 2
			}">

			</div>
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
	&__line
		display: flex
	&__block
		width: 16px
		height: 16px
		margin: 0
		// border: 0.5px lightgray solid
		background-color: #ffff
		&-food
			// background:  url('../img/apple.png')
			width: 100%
			height: 100%
			background: center / contain no-repeat url("../img/apple.png")
			// background-color: lightgrey
		&-head
			width: 100%
			height: 100%
			background-color: #179c1c
			border-radius: 100%
			color: grey
		&-body
			width: 100%
			height: 100%
			background-color: #23d929
			border-radius: 100%

		
		

@media (min-width: 330px)
	.game
		&__block
			width: 20px
			height: 20px

@media (min-width: 500px)
	.game
		&__block
			width: 30px
			height: 30px

@media (min-width: 800px)
	.game
		&__block
			width: 50px
			height: 50px

</style>