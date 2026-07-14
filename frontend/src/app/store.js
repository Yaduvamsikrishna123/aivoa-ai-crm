import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import hcpReducer from "../features/hcp/hcpSlice";
import interactionReducer from "../features/interaction/interactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hcp: hcpReducer,
    interaction: interactionReducer,
  },
});