const derive = (data, thetas, learning_rate) => {
	let der = [0.0, 0.0]

	for (const curr of data) {
		const tmp = thetas[0] + thetas[1] * curr[0] - curr[1]
		der[0] += tmp
		der[1] += tmp * curr[0]
	}
	return [
		thetas[0] - learning_rate * (1 / data.length) * der[0],
		thetas[1] - learning_rate * (1 / data.length) * der[1]
	]
}

const mean_squared_error = (data, thetas) => {
	let mse = 0.0

	for (const curr of data) {
		const tmp = thetas[0] + thetas[1] * curr[0] - curr[1]
		mse += tmp * tmp
	}

	return (1 / data.length) * mse
}

const train = data => {
	const start = new Date().getTime()

	let i,
		thetas = [0.0, 0.0],
		thetas_tmp = [0.0, 0.0],
		diff = [0.0, 0.0],
		mse = 0.0

	for (i = 0; i < data.iterations; i++) {
		thetas_tmp = derive(data.data, thetas, data.learning_rate)
		diff = [Math.abs(thetas[0] - thetas_tmp[0]), Math.abs(thetas[1] - thetas_tmp[1])]

		if ((diff[0] + diff[1]) * 0.5 < data.precision) {
			thetas = thetas_tmp
			break
		}
		mse = mean_squared_error(data.data, thetas)
		thetas = thetas_tmp

		self.postMessage({ action: "ITERATION", i, thetas, precision: diff, mse })
	}
	const time_taken = new Date().getTime() - start
	self.postMessage({ action: "DONE", thetas, iteration: i, time_taken })
}

self.onmessage = function (e) {
	const { action } = e.data
	switch (action) {
		case "START":
			train(e.data)
			break
		default:
			break
	}
}
