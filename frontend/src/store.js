import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer/RootReducer";
import { createEpicMiddleware } from "redux-observable";
import { rootEpics } from "./Epics/rootEpics";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
const epicMiddleware = createEpicMiddleware();
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const whiteDiaryStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpics);
export let persistor = persistStore(whiteDiaryStore);
export default whiteDiaryStore;