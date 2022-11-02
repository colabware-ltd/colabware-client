import axios from "axios";

const ENTRYPOINT = process.env.REACT_APP_BACKEND_URL;
const endpoints = {
  project: (entrypoint, project) =>
    `${entrypoint}/project/${encodeURI(project)}`,
  balances: (entrypoint, address) =>
    `${entrypoint}/project/${address}/balances`,
  requests: (entrypoint, project, page, limit) =>
    `${entrypoint}/project/${project}/request/list?page=${page}&limit=${limit}`,
  request: (entrypoint, project) =>
    `${entrypoint}/user/project/${project}/request`,
  paymentIntent: (entrypoint) => `${entrypoint}/user/payment-intent`,
};

export const getCsrApi = (name, ...params) =>
  endpoints[name](ENTRYPOINT, ...params);

export const requestCsr = async (name, method, headers, body, ...params) => {
  try {
    const response = await axios({
      url: getCsrApi(name, ...params),
      method,
      headers: {
        "Content-Type":
          method.toUpperCase() !== "PATCH"
            ? "application/json"
            : "application/merge-patch+json",
        Accept: "application/json",
        ...headers,
      },
      data: body,
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return {
      isError: true,
      data: error.response && error.response.data ? error.response.data : error,
      error,
    };
  }
};
export const get = (name, ...params) => {
  if (params.length === 0) params[0] = {};
  return requestCsr(name, "GET", params[0].headers, params[0].body, ...params);
};

export const post = (name, ...params) => {
  if (params.length === 0) params[0] = {};
  return requestCsr(
    name,
    "POST",
    params[0].headers,
    params[0].body,
    ...(Object.prototype.hasOwnProperty.call(params[0], "params")
      ? params[0].params
      : params)
  );
};
