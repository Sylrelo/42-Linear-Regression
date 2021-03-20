const defaultLineScale = {
	data: [
		{ x: 1, y: 0 },
		{ x: 0, y: 1 }
	],
	label: " ",
	borderColor: "#ff00ff55",
	fill: false
}

const initChartData = () => {
	const ctx = document.getElementById("chartData").getContext("2d"),
		ctxLine = document.getElementById("chartLine").getContext("2d"),
		ctxPrecision = document.getElementById("chartPrecision").getContext("2d"),
		ctxMSE = document.getElementById("chartMSE").getContext("2d")

	const sharedOptions = {
		options: {
			responsive: false,
			maintainAspectRatio: false,
			responsiveAnimationDuration: 0,
			legend: {
				display: false
			},
			animation: {
				duration: 0
			},
			hover: {
				animationDuration: 0
			},
			scales: {
				xAxes: [
					{
						type: "linear",
						position: "bottom"
					}
				]
			}
		}
	}

	chartPrecision = new Chart(ctxPrecision, {
		type: "line",
		data: {
			datasets: []
		},
		...sharedOptions
	})

	chartMSE = new Chart(ctxMSE, {
		type: "line",
		data: {
			datasets: []
		},
		...sharedOptions
	})

	chartLine = new Chart(ctxLine, {
		type: "line",
		data: {
			datasets: [defaultLineScale]
		},
		...sharedOptions
	})

	chartData = new Chart(ctx, {
		type: "scatter",
		data: {
			datasets: [[], []]
		},
		...sharedOptions
	})
}
