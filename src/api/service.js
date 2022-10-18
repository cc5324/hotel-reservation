// import router from "@/router/router";
import axios from "axios";

const hotelAPI = axios.create({
  // baseURL: "http://demo.soj.tw/api/client/profile",
  baseURL: "https://challenge.thef2e.com/api/thef2e2019/stage6",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});
// 設置請求(request)的攔截器
hotelAPI.interceptors.request.use(
  (config) => {
    let access_token =
      "igDFEuVBOrjEX2bsRi0SVxexMu3MAOjwH8trKUxnCfbO9Xz7JaVsKeElJbqg";
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 設置回應(response)的攔截器
hotelAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("here");
    console.log(`error`, error.response);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert("驗證已過期，請重新登入");
          console.log(error.message);
          break;
        case 404:
          alert("你要找的頁面不存在");
          break;
        case 500:
          alert("程式發生問題");
          console.log(error.message);
          break;
        default:
          alert("程式發生問題");
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert("網路出了點問題，請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);
//
export default {
  async GET(url, params) {
    // console.log("執行 get");
    try {
      const res = await hotelAPI.get(url, {
        params,
      });
      console.log(`res.data`, res.data);
      return res.data;
    } catch (res) {
      console.log("GET error", res);
      return Promise.reject(res.message);
    }
  },
  async DELETE(url, params) {
    try {
      const res = await hotelAPI.delete(url, {
        params,
      });
      return res.data;
    } catch (res) {
      return Promise.reject(res.message);
    }
  },
  async POST(...arge) {
    try {
      const res = await hotelAPI.post(...arge);
      return res.data;
    } catch (res) {
      // console.log("res", res);
      return Promise.reject(res.message);
    }
  },
  async PUT(...arge) {
    try {
      const res = await hotelAPI.put(...arge);
      return res.data;
    } catch (res) {
      return Promise.reject(res.message);
    }
  },
  async PATCH(...arge) {
    try {
      const res = await hotelAPI.patch(...arge);
      return res.data;
    } catch (res) {
      return Promise.reject(res.message);
    }
  },
};
