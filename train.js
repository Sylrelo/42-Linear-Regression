
const derive 	= (data, thetas, learning_rate) => {
	let der = [0.0, 0.0]

	for (const curr of data) {
		const tmp = (thetas[0] + thetas[1] * curr[0]) - curr[1]
		der[0] += tmp
		der[1] += tmp * curr[0]
	}
	return [
		thetas[0] - learning_rate * (1 / data.length) * der[0],
		thetas[1] - learning_rate * (1 / data.length) * der[1],
	]
}

const train 	= (data) => {
	let i,
		thetas 		= [0.0, 0.0],
		thetas_tmp 	= [0.0, 0.0]

	for ( i = 0; i < data.iterations ; i++ ) {
		self.postMessage({action: "ITERATION", i, thetas})
		thetas = derive(data.data, thetas, data.learning_rate)

	}
	self.postMessage({action: "DONE", thetas})
}

self.onmessage 	= function(e) {
	const { action } = e.data
	switch (action) {
		case "START":
			train(e.data)
			break;
		default: 
			break;
	}
}
