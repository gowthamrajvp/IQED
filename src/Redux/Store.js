import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./Slice/UserSlice/UserSlice";
import QuizSlice from "./Slice/QuizSlice/QuizSlice";
import { AuthApi } from "./RTK/AuthAPI/AuthAPI";
import { QuizApi } from "./RTK/QuizAPI/QuizAPI";
import { iqScoresApi } from "./RTK/QuizAPI/iqScoresApi";

export const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
    QuizState: QuizSlice.reducer,
    [QuizApi.reducerPath]: QuizApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [iqScoresApi.reducerPath]: iqScoresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      QuizApi.middleware,
      iqScoresApi.middleware
    ),
});

setupListeners(store.dispatch);
