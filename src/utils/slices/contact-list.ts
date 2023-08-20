import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFormfields, TinitialState } from "./types/type";
import { RootState } from "../store";

const initialState: TinitialState = {
  contactList: [],
};

export const contactList = createSlice({
  name: "contactList",
  initialState: initialState,
  reducers: {
    setContactList: (state, action: PayloadAction<TFormfields>) => {
      state.contactList.push(action.payload);
    },

    removeContactList: (state, action: PayloadAction<string>) => {
      const remainingList = state.contactList.filter((list) => {
        return list.id !== action.payload;
      });

      return {
        contactList: remainingList,
      };
    },

    updateContactList: (state, action) => {
      const payload = action.payload;

      console.log(payload, "payload");
      return {
        ...state,
        contactList: payload,
      };
    },
  },
});

export const getContactList = (state: RootState) =>
  state.contactList.contactList;

export const { setContactList, removeContactList, updateContactList } =
  contactList.actions;
export default contactList.reducer;
