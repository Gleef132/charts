
export const amountMonths = (start: number, count: number) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
	let result = months.filter((item, index) => index + 1 >= start && index + 1 <= count)

	return result
}