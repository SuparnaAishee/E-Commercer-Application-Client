/* eslint-disable no-console */
// import config from "@/src/config";
// import { Nexios } from "nexios-http";
// import { NexiosOptions } from "nexios-http/types/interfaces";
// import { cookies } from "next/headers";

// const defaultConfig: NexiosOptions = {
//   baseURL: config.base_url,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   credentials: "include",
// };

// const nexiosInstance = new Nexios(defaultConfig);

// // Add request interceptor
// nexiosInstance.interceptors.request.use((config) => {
//   const accessToken = cookies().get("accessToken")?.value;
//   if (accessToken) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `${accessToken}`,
//     };
//   }

//   return config;
// });

// // Add response interceptor
// nexiosInstance.interceptors.response.use((response) => {
//   // Transform response data if needed
//   return response;
// });

// export default nexiosInstance;
import config from "@/src/config";
import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

const defaultConfig: NexiosOptions = {
  baseURL: config.base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor
nexiosInstance.interceptors.request.use((config) => {
  let accessToken;

  // Check if running on the server
  if (typeof window === "undefined") {
    accessToken = cookies().get("accessToken")?.value;
  } else {
    // Running on the client
    accessToken = Cookies.get("accessToken");
  }

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `${accessToken}`,
    };
  }

  return config;
});

// Add response interceptor
nexiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default nexiosInstance;