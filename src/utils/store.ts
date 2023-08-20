import contactList from "./slices/contact-list";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    contactList,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
