import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton } from "taro-ui";

import "./index.scss";

type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
};

interface Index {
  props: PageStateProps;
}

@inject("counterStore")
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }

  config: Config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
    console.log(
      Taro.getUserInfo({
        success: function(res) {
          console.log(res);
        }
      })
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };

  getUserInfo = e => {
    console.log(e);
    console.log("**************");
  };

  takePhoto() {
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: "high",
      success: res => {
        console.log(res);
        this.imgUrl = res;
      }
    });
  }

  render() {
    const {
      counterStore: { counter }
    } = this.props;
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo}>
          微信授权
        </Button>
        <Camera
          device-position="back"
          flash="off"
          binderror="error"
          style="width: 100%; height: 300px;"
        />
        {/* <Button type="primary" bindtap={this.takePhoto}>拍照</Button> */}
        <Button onClick={this.takePhoto}>拍照</Button>
        <Image
          style="width: 300px;height: 100px;background: #fff;"
          src={this.state.imgUrl}
        />
      </View>
    );
  }
}

export default Index as ComponentType;
