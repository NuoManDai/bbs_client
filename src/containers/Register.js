/**
 * Created by Linwei on 2017/2/26.
 */
import React, {Component} from 'react';
import {NavBar, Button, List, InputItem, Picker, DatePicker, WingBlank,Toast} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {URL} from '../actions/actions';
import {postFetch} from '../sources/ajax';


export default class Register extends Component {
  constructor(props) {
    super(props);
    const zhNow = moment().locale('zh-cn').utcOffset(8);
    const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
    const minDate = moment('1960-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
    const defaultDate = zhNow;
    const seasons = [
      {
        label: "男",
        value: "男"
      },
      {
        label: "女",
        value: "女"
      }
    ];
    const defaultValue = [seasons[0].value];
    this.state = {
      sexPicker: {
        defaultValue: defaultValue,
        seasons: seasons
      },
      dataPicker: {
        zhNow: zhNow,
        maxDate: maxDate,
        minDate: minDate
      },
      form:{
        username : '',
        password:'',
        confirmPsw:'',
        email:'',
        phone:'',
      }
    };

  }

  goBack(e) {
    this.props.router.goBack();
  }

  sexOnChange(val) {
    this.state.sexPicker.defaultValue = val;
    this.setState({...this.state});
  }

  dateOnChange(value) {
    this.state.dataPicker.zhNow = moment(value).utcOffset(8);
    this.setState({...this.state});
  }

  async register(e) {
    let state = this.state;
    let form = state.form;
    let date = moment(state.dataPicker.zhNow).format('L');
    let username = form.username;
    let password = form.password;
    let confirmPsw = form.confirmPsw;
    let email = form.email;
    let sex = state.sexPicker.defaultValue[0];
    let phoneNumber = form.phone;
    let json = await postFetch(URL+'/register',{
      username,
      password,
      confirmPsw,
      email,
      sex,
      date,
      phoneNumber
    });
    if(json.success){
      Toast.success('注册账号成功!');
      this.props.router.push('/');
    }
    else{
      Toast.fail(json.message);
    }
  }

  render() {
    let form = this.state.form;
    return (
      <div className="transitionWrapper-Page bg-page">
        <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
          新用户注册
        </NavBar>
        <div className="register-content">
          <List>
            <InputItem
              type="text"
              placeholder="输入用户名"
              onChange={val=>{form.username=val}}
            >用户名</InputItem>
            <InputItem
              type="password"
              placeholder="输入密码"
              onChange={val=>{form.password=val}}
            >密码</InputItem>
            <InputItem
              type="password"
              placeholder="确认确认密码"
              onChange={val=>{form.confirmPsw=val}}
            >确认密码</InputItem>
            <InputItem
              type="email"
              placeholder="输入邮箱"
              onChange={val=>{form.email=val}}
            >邮箱</InputItem>
            <InputItem
              type="phone"
              placeholder="输入电话"
              onChange={val=>{form.phone = val}}
            >电话号码</InputItem>
            <Picker
              data={this.state.sexPicker.seasons}
              value={this.state.sexPicker.defaultValue}
              title="性别"
              cols={1}
              onChange={val => this.sexOnChange(val)}

            >
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <DatePicker
              mode="date"
              title="选择日期"
              value={this.state.dataPicker.zhNow}
              minDate={this.state.dataPicker.minDate}
              onChange={value => this.dateOnChange(value)}
            >
              <List.Item arrow="horizontal">日期</List.Item>
            </DatePicker>

          </List>
          <WingBlank size="lg">
            <Button className="btn register-btn" type="primary" onClick={e => this.register(e)}>
              确认注册
            </Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}
