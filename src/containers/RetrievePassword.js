/**
 * Created by Linwei on 2017/2/26.
 */
import React, {Component} from 'react';
import {NavBar, InputItem, List, Button} from 'antd-mobile';
export default class RetrievePassword extends Component {
    constructor(props) {
        super(props);
    }

    goBack(e) {
        this.props.router.goBack();
    }

    render() {
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    找回密码
                </NavBar>
                <div className="vertical-center-forgot forgot-page">
                    <List>
                        <InputItem
                            type="text"
                            placeholder="请输入账号"
                        >账号</InputItem>
                        <InputItem
                            type="email"
                            placeholder="邮箱"
                        >邮箱</InputItem>
                    </List>
                    <p className="forgot-note">*新密码将会通过自动生成发送至您的邮箱内,邮件发送成功后请及时进入邮箱内查收。</p>
                    <Button className="btn forgot-btn" type="primary">确认找回</Button>
                </div>
            </div>
        )
    }
}