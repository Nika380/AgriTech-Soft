import {
  APICALLREFRESH,
  OPENMODAL,
  CURRENTCULTUREVALUE,
  ACRTIVEFORMBTN,
  EDITISON,
  ADDCULTUREACTION,
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
      return { ...state, values: payload };
    }
    case ACRTIVEFORMBTN: {
      return { ...state, activeFormButton: payload };
    }
    case EDITISON: {
      return { ...state, editCulture: payload };
    }
    case ADDCULTUREACTION: {
      return { ...state, cultureAction: payload };
    }

    default:
      break;
  }
};

const initialState = {
  apiCallRefresh: false,
  openModal: false,
  activeFormButton: true,
  editCulture: false,
  values: {
    cultureName: "",
    squareMeter: "",
    location: "",
  },
  cultureAction: {
    taskName: "",
    taskType: "",
    price: "",
    plannedAt: "",
  },
};

export { globalReducer, initialState };
