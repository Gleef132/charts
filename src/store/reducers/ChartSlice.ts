import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartData {
	data: string[];
	dataValue: object[];
	typeChart: string;
	isLoading: boolean;
}

const initialState: ChartData = {
	data: JSON.parse(localStorage.getItem('data')!) || [],
	dataValue: JSON.parse(localStorage.getItem('dataValue')!) || [],
	typeChart: JSON.parse(localStorage.getItem('typeChart')!) || '',
	isLoading: JSON.parse(localStorage.getItem('isLoading')!) || false,
}

export const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		dataAdd(state, action: PayloadAction<string[]>) {
			state.data = action.payload;
			localStorage.setItem('data', JSON.stringify(state.data))
		},
		dataValueAdd(state, action: PayloadAction<number[]>) {
			state.dataValue = [...state.dataValue, action.payload];
			localStorage.setItem('dataValue', JSON.stringify(state.dataValue))
		},
		typeChange(state, action: PayloadAction<string>) {
			state.typeChart = action.payload;
			localStorage.setItem('typeChart', JSON.stringify(state.typeChart))
		},
		loadingChange(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
			localStorage.setItem('isLoading', JSON.stringify(state.isLoading))
		},
		clearChart(state) {
			state.data = []
			state.dataValue = []
			localStorage.removeItem('data')
			localStorage.removeItem('dataValue')
		},
		chartChange(state, action: PayloadAction<any[]>) {
			state.dataValue = action.payload
			localStorage.setItem('dataValue', JSON.stringify(state.dataValue))
		}
	}
})

export default chartSlice.reducer;