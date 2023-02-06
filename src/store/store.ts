import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chartReducer from './reducers/ChartSlice'
import themeReducer from './reducers/ThemeSlice'

const rootReducer = combineReducers({
	chartReducer,
	themeReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
