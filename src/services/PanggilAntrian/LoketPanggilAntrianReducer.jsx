import { ACTION_TYPE } from "../data";

export const initialStateLoketPanggilAntrian = {
  loading: true,
  message: "Loading...",
  data: [],
};

export const loketPanggilAntrianReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_START:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
      };

    case ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        data: action.payload.data,
      };
    case ACTION_TYPE.FETCH_LOKET_PANGGIL_ANTRIAN_ERROR:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
      };
  }
};
