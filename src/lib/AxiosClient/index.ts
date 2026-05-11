import axios from "axios";
import Cookies from "js-cookie";
import config from "@/src/config";

export const AxiosClient = axios.create({
  baseURL: config.base_url,
});

let refreshInFlight: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await axios.post(
      `${config.base_url.replace(/\/+$/, "")}/auth/refreshToken`,
      {},
      { headers: { cookies: `refreshToken=${refreshToken}` } },
    );
    const next = res?.data?.data?.accessToken as string | undefined;
    if (!next) return null;
    Cookies.set("accessToken", next, { sameSite: "lax" });
    return next;
  } catch {
    return null;
  }
};

AxiosClient.interceptors.request.use((cfg) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken && cfg.headers) {
    cfg.headers.Authorization = accessToken;
  }
  return cfg;
});

AxiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config;
    if (
      error?.response?.status === 401 &&
      original &&
      !original._retried &&
      !String(original.url ?? "").includes("auth/refreshToken")
    ) {
      original._retried = true;
      refreshInFlight ||= refreshAccessToken().finally(() => {
        refreshInFlight = null;
      });
      const next = await refreshInFlight;
      if (next) {
        original.headers = { ...(original.headers ?? {}), Authorization: next };
        return AxiosClient(original);
      }
    }
    return Promise.reject(error);
  },
);
