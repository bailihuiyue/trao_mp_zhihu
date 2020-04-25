import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Button, Picker } from '@tarojs/components';
import { AtInput, AtButton, AtToast } from 'taro-ui';
import './index.scss';

class Index extends PureComponent {

  config = {
    navigationBarTitleText: ''
  }

  state = {

  }

  handleJob = () => {
    Taro.navigateTo({
      url: "../../pages/table/table?type=job"
    })
  }


  handleSetting = () => {
    Taro.navigateTo({
      url: "../../pages/config/config"
    })
  }

  handleFlow = () => {
    Taro.navigateTo({
      url: "../../pages/table/table?type=flow"
    })
  }

  render() {
    const { } = this.state;
    return (
      <View className="wrapper">
        <View className="container">
          <View className="title">管理界面</View>
          <AtButton type="secondary" className="btn" onClick={this.handleJob}>职务</AtButton>
          <AtButton type="secondary" className="btn" onClick={this.handleSetting}>设置</AtButton>
          <AtButton type="secondary" className="btn" onClick={this.handleFlow}>流程</AtButton>
        </View>
      </View>
    );
  }
}
export default Index;