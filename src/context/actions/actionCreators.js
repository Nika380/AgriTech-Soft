import { APICALLREFRESH, OPENMODAL, CURRENTCULTUREVALUE } from "./actions";

const apiCallRefresh = (payload) => {
  return {
    type: APICALLREFRESH,
    payload,
  };
};

const openModal = (payload) => {
  return {
    type: OPENMODAL,
    payload,
  };
};

const currentCultureValue = (payload) => {
  return {
    type: CURRENTCULTUREVALUE,
    payload,
  };
};

export { apiCallRefresh, openModal, currentCultureValue };
