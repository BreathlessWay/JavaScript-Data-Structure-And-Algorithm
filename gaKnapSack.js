const gaKnapSack = (capacity, n, weights, values) => {
	let load = 0, value = 0;
	
	for (let i = 0; i < n && load < capacity; i++) {
		if (weights[i] <= capacity - load) {
			load += weights[i];
			value += values[i];
		} else {
			const r = (capacity - load) / weights[i];
			const v = values[i] * r;
			load += weights[i];
			value += v;
		}
	}
	
	console.log({value});
	return {value};
};

const capacity = 6, weights = [2, 3, 4], values = [3, 4, 5], n = weights.length;

gaKnapSack(capacity, n, weights, values);
