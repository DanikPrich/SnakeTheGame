import Vue from "vue"
import { isItemInArray, randomPosition } from "@/helpers"

export default {
	namespaced: true,
	state: {
		// null empty field 
		// 0 snake head
		// 1 snake body
		// 2 food
		field: [],
		fieldLength: 15,
		
		snakeParts: [],
		snakeLenngth: 0,

		oldDirection: 'top',
		direction: 'top',

		gameOver: false,
		gameActive: false,

		foodPos: [],
		score: 0,
		gameSpeed: 300,
	},
	mutations: {
			setField(state, array) {
				state.field = array
			},

			changeSnakeParts(state, newPart) {
				state.snakeParts = [newPart]
			},

			changeHead(state, {newPos, addNew}){
				if(!addNew) {
					state.snakeParts.shift()
				}
				state.snakeParts.push([...newPos])
			},

			setDirection(state, newDir) {
				state.direction = newDir
			},
			
			setOldDirection(state, newOldDir) {
				state.oldDirection = newOldDir
			},

			setGameOver(state, newVal) {
				state.gameOver = newVal;
			},
			setGameActive(state, newVal) {
				state.gameActive = newVal
			},

			setFoodPosition(state, newPos) {
				state.foodPos = newPos;
			},

			setScore(state, newScore) {
				state.score = newScore;
				state.snakeLenngth = state.score;
			},

			incrementScore(state) {
				state.score = state.score + 1;
				state.snakeLenngth = state.score;
			},

			setGameSpeed(state, newSpeed) {
				state.gameSpeed = newSpeed
			}
	},
	actions: {
			refreshField({commit, state}) {
				let fieldArr = Array(state.fieldLength).fill().map(() => Array(state.fieldLength));

				for (let i = 0; i < state.fieldLength; i++) {
					for (let j = 0; j < state.fieldLength; j++) {
						fieldArr[i][j] = null;
					}
				}

				return fieldArr
			},

			gameInit({commit, state, dispatch}) {
			
				commit('setGameOver', false)
				commit('setGameActive', false)
				commit('setScore', 0)

				dispatch('refreshField')
				.then((fieldArr) => {

					commit('changeSnakeParts', [Math.floor(state.fieldLength/2), Math.floor(state.fieldLength/2)])

					fieldArr[state.snakeParts[state.snakeLenngth][0]][state.snakeParts[state.snakeLenngth][1]] = 0;

					commit('setField', fieldArr)

					dispatch('setRandomFoodPosition')

				})

			},


			gameTick({commit, state, dispatch}) {

				function isHitTheWall({x, y}) {
					let newPos = {
						x: state.snakeParts[state.snakeLenngth][1] + x,
						y: state.snakeParts[state.snakeLenngth][0] + y, 
					}, 
					checkingAxis = y == 0 ? 'x' : 'y'
	
					if(newPos[checkingAxis] < 0 || newPos[checkingAxis] >= state.fieldLength) {
						commit('setGameOver', true)
						return true
					}

					return false
				}


				dispatch('refreshField')
				.then((fieldArr) => {

					if(!state.gameOver) {
						commit('setGameActive', true)

						dispatch('checkDirection')

						switch(state.direction){
							case 'top': {
								const nextPosition = {y: -1, x: 0}
									if(!isHitTheWall(nextPosition)) {
										dispatch('checkHitHimself', nextPosition)
										dispatch('moveAndCheckFood', nextPosition)
									} 
							}
							break;
							case 'right': {
								const nextPosition = {y: 0, x: 1}
								if(!isHitTheWall(nextPosition)) {
									dispatch('checkHitHimself', nextPosition)
									dispatch('moveAndCheckFood', nextPosition)
								}
							}
							break;
							case 'bottom': {
								const nextPosition = {y: 1, x: 0}
								if(!isHitTheWall(nextPosition)) {
									dispatch('checkHitHimself', nextPosition)
									dispatch('moveAndCheckFood', nextPosition)
								}
							}
							break;
							case 'left': {
								const nextPosition = {y: 0, x: -1}
								if(!isHitTheWall(nextPosition)) {
									dispatch('checkHitHimself', nextPosition)
									dispatch('moveAndCheckFood', nextPosition)
								}
							}
							break;
						}

						commit('setOldDirection', state.direction)

						fieldArr[state.foodPos[0]][state.foodPos[1]] = 2;
						
						state.snakeParts.forEach(snakePart => {
							fieldArr[snakePart[0]][snakePart[1]] = 1
						})
						// debugger
						fieldArr[state.snakeParts[state.snakeLenngth][0]][state.snakeParts[state.snakeLenngth][1]] = 0

						commit('setField', fieldArr)
					} else {

						commit('setGameActive', false)
					}
					
				});

			},

			checkDirection({state, commit}) {
				if(state.oldDirection == 'top' && state.direction == 'bottom'
					|| state.oldDirection == 'right' && state.direction == 'left'
					|| state.oldDirection == 'bottom' && state.direction == 'top'
					|| state.oldDirection == 'left' && state.direction == 'right'){
					commit('setDirection', state.oldDirection)
				}
			},

			checkHitHimself({state, commit}, {x, y}) {
				let newPos = {
					x: state.snakeParts[state.snakeLenngth][1] + x,
					y: state.snakeParts[state.snakeLenngth][0] + y, 
				}
				
				if(isItemInArray(state.snakeParts, [newPos.y,  newPos.x])){
					commit('setGameOver', true)
				}
			},

			moveAndCheckFood({state, commit, dispatch}, {x, y}) {
				let newPos = {
					x: state.snakeParts[state.snakeLenngth][1] + x,
					y: state.snakeParts[state.snakeLenngth][0] + y, 
				}

				if(state.foodPos[0] === newPos.y && state.foodPos[1] === newPos.x){
					commit('changeHead', {
						newPos: [newPos.y, newPos.x], 
						addNew: true
					})
					commit('incrementScore')
					dispatch('setRandomFoodPosition')
				} else {
					commit('changeHead', {
						newPos: [newPos.y, newPos.x], 
						addNew: false
					})
				}
			},

			setRandomFoodPosition({state, commit}) {
				let randPos;
				do {
					randPos = randomPosition(state.fieldLength - 1)
				} while(isItemInArray(state.snakeParts, randPos))
				commit('setFoodPosition', randPos);
			},
	},
}