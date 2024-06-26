import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: "https://records-awl1.onrender.com/api",
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const getRequest = (data) => {
  const { path, config, payload, success, error, final } = data;

  axiosInstance.get(path, config).then(success).catch(error).finally(final);
};

const postRequest = async (data) => {
  const { path, payload, config, success, error, final } = data;
  await axiosInstance
    .post(path, payload, config)
    .then(success)
    .catch(error)
    .finally(final);
};

const putRequest = (data) => {
  const { path, payload, success, config, error, final } = data;
  axiosInstance
    .put(path, payload, config)
    .then(success)
    .catch(error)
    .finally(final);
};

const deleteRequest = (data) => {
  const { path, payload, config, success, error, final } = data;
  axiosInstance
    .delete(path, { data: payload })
    .then(success)
    .catch(error)
    .finally(final);
};

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
