import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: "Animesh",
  conversationId: "",
};

export const conversationSlice = createSlice({
  name: "conversationState",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload.currentChat;
      state.conversationId = action.payload.conversationId;
    },
  },
});
export const { setCurrentChat } = conversationSlice.actions;
export default conversationSlice.reducer;
