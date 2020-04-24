import Taro from "@tarojs/taro";
import { BASE_URL } from "@/config/index";
import qs from "qs";

/**
 * 请求成功处理
 * @param {*} data
 * @param {*} resolve
 */
interface Res {
  statusCode: number;
  data: any;
}
const checkSuccess = (res, resolve) => {
  const { statusCode, data }: Res = res;
  if (statusCode >= 200 && statusCode < 300) {
    Taro.hideNavigationBarLoading();
    return resolve(data);
  } else {
    throw new Error(`网络请求错误，状态码${statusCode}`);
  }
};


const throwError = (error, reject) => {
  Taro.hideNavigationBarLoading();
  if (typeof error === "object") {
    reject(error);
    throw new Error("请求失败:", error.errMsg);
  }
  throw error;
};

export default {
  request(options, method = "GET") {
    const { url } = options;
    return new Promise((resolve, reject) => {
      // 显示导航条加载动画
      Taro.showNavigationBarLoading();
      Taro.request({
        ...options,
        method: method,
        url: `${BASE_URL}${url}`,
        header: {
          "content-type": "application/json", //默认值
          ...options.header
        }
      })
        .then(res => {
          checkSuccess(res, resolve);
        })
        .catch(err => {
          throwError(err, reject);
        });
    });
  },
  get(options) {
    return this.request({
      ...options
    });
  },
  post(options) {
    return this.request(
      {
        ...options,
        data: qs.stringify(options.data)
      },
      "POST"
    );
  }
};
