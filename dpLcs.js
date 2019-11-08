const printSolution = (solution, l, wordX, wordY, m, n) => {
	let x = solution[m][n], answer = "";
	while (x) {
		if (solution[m][n] === "diagonal") {
			// diagonal表示符合条件的字符，m-1是因为m其实是length，要获取实际位置需要-1
			answer = wordX[m - 1] + answer;
			m--;
			n--;
		}
		if (solution[m][n] === "left") {
			n--;
		}
		if (solution[m][n] === "top") {
			m--;
		}
		x = solution[m][n];
	}
	console.log("字符串：%s", answer);
};

const dpLcs = (wordX, wordY) => {
	let m = wordX.length, n = wordY.length, l = [], solution = [];
	// 初始化二维数组
	for (let i = 0; i <= m; i++) {
		l[i] = [];
		solution[i] = [];
		for (let j = 0; j <= n; j++) {
			l[i][j] = 0;
			solution[i][j] = "";
		}
	}
	
	// console.log(l);
	
	for (let i = 0; i <= m; i++) {
		for (let j = 0; j <= n; j++) {
			if (i === 0 || j === 0) {
				l[i][j] = 0;
			} else if (wordX[i - 1] === wordY[j - 1]) {
				// 在j之前的重复数
				l[i][j] = l[i - 1][j - 1] + 1;
				solution[i][j] = "diagonal";
			} else {
				const a = l[i - 1][j],
					b = l[i][j - 1];
				l[i][j] = Math.max(a, b);
				solution[i][j] = l[i][j] === a ? "top" : "left";
			}
		}
	}
	
	printSolution(solution, l, wordX, wordY, m, n);
	console.log(`%o, \n %d, \n %o`, l, l[m][n], solution);
	
	return l[m][n];
};

// dpLcs("acbaed", "abcadf");

const recallDpLcs = (wordX, wordY, m, n) => {
	if (m === 0 || n === 0) {
		return 0;
	}
	
	if (wordX[m - 1] === wordY[n - 1]) {
		return recallDpLcs(wordX, wordY, m - 1, n - 1) + 1;
	}
	
	const a = recallDpLcs(wordX, wordY, m - 1, n),
		b = recallDpLcs(wordX, wordY, m, n - 1);
	
	return Math.max(a, b);
};

console.log(recallDpLcs("acbaed", "abcadf", 6, 6));
