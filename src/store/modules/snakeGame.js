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

		//dir 0 - up 
		//dir 1 - right
		//dir 2 - bottom
		//dir 3 - left
		oldDirection: 0,
		direction: 0,

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

				dispatch('refreshField')
				.then((fieldArr) => {


					if(!state.gameOver) {
						commit('setGameActive', true)

						dispatch('checkDirection')

						switch(state.direction){
							case 0: {
								if(state.snakeParts[state.snakeLenngth][0] - 1 >= 0){

									//Hit himself
									/* if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0] - 1, state.snakeParts[state.snakeLenngth][1]])){
										commit('setGameOver', true)
									} */

									dispatch('checkHitHimself', {y: -1, x: 0})

									if(state.foodPos[0] === state.snakeParts[state.snakeLenngth][0] - 1 && state.foodPos[1] === state.snakeParts[state.snakeLenngth][1]){
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0] - 1, state.snakeParts[state.snakeLenngth][1]], 
											addNew: true
										})
										console.log('hit')
										commit('incrementScore')
										dispatch('setRandomFoodPosition')
									} else {
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0] - 1, state.snakeParts[state.snakeLenngth][1]], 
											addNew: false
										})
									}

								}
								else commit('setGameOver', true)
							}
							break;
							case 1: {
								if(state.snakeParts[state.snakeLenngth][1] + 1 < state.fieldLength){
									// debugger

									//Hit himself
									/* if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] + 1])){
										commit('setGameOver', true)
									} */

									dispatch('checkHitHimself', {y: 0, x: 1})

									if(state.foodPos[0] === state.snakeParts[state.snakeLenngth][0] && state.foodPos[1] === state.snakeParts[state.snakeLenngth][1] + 1){
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] + 1], 
											addNew: true
										})
										console.log('hit')
										commit('incrementScore')
										dispatch('setRandomFoodPosition')
									} else {
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] + 1], 
											addNew: false
										})
									}

								}
								else 
									commit('setGameOver', true)

							}
							break;
							case 2: {

								

								if(state.snakeParts[state.snakeLenngth][0] + 1 < state.fieldLength){

									//Hit himself
									/* if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0] + 1, state.snakeParts[state.snakeLenngth][1]])){
										commit('setGameOver', true)
									} */

									dispatch('checkHitHimself', {y: 1, x: 0})


									if(state.foodPos[0] === state.snakeParts[state.snakeLenngth][0] + 1 && state.foodPos[1] === state.snakeParts[state.snakeLenngth][1]){
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0] + 1, state.snakeParts[state.snakeLenngth][1]], 
											addNew: true
										})
										console.log('hit')
										commit('incrementScore')
										dispatch('setRandomFoodPosition')
									} else {
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0] + 1, state.snakeParts[state.snakeLenngth][1]], 
											addNew: false
										})
									}

								}
								else 
									commit('setGameOver', true)
							}
							break;
							case 3: {
								if(state.snakeParts[state.snakeLenngth][1] - 1 >= 0 ){

									//Hit himself
									/* if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] - 1])){
										commit('setGameOver', true)
									} */

									dispatch('checkHitHimself', {y: 0, x: -1})

									// debugger
									if(state.foodPos[0] === state.snakeParts[state.snakeLenngth][0] && state.foodPos[1] === state.snakeParts[state.snakeLenngth][1] - 1){
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] - 1], 
											addNew: true
										})
										console.log('hit')
										commit('incrementScore')
										dispatch('setRandomFoodPosition')
									} else {
										commit('changeHead', {
											newPos: [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] - 1], 
											addNew: false
										})
									}

								}
								else commit('setGameOver', true)
							}
							break;
						}

						commit('setOldDirection', state.direction)


						fieldArr[state.foodPos[0]][state.foodPos[1]] = 2;

						state.snakeParts.forEach(snakePart => {
							fieldArr[snakePart[0]][snakePart[1]] = 0
						})

						commit('setField', fieldArr)
					} else {

						commit('setGameActive', false)
					}
					
				});

			},

			checkDirection({state, commit}) {
				if(state.oldDirection == 0 && state.direction == 2
					|| state.oldDirection == 1 && state.direction == 3 
					|| state.oldDirection == 2 && state.direction == 0 
					|| state.oldDirection == 3 && state.direction == 1){
					commit('setDirection', state.oldDirection)
				}
			},

			checkHitHimself({state, commit}, {x, y}) {
				// debugger
				if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0] + y, state.snakeParts[state.snakeLenngth][1] + x])){
					commit('setGameOver', true)
				}
			},

			setRandomFoodPosition({state, commit}) {
				let randPos = randomPosition(state.fieldLength - 1)
				commit('setFoodPosition', randPos);

				while(isItemInArray(state.snakeParts, randPos)){
					randPos = randomPosition(state.fieldLength - 1)
					commit('setFoodPosition', randPos);
				}
			}
	},
}
