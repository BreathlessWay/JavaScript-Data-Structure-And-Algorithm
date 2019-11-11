// 0-1动态规划 背包问题
// 分数背包问题需要贪心算法
const findValues = (n, capacity, kS, weights, values) => {
	let i = n, k = capacity;
	while (i > 0 && k > 0) {
		console.log({i, k, v: kS[i][k], p: kS[i - 1][k]});
		if (kS[i][k] !== kS[i - 1][k]) {
			console.log(`物品${i}，重量${weights[i - 1]}，价值${values[i - 1]}`);
			k = k - weights[--i];
		} else {
			i--;
		}
	}
};

/*
	capacity: number=> 背包承重
	weights: array(number)=>物品重量
	values: array(number)=>物品价值
	n: number=>物品数量
 */
const dpKnapSack = (capacity, weights, values, n) => {
	let i, w, a, b, kS = [];
	
	for (i = 0; i <= n; i++) {
		kS[i] = [];
	}
	// O(n2) 复杂度
	for (i = 0; i <= n; i++) {
		for (w = 0; w <= capacity; w++) {
			// i(1) w(0) kS[i(1)][w(0)] => kS[1][0]=0
			// i(1) w(1) kS[i(1)][w(1)] weights[i - 1](2) => kS[1][1]=kS[0][1]=0
			// i(1) w(2) kS[i(1)][w(2)] weights[i - 1](2) => a=values[1-1](3)+kS[1-1][2-weights[i - 1](2)]=3 , b=kS[1-1][w(2)]=0, ks[1][2]=3>0?3:0
			// i(1) w(3) kS[i(1)][w(3)] weights[i - 1](2) => a=values[1-1](3)+kS[1-1][3-weights[i - 1](2)]=3 , b=kS[1-1][w(3)]=0, ks[1][3]=3>0?3:0
			// i(1) w(4) kS[i(1)][w(4)] weights[i - 1](2) => a=values[1-1](3)+kS[1-1][4-weights[i - 1](2)]=3 , b=kS[1-1][w(4)]=0, ks[1][4]=3>0?3:0
			// i(1) w(5) kS[i(1)][w(5)] weights[i - 1](2) => a=values[1-1](3)+kS[1-1][5-weights[i - 1](2)]=3 , b=kS[1-1][w(5)]=0, ks[1][5]=3>0?3:0
			
			// i(2) w(0) kS[i(2)][w(0)] => kS[2][0]=0
			// i(2) w(1) kS[i(2)][w(1)] weights[i - 1](3) => kS[2][1]=kS[1][1]=0
			// i(2) w(2) kS[i(2)][w(2)] weights[i - 1](3) => kS[2][2]=kS[1][2]=3
			// i(2) w(3) kS[i(2)][w(3)] weights[i - 1](3) => a=values[2-1](4)+kS[2-1][w(3)-weight[2-1](3)](0), b=kS[2-1][w(3)](3), kS[2][3]=4>3?4:3
			// i(2) w(4) kS[i(2)][w(4)] weights[i - 1](3) => a=values[2-1](4)+kS[2-1][w(4)-weight[2-1](3)](0), b=kS[2-1][w(4)](3), kS[2][4]=4>3?4:3
			// i(2) w(5) kS[i(2)][w(5)] weights[i - 1](3) => a=values[2-1](4)+kS[2-1][w(5)-weights[2-1](2)](3), b=kS[2-1][w(5)](3), ks[1][2]=7>3?7:0
			
			if (i === 0 || w === 0) {
				kS[i][w] = 0;
			} else if (weights[i - 1] <= w) {
				a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
				b = kS[i - 1][w];
				kS[i][w] = Math.max(a, b);
			} else {
				kS[i][w] = kS[i - 1][w];
			}
		}
	}
	
	console.log(kS);
	findValues(n, capacity, kS, weights, values);
	return kS[n][capacity];
};


const capacity = 5, weights = [2, 3, 4], values = [3, 4, 5], n = weights.length;

// console.log(dpKnapSack(capacity, weights, values, n));

const reCallDpKnapSack = (capacity, weights, values, n) => {
	if (capacity === 0 || n === 0) {
		return 0;
	}
	
	if (weights[n - 1] > capacity) {
		return reCallDpKnapSack(capacity, weights, values, n - 1);
	}
	// reCallKnapSack(capacity - weights[n - 1], weights, values, n - 1)：用于获取出去当前重量所装载的重量的最优值
	const a = values[n - 1] + reCallDpKnapSack(capacity - weights[n - 1], weights, values, n - 1);
	// 获取同承重下前一次的value
	const b = reCallDpKnapSack(capacity, weights, values, n - 1);
	return Math.max(a, b);
};

console.log(reCallDpKnapSack(capacity, weights, values, n));
