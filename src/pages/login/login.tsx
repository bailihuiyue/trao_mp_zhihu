import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Button, Picker } from '@tarojs/components';
import { AtInput, AtButton, AtToast } from 'taro-ui';
import './index.scss';

class Index extends PureComponent {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    selector: ['美国', '中国', '巴西', '日本'],
    selectorCheckedId: 0,
    userName: "",
    password: ""
  }

  handleChangeUserName = userName => {
    this.setState({ userName })
  }

  handleChangePassword = password => {
    this.setState({ password })
  }

  handleChangeJob = e => {
    const selectorCheckedId = e.currentTarget.value
    this.setState({ selectorCheckedId })
  }

  onSubmit = () => {
    const { selectorCheckedId, userName, password } = this.state;
    if (!userName || !password) {
      Taro.showToast({
        title: '请输入用户名或密码',
        icon: 'none',
        duration: 1000
      })
    }
    console.log(selectorCheckedId, userName, password)
  }

  handleRegist = () => {
    Taro.navigateTo({
      url: '../../pages/regist/regist'
    })
  }

  handleFindPwd = () => {
    Taro.navigateTo({
      url: "../../pages/findPassword/findPassword"
    })
  }

  render() {
    const { selectorCheckedId, selector } = this.state;
    return (
      <View className="wrapper">
        <Text></Text>
        <View className="container">
          <View className="title">欢迎使用本系统</View>
          <AtInput
            name='value'
            type='text'
            placeholder='姓名'
            value={this.state.userName}
            onChange={this.handleChangeUserName}
          />
          <AtInput
            name='value'
            type='password'
            placeholder='密码'
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <View className='page-section'>
            <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.handleChangeJob}>
                <View className='picker'>
                  <View className="left">选择职务：</View>
                  <View className="right">
                    {selector[selectorCheckedId]}
                  </View>
                </View>
              </Picker>
            </View>
          </View>
          <AtButton formType='submit' type="primary" onClick={this.onSubmit}>登录</AtButton>
          <View className="footer">
            <Text className="floatL" onClick={this.handleRegist}>手机号注册</Text>
            <Text className="floatR" onClick={this.handleFindPwd}>找回密码</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;