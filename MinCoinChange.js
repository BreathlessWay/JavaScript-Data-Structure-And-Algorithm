class MinCoinChange {
	constructor(icons) {
		this.icons = icons;
		this.cache = {};
	}
	
	get size() {
		return this.icons.length;
	}
	
	makeChange(amount) {
		const {icons, cache, size} = this;
		if (!amount) {
			return [];
		}
		
		if (cache[amount]) {
			return cache[amount];
		}
		
		let min = [], newAmount, newMin;
		
		for (let i = 0; i < size; i++) {
			const icon = icons[i];
			newAmount = amount - icon;
			if (newAmount >= 0) {
				newMin = this.makeChange(newAmount);
			}
			
			if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
				min = [icon].concat(newMin);
			}
		}
		return (cache[amount] = min);
	}
}

const minCoinChange = new MinCoinChange([1, 5, 10, 25]);

console.log(minCoinChange.makeChange(36));
