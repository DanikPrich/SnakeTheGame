import Vue from "vue"

export default {
	namespaced: true,
	state: {
		// null empty field 
		// 0 snake head
		// 1 snake body
		// 2 food
		field: [],
		fieldLength: 25,
		
		head: [12, 12],

		//dir 0 - up 
		//dir 1 - right
		//dir 2 - bottom
		//dir 3 - left
		direction: 0,

		gameOver: false,
		gameActive: false
	},
	mutations: {
			setField(state, array) {
				state.field = array
			},

			changeYHead(state, newX) {
				Vue.set(state.head, 0, newX);
			},
			changeXHead(state, newY) {
				Vue.set(state.head, 1, newY);
			},

			changeDirection(state, newDir) {
				state.direction = newDir
			},

			setGameOver(state, newVal) {
				state.gameOver = newVal;
			},
			setGameActive(state, newVal) {
				state.gameActive = newVal
			}
	},
	getters: {
			gameOver(state) {
				if(state.head[0] < 0 || state.head[0] >= state.fieldLength|| state.head[1] < 0 || state.head[1] >= state.fieldLength)
				return true
				else return false
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
				/* let fieldArr = Array(state.fieldLength).fill().map(() => Array(state.fieldLength));

				for (let i = 0; i < state.fieldLength; i++) {
					for (let j = 0; j < state.fieldLength; j++) {
						fieldArr[i][j] = null;
					}
				} */

				dispatch('refreshField')
				.then((fieldArr) => {

					fieldArr[12][12] = 0;
					commit('setField', fieldArr)

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

					
					if(!state.gameOver){

						switch(state.direction){
							case 0: commit('changeYHead', state.head[0] - 1)
							break;
							case 1: commit('changeXHead', state.head[1] + 1)
							break;
							case 2: commit('changeYHead', state.head[0] + 1)
							break;
							case 3: commit('changeXHead', state.head[1] - 1)
							break;
						}
					}
					if(!getters.gameOver){

						fieldArr[state.head[0]][state.head[1]] = 0;
						commit('setField', fieldArr)

					} else {
						commit('setGameOver', true)
					}
					
				});



				/* fieldArr[state.head[0]][state.head[1]] = 0;
				commit('setField', fieldArr) */
			},

			setRandomDirection() {

			}
	},
}
