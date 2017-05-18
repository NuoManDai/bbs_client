require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {List, InputItem, Button, WhiteSpace, WingBlank,Toast} from 'antd-mobile';
import {History} from 'react-router';
import {createForm} from 'rc-form';
import {postFetch} from '../sources/ajax';
import {URL} from '../actions/actions';
class AppComponent extends React.Component {
    constructor(props){
        super(props);
    }
    linkRegister(e){
        this.props.router.push('/register');
    }
    linkPassword(e){
        this.props.router.push('/forgot');
    }
    async linkLogin(e){
        let username = this.refs.username.props.value;
        let password = this.refs.password.props.value;
        let json = await postFetch(URL+'/login',{
          username,
          password
        });
        if(json.success){
          window.bbs = {
            exdUser:json.message.user[0],
            bbsUser:json.message.user[1]
          };
          Toast.success("登陆成功");
          this.props.router.push('/index');
        }
        else{
          Toast.fail(json.message);
        }
    }
    render() {
        const {getFieldProps } = this.props.form;
        return (
            <div className="transitionWrapper-Page">
                <div className="vertical-center">
                    <div className="login-input">
                        <WingBlank size="lg">修改
                            <List>
                                <InputItem
                                    type="text"
                                    clear
                                    {...getFieldProps('inputclear')}
                                    placeholder="账号输入"
                                    ref="username"
                                >账号</InputItem>
                                <InputItem
                                    type="password"
                                    clear
                                    {...getFieldProps('clear')}
                                    placeholder="密码输入"
                                    ref="password"
                                >密码</InputItem>
                            </List>
                            <Button className="btn login" type="primary" onClick={e=> this.linkLogin(e)}>
                                登陆
                            </Button>
                        </WingBlank>
                    </div>
                    <div className="login-warp">
                        <Button className="btn" type="ghost" onClick={e => this.linkRegister(e)}>
                            注册
                        </Button>
                        <WhiteSpace size="lg"/>
                        <Button className="btn" type="ghost" onClick={e => this.linkPassword(e)}>
                            找回密码
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

AppComponent.defaultProps = {};

const BasicInputExampleWrapper = createForm()(AppComponent);

export default BasicInputExampleWrapper;
