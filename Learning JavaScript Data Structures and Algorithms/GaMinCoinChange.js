class GaMinCoinChange {
	constructor(coins) {
		this.coins = coins;
	}
	
	get size() {
		return this.coins.length;
	}
	
	makeChange(amount) {
		const {coins, size} = this;
		let change = [],
			total = 0;
		for (let i = size; i >= 0; i--) {
			const coin = coins[i];
			while (total + coin <= amount) {
				change.unshift(coin);
				total += coin;
			}
		}
		return change;
	}
}

// const gaMinCoinChange = new GaMinCoinChange([1, 5, 10, 25]);
//
// console.log(gaMinCoinChange.makeChange(36));

// 不是最优解，动态规划可以得到最优解[3, 3]
const gaMinCoinChange = new GaMinCoinChange([1, 3, 4]);

console.log(gaMinCoinChange.makeChange(6));

// 相对动态规划更简单更快，但是并不能总是得到最优解
