import Axios from "axios";

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const setDefaultAuthorizationHeader = (token) => {
  Axios.defaults.headers.common["Authorization"] = Boolean(token)
    ? `Bearer ${token}`
    : `Bearer null`;
};

export const setContentTypeDefaultHeader = () => {
  console.log("default setting");
  Axios.defaults.headers.common["content-type"] =
    "application/vnd.credready.com+json";
};
