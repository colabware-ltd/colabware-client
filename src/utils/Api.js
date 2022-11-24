import axios from "axios";

const ENTRYPOINT = process.env.REACT_APP_BACKEND_URL;
const endpoints = {
  user: (entrypoint) => `${entrypoint}/user`,
  login: (entrypoint) => `${entrypoint}/login`,
  logout: (entrypoint) => `${entrypoint}/user/logout`,
  project: (entrypoint, project) =>
    `${entrypoint}/project/${encodeURI(project)}`,
  newProject: (entrypoint) => `${entrypoint}/user/project`,
  projects: (entrypoint, page, limit) =>
    `${entrypoint}/project/list?page=${page}&limit=${limit}`,
  branches: (entrypoint, owner, repo) =>
    `${entrypoint}/user/project/branches/${owner}/${repo}`,
  balances: (entrypoint, address) =>
    `${entrypoint}/project/${address}/balances`,
  requests: (entrypoint, project, page, limit, status) =>
    `${entrypoint}/project/${project}/request/list?page=${page}&limit=${limit}&status=${status}`,
  request: (entrypoint, project) =>
    `${entrypoint}/user/project/${project}/request`,
  approveRequest: (entrypoint, request) =>
    `${entrypoint}/user/request/${request}/approve`,
  paymentIntent: (entrypoint) => `${entrypoint}/user/payment-intent`,
  proposal: (entrypoint, request) =>
    `${entrypoint}/user/request/${request}/proposal`,
  proposals: (entrypoint, request) =>
    `${entrypoint}/request/${request}/proposals`,
  selectProposal: (entrypoint, request, proposal) =>
    `${entrypoint}/user/request/${request}/proposal/${proposal}/select`,
  contributions: (entrypoint, request) =>
    `${entrypoint}/request/${request}/contributions`,
  tokenHolding: (entrypoint, token) =>
    `${entrypoint}/user/token/${token}/holding`,
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
      validateStatus: (status) => {
        return (status >= 200 && status <= 302) || status === 401;
      },
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
