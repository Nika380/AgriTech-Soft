import {
  APICALLREFRESH,
  OPENMODAL,
  CURRENTCULTUREVALUE,
} from "../actions/actions";

const globalReducer = (state, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case APICALLREFRESH: {
      return { ...state, apiCallRefresh: payload };
    }
    case OPENMODAL: {
      return { ...state, openModal: payload };
    }
    case CURRENTCULTUREVALUE: {
      return { ...state, currentCultureValue: payload };
    }

    default:
      break;
  }
};

const initialState = {
  apiCallRefresh: false,
  openModal: false,
  currentCultureValue: {},
};

export { globalReducer, initialState };
