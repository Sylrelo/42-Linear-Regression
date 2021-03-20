const worker_train = () => {
	const derive = (data, thetas, learning_rate) => {
		let der = [0.0, 0.0],
			mse = 0.0,
			m = 1 / data.length

		for (const curr of data) {
			const tmp = thetas[0] + thetas[1] * curr[0] - curr[1]
			der[0] += tmp
			der[1] += tmp * curr[0]
			mse += tmp * tmp
		}
		return {
			thetas: [
				thetas[0] - learning_rate * m * der[0],
				thetas[1] - learning_rate * m * der[1]
			],
			mse: mse * m
		}
	}

	const train = data => {
		const start = new Date().getTime()

		let i,
			prev_thetas = [0.0, 0.0],
			ret = {
				thetas: [0.0, 0.0],
				mse: 0.0
			},
			diff = [0.0, 0.0]

		for (i = 0; i < data.iterations; i++) {
			ret = derive(data.data, prev_thetas, data.learning_rate)
			diff = [
				Math.abs(prev_thetas[0] - ret.thetas[0]),
				Math.abs(prev_thetas[1] - ret.thetas[1])
			]
			if ((diff[0] + diff[1]) * 0.5 < data.precision) {
				thetas = ret
				break
			}
			prev_thetas = ret.thetas
			self.postMessage({
				action: "ITERATION",
				i,
				thetas: ret.thetas,
				precision: diff,
				mse: ret.mse
			})
		}
		const time_taken = new Date().getTime() - start
		self.postMessage({
			action: "DONE",
			thetas: ret.thetas,
			iteration: i,
			time_taken
		})
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
	console.log("Worker is listening.")
}

try {
	if (window != self) {
		console.log("Service worker detected.")
		worker_train()
	}
} catch (e) {
	if (e?.toString()?.includes("window is not defined")) {
		console.log("Service worker detected.")
		worker_train()
	}
}
