import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import "taro-ui/dist/style/index.scss";

import Index from "./pages/index";

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

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config: Config = {
    pages: [
      "pages/index/index",
      "pages/findMore/findMore",
      "pages/market/market",
      "pages/message/message",
      "pages/userCenter/userCenter",
      "pages/searchResult/searchResult",
      "pages/titleDetail/titleDetail",
      "pages/contentDetail/contentDetail"
    ],
    window: {
      backgroundColor: "#FFF",
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#FFF",
      navigationBarTitleText: "知乎",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    },
    tabBar: {
      backgroundColor: "#fff",
      color: "#999",
      selectedColor: "#1E8AE8",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "assets/images/home.png",
          selectedIconPath: "assets/images/home-light.png"
        },
        {
          pagePath: "pages/findMore/findMore",
          text: "想法",
          iconPath: "assets/images/find.png",
          selectedIconPath: "assets/images/find-light.png"
        },
        {
          pagePath: "pages/market/market",
          text: "市场",
          iconPath: "assets/images/market.png",
          selectedIconPath: "assets/images/market-light.png"
        },
        {
          pagePath: "pages/message/message",
          text: "消息",
          iconPath: "assets/images/msg.png",
          selectedIconPath: "assets/images/msg-light.png"
        },
        {
          pagePath: "pages/userCenter/userCenter",
          text: "我的",
          iconPath: "assets/images/me.png",
          selectedIconPath: "assets/images/me-light.png"
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
