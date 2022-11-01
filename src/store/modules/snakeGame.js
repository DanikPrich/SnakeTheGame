import Vue from "vue"
import { isItemInArray, randomPosition } from "@/helpers"


/* function isItemInArray(array, item) {
	for(let i=0; i<array.length; i++) {
			if (array[i][0] == item[0] && array[i][1] == item[1]) {
					return true;   // Found it
			}
	}
	return false;   // Not found
}	 */

export default {
	namespaced: true,
	state: {
		// null empty field 
		// 0 snake head
		// 1 snake body
		// 2 food
		field: [],
		fieldLength: 15,
		
		// head: [0, 0],
		snakeParts: [],
		snakeLenngth: 0,

		//dir 0 - up 
		//dir 1 - right
		//dir 2 - bottom
		//dir 3 - left
		direction: 2,

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
				// Vue.set(state.head, 1, newX);
				// Vue.set(state.head, 0, newY);
				// debugger
				// let p = [...newPart]
				state.snakeParts = [newPart]
				// state.snakeParts.push([...newPart])
			},

			/* changeYHead(state, newY) {
				Vue.set(state.head, 0, newY);
			},
			changeXHead(state, newX) {
				Vue.set(state.head, 1, newX);
			}, */



			changeHead(state, {newPos, addNew}){
				// debugger
				if(!addNew) {
					state.snakeParts.shift()
				}
				state.snakeParts.push([...newPos])
				
			},




			setDirection(state, newDir) {
				state.direction = newDir
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
	getters: {
			/* gameOver(state) {
				if(state.head[0] < 0 || state.head[0] >= state.fieldLength|| state.head[1] < 0 || state.head[1] >= state.fieldLength)
				return true
				else return false
			} */

			/* createFood(state) {
				return [Math.floor(Math.random() * 24), Math.floor(Math.random() * 24)]
			} */
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
				/* let fieldArr = Array(state.fieldLength).fill().map(() => Array(state.fieldLength));

				for (let i = 0; i < state.fieldLength; i++) {
					for (let j = 0; j < state.fieldLength; j++) {
						fieldArr[i][j] = null;
					}
				} */
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
				// debugger
				// fieldArr[state.head[0]][state.head[1]] = 0;
				// commit('setField', fieldArr)
				//return fieldArr

			},


			gameTick({commit, state, dispatch, getters}) {
				
				/* let fieldArr = Array(state.fieldLength).fill().map(() => Array(state.fieldLength));

				for (let i = 0; i < state.fieldLength; i++) {
					for (let j = 0; j < state.fieldLength; j++) {
						fieldArr[i][j] = null;
					}
				} */







				/* function isItemInArray(array, item) {
					for(let i=0; i<array.length; i++) {
							if (array[i][0] == item[0] && array[i][1] == item[1]) {
									return true;   // Found it
							}
					}
					return false;   // Not found
				}	 */

				dispatch('refreshField')
				.then((fieldArr) => {


					if(!state.gameOver) {
						commit('setGameActive', true)
						/* switch(state.direction){
							case 0: {
								if(state.head[0] - 1 >= 0){
									commit('changeYHead', state.head[0] - 1)
								}
								else 
									commit('setGameOver', true)
							}
							break;
							case 1: {
								if(state.head[1] + 1 < state.fieldLength) 
									commit('changeXHead', state.head[1] + 1)
								else 
									commit('setGameOver', true)
							}
							break;
							case 2: {
								if(state.head[0] + 1 < state.fieldLength) 
									commit('changeYHead', state.head[0] + 1)
								else
									commit('setGameOver', true)
								// commit('changeYHead', state.head[0] + 1)
							}
							break;
							case 3: {
								if(state.head[1] - 1 >= 0) 
									commit('changeXHead', state.head[1] - 1)
								else 
									commit('setGameOver', true)
								// commit('changeXHead', state.head[1] - 1)
							}
							break;
						} */

						switch(state.direction){
							case 0: {
								if(state.snakeParts[state.snakeLenngth][0] - 1 >= 0){

									//Hit himself
									if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0] - 1, state.snakeParts[state.snakeLenngth][1]])){
										commit('setGameOver', true)
									}

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
									if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] + 1])){
										commit('setGameOver', true)
									}

									if(state.foodPos[1] === state.snakeParts[state.snakeLenngth][1] + 1 && state.foodPos[0] === state.snakeParts[state.snakeLenngth][0]){
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
									if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0] + 1, state.snakeParts[state.snakeLenngth][1]])){
										commit('setGameOver', true)
									}

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
									if(isItemInArray(state.snakeParts, [state.snakeParts[state.snakeLenngth][0], state.snakeParts[state.snakeLenngth][1] - 1])){
										commit('setGameOver', true)
									}

									// debugger
									if(state.foodPos[1] === state.snakeParts[state.snakeLenngth][1] - 1 && state.foodPos[0] === state.snakeParts[state.snakeLenngth][0]){
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

						fieldArr[state.foodPos[0]][state.foodPos[1]] = 2;

						state.snakeParts.forEach(snakePart => {
							// debugger
							fieldArr[snakePart[0]][snakePart[1]] = 0
						})
						// fieldArr[state.head[0]][state.head[1]] = 0;




						/* if(state.foodPos[0] === state.head[0] && state.foodPos[1] === state.head[1]) {
							console.log('hit')
							commit('incrementScore')
							dispatch('setRandomFoodPosition')
						
						} */


						commit('setField', fieldArr)
					} else {

						commit('setGameActive', false)
					}
					
					
				});



				/* fieldArr[state.head[0]][state.head[1]] = 0;
				commit('setField', fieldArr) */
			},

			changeDirection({state, commit}, newDirection){

				if(state.direction == 0 && newDirection == 2 
					|| state.direction == 1 && newDirection == 3 
					|| state.direction == 2 && newDirection == 0 
					|| state.direction == 3 && newDirection == 1
				){
					return
				}

				// if(state.direction == 1 && newDirection == 3){
				// 	return
				// }

				// if(state.direction == 2 && newDirection == 0){
				// 	return
				// }

				// if(state.direction == 3 && newDirection == 1){
				// 	return
				// }
				

				commit('setDirection', newDirection)
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
