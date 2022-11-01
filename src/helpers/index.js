
export function isItemInArray(array, item) {
	for(let i=0; i<array.length; i++) {
			if (array[i][0] == item[0] && array[i][1] == item[1]) {
					return true;   // Found it
			}
	}
	return false;   // Not found
}	

export function randomPosition(max) {
	return [Math.floor(Math.random() * max), Math.floor(Math.random() * max)]
}