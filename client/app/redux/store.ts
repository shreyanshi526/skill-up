import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

export const store = configureStore({
  reducer: {
    user: (state = initialState.user, action) => {
      switch (action.type) {
        case 'SET_USER':
          return action.payload;
        default:
          return state;
      }
    }
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 