import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import "taro-ui/dist/style/index.scss";

import Login from "./pages/login";

import counterStore from "./store/counter";
import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
};

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config: Config = {
    pages: [
      "pages/demo/demo",
      "pages/config/config",
      "pages/admin/admin",
      "pages/forgetPassword/forgetPassword",
      "pages/regist/regist",
      "pages/login/login",
      "pages/table/table",
    ],
    window: {
      backgroundColor: "#FFF",
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#FFF",
      navigationBarTitleText: "电子记事本",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
