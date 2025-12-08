import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import openAddDreamFormReducer from './slices/toggleAddDreamFormSlice'
import themeReducer from './slices/ThemeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        openAddDreamForm: openAddDreamFormReducer,
        theme: themeReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
