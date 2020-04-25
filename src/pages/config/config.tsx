import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Button, Picker } from '@tarojs/components';
import { AtInput, AtButton, AtToast } from 'taro-ui';
import './index.scss';

class Index extends PureComponent {
  state = {
    configs: [
      { name: "wuliu", val: "物流" },
      { name: "kaizhi", val: "开支" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
      { name: "cheliangguanli", val: "车辆管理" },
    ]
  }
  config = {
    navigationBarTitleText: ''
  }

  handleFlow = key => {
    Taro.navigateTo({
      url: "../../pages/table/table?type=" + key
    })
  }

  handleAddFlow = () => {

  }

  render() {
    const { configs } = this.state;
    return (
      <View className="wrapper">
        <View className="container">
          <View className="title">设置界面</View>
          {
            configs.map(data => {
              const { name, val } = data;
              return <AtButton type="secondary" className="btn" key={val} onClick={this.handleFlow.bind(this, name)}>{val}</AtButton>
            })
          }
          {/* <AtButton type="secondary" className="btn" onClick={this.handleAddFlow}>+</AtButton> */}
        </View>
      </View>
    );
  }
}
export default Index;