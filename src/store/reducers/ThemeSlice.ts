import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface themeData {
	theme: string;
}

const initialState: themeData = {
	theme: JSON.parse(localStorage.getItem('theme')!) || 'light'
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		themeChange(state, action: PayloadAction<string>) {
			state.theme = action.payload
			localStorage.setItem('theme', JSON.stringify(action.payload))
			document.documentElement.setAttribute('data-theme', action.payload)
		}
	}
})

export default themeSlice.reducer;