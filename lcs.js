const printSolution = (solution, l, wordX, wordY, m, n) => {
	let a = m, b = m, i, j, x = solution[a][b], answer = "";
	while (x) {
		if (solution[a][b] === "diagonal") {
			answer = wordX[a - 1] + answer;
			a--;
			b--;
		} else if (solution[a][b] === "left") {
			b--;
		} else if (solution[a][b] === "top") {
			a--;
		}
		x = solution[a][b];
	}
	console.log(answer);
};

const lcs = (wordX, wordY) => {
	let m = wordX.length,
		n = wordY.length,
		l = [],
		solution = [],
		i, j, a, b;
	
	for (i = 0; i <= m; i++) {
		l[i] = [];
		solution[i] = [];
		for (j = 0; j <= n; j++) {
			l[i][j] = 0;
			solution[i][j] = "";
		}
	}
	for (i = 0; i <= m; i++) {
		for (j = 0; j <= n; j++) {
			if (i === 0 || j === 0) {
				l[i][j] = 0;
			} else if (wordX[i - 1] === wordY[j - 1]) {
				l[i][j] = l[i - 1][j - 1] + 1;
				solution[i][j] = "diagonal";
			} else {
				a = l[i - 1][j];
				b = l[i][j - 1];
				l[i][j] = Math.max(a, b);
				solution[i][j] = l[i][j] === l[i - 1][j] ? "top" : "left";
			}
		}
	}
	printSolution(solution, l, wordX, wordY, m, n);
	console.log(l[m][n], solution);
	return l[m][n];
};

lcs("acbaed", "abcadf");

const reLcs = (wordX, wordY, n, m) => {
	
	if (n === 0 || m === 0) {
		return 0;
	}
	
	if (wordX[n] === wordY[m]) {
		return reLcs(wordX, wordY, n - 1, m - 1) + 1;
	}
	
	const a = reLcs(wordX, wordY, n - 1, m),
		b = reLcs(wordX, wordY, n, m - 1);
	
	return Math.max(a, b);
};

// console.log(reLcs("acbaed", "abcadf", 6, 6));
