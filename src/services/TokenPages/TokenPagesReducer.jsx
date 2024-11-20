import { ACTION_TYPE } from "../data";

export const initialStateTokenPage = {
  token: "",
  loading: true,
  message: "Loading...",
};

export const tokenPageReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_TOKEN_PAGE_START:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
      };

    case ACTION_TYPE.FETCH_TOKEN_PAGE_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        token: action.payload.token,
      };
    case ACTION_TYPE.FETCH_TOKEN_PAGE_ERROR:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
      };
  }
};
