/**
 *
 * @param n Time left time in milliseconds
 * @returns
 */

export function elapsedTimeFormatter(n: number) {
	let time = n;

	const days = Math.floor(time / 86400000);
	time = time - days * 86400000;

	const hours = Math.floor(time / 3600000);
	time = time - hours * 3600000;

	const minutes = Math.floor(time / 60000);
	time = time - minutes * 60000;

	const seconds = Math.floor(time / 1000);
	time = time - seconds * 1000;

	let output = '';

	if (days > 0) {
		if (days >= 10) {
			output += days + ' days ';
		} else {
			output += '0' + days + ' days ';
		}
	}
	if (hours > 0) {
		if (hours >= 10) {
			output += hours + ':';
		} else {
			output += '0' + hours + ':';
		}
	} else {
		output += '00:';
	}

	if (minutes > 0) {
		if (minutes >= 10) {
			output += minutes + ':';
		} else {
			output += '0' + minutes + ':';
		}
	} else {
		output += '00:';
	}

	if (seconds > 0) {
		if (seconds >= 10) {
			output += seconds;
		} else {
			output += '0' + seconds;
		}
	} else {
		output += '00';
	}

	if (time > 0) {
		output += '.' + time;
	}

	return output;
}
