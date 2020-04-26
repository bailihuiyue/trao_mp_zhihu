import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";
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
  state = {
    imgUrl:
      "https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

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

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: "首页"
  };

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

  takePhoto = () => {
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: "high",
      success: res => {
        this.setState({imgUrl:res.tempImagePath})
        // this.state.imgUrl = res.tempImagePath;
      }
    });
  };

  render() {
    const {
      counterStore: { counter }
    } = this.props;
    console.log(this.state.imgUrl);
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
        {/* <Button type='primary' bindtap={this.takePhoto}>拍照</Button> */}
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
