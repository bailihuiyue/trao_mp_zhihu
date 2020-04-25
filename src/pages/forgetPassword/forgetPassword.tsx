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
    // password: "",
    code: null,
    disableBtn: false,
    codeTxt: "获取验证码"
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

  handleChangeCode = code => {
    this.setState({ code })
  }

  onSubmit = () => {
    const { selectorCheckedId, userName, code } = this.state;
    if (!userName) {
      Taro.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!code) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    console.log(selectorCheckedId, userName, code);
  }

  sendCode = () => {
    this.countDown();
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

  countDown() {
    this.setState({ disableBtn: true, codeTxt: 5 });
    let time = setInterval(() => {
      const { codeTxt } = this.state;
      if (codeTxt === 1) {
        this.setState({ disableBtn: false, codeTxt: "获取验证码" });
        clearInterval(time);
      } else {
        this.setState({ disableBtn: true, codeTxt: (codeTxt - 1) });
      }
    }, 1000);
  }

  render() {
    const { selectorCheckedId, selector, disableBtn, codeTxt } = this.state;
    return (
      <View className="wrapper">
        <Text></Text>
        <View className="container">
          <View className="title">找回密码</View>
          <AtInput
            name='value'
            type='text'
            placeholder='姓名'
            value={this.state.userName}
            onChange={this.handleChangeUserName}
          />
          {/* <AtInput
            name='value'
            type='password'
            placeholder='密码'
            value={this.state.password}
            onChange={this.handleChangePassword}
          /> */}
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
          <View className="phoneCode">
            <View className="phoneCodeIpt">
              <AtInput
                name='value'
                type='number'
                placeholder='验证码'
                value={this.state.code}
                onChange={this.handleChangeCode}
              />
            </View>
            <View className="phoneCodeBtn">
              <AtButton type="secondary" disabled={disableBtn} onClick={this.sendCode}>{codeTxt}</AtButton>
            </View>
          </View>
          <AtButton formType='submit' type="primary" onClick={this.onSubmit}>找回密码</AtButton>
        </View>
      </View>
    );
  }
}
export default Index;