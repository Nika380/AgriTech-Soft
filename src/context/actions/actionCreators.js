import {
  APICALLREFRESH,
  OPENMODAL,
  CURRENTCULTUREVALUE,
  ACRTIVEFORMBTN,
  EDITISON,
  ADDCULTUREACTION,
} from "./actions";

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

const activeButton = (payload) => {
  return {
    type: ACRTIVEFORMBTN,
    payload,
  };
};

const handleEdit = (payload) => {
  return {
    type: EDITISON,
    payload,
  };
};
const cultureAction = (payload) => {
  return {
    type: ADDCULTUREACTION,
    payload,
  };
};

export {
  apiCallRefresh,
  openModal,
  currentCultureValue,
  activeButton,
  handleEdit,
  cultureAction,
};
