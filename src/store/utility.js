import Axios from "axios";

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const setDefaultAuthorizationHeader = (token) => {
  console.log('utility ', token);
  if (token) {
    let jwt = JSON.parse(token).map.jwt;
    Axios.defaults.headers.common["Authorization"] = Boolean(token)
      ? `${jwt}`
      : `Bearer null`;
  }
};

export const setContentTypeDefaultHeader = () => {
  console.log("default setting");
  Axios.defaults.headers.common["content-type"] =
    "application/vnd.credready.com+json";
};

export const setAllowAccessHeader = () => {
  console.log("default setting");
  Axios.defaults.headers.common["Access-Control-Allow-Origin"] =
    "*";
};