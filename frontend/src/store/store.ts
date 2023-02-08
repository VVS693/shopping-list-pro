import {combineReducers, configureStore} from "@reduxjs/toolkit"
import itemsReducer from "./reducers/itemsSlice"
import userReducer from "./reducers/usersSlice"
import messagesReducer from "./reducers/messagesSlice"

const rootReducer = combineReducers({
    itemsReducer,
    userReducer,
    messagesReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;