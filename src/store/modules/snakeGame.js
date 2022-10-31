import Vue from "vue"

export default {
	namespaced: true,
	state: {
		// null empty field 
		// 0 snake head
		// 1 snake body
		// 2 food
		field: [],
		fieldLength: 15,
		
		head: [0, 0],

		//dir 0 - up 
		//dir 1 - right
		//dir 2 - bottom
		//dir 3 - left
		direction: 0,

		gameOver: false,
		gameActive: false,

		foodPos: []
	},
	mutations: {
			setField(state, array) {
				state.field = array
			},

			changeHead(state, newHead) {
				// Vue.set(state.head, 1, newX);
				// Vue.set(state.head, 0, newY);

				state.head = newHead
			},

			changeYHead(state, newY) {
				Vue.set(state.head, 0, newY);
			},
			changeXHead(state, newX) {
				Vue.set(state.head, 1, newX);
			},

			changeDirection(state, newDir) {
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

				dispatch('refreshField')
				.then((fieldArr) => {

					commit('changeHead', [Math.floor(state.fieldLength/2), Math.floor(state.fieldLength/2)])

					fieldArr[state.head[0]][state.head[1]] = 0;

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

				dispatch('refreshField')
				.then((fieldArr) => {


					if(!state.gameOver) {
						commit('setGameActive', true)
						switch(state.direction){
							case 0: {
								if(state.head[0] - 1 >= 0) commit('changeYHead', state.head[0] - 1)
								else commit('setGameOver', true)
							}
							break;
							case 1: {
								if(state.head[1] + 1 < state.fieldLength) commit('changeXHead', state.head[1] + 1)
								else commit('setGameOver', true)
							}
							break;
							case 2: {
								if(state.head[0] + 1 < state.fieldLength) commit('changeYHead', state.head[0] + 1)
								else commit('setGameOver', true)
								// commit('changeYHead', state.head[0] + 1)
							}
							break;
							case 3: {
								if(state.head[1] - 1 >= 0) commit('changeXHead', state.head[1] - 1)
								else commit('setGameOver', true)
								// commit('changeXHead', state.head[1] - 1)
							}
							break;
						}
						fieldArr[state.foodPos[0]][state.foodPos[1]] = 2;
						
						fieldArr[state.head[0]][state.head[1]] = 0;
						// debugger
						if(state.foodPos[0] === state.head[0] && state.foodPos[1] === state.head[1]) {
							console.log('hit')
							dispatch('setRandomFoodPosition')
						}

						// let foodPos = getters.createFood

						/* dispatch('setRandomFood')

						.then((foodPos) => {
							debugger
							fieldArr[foodPos[0]][foodPos[1]] = 2;
						}) */



						commit('setField', fieldArr)
					} else {

						commit('setGameActive', false)
					}
					
					
				});



				/* fieldArr[state.head[0]][state.head[1]] = 0;
				commit('setField', fieldArr) */
			},

			setRandomFoodPosition({state, commit}) {
				commit('setFoodPosition', [Math.floor(Math.random() * (state.fieldLength - 1)), Math.floor(Math.random() * (state.fieldLength - 1))]);
				// commit('setFoodPosition', [8, 12]);
			}
	},
}
