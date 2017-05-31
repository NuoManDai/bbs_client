/**
 * Created by john_ on 2017/5/11.
 */
import React,{Component} from 'react';
import {List,NavBar,Toast,InputItem } from 'antd-mobile';
import {URL} from '../actions/actions';
import {postFetch} from '../sources/ajax';
import {dateFormat} from '../sources/dateFormat';
let Item = List.Item;
export default class Settings extends Component{
    constructor(props){
        super(props);
        let exdUser = window.bbs.exdUser;
        let bbsUser = window.bbs.bbsUser;
        this.state = {
            userId : exdUser.userId,
            avatar : exdUser.avatar,
            phoneNumber:exdUser.phoneNumber,
            sex : exdUser.sex,
            exp : bbsUser.exp,
            currency : bbsUser.currency,
            signature:bbsUser.signature,
            birthDay:exdUser.birthDay
        }
    }
    goBack(e){
        this.props.router.goBack();
    }

    render(){
        return(
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                  我的设置
                </NavBar>
                <List>
                    <Item
                        extra={<img src={this.state.avatar} style={{'width':"100px",'height':'100px'}}/>}

                        onClick={() => {}}
                    >
                    </Item>
                    <Item
                        extra={this.state.userId}
                        arrow="horizontal"
                        platform="android"
                    >
                        账号
                    </Item>
                    <Item
                        extra={this.state.sex}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        性别
                    </Item>
                    <Item
                        extra={this.state.phoneNumber}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        电话号码
                    </Item>
                    <Item
                        extra={dateFormat(this.state.birthDay)}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        生日
                    </Item>

                    <Item
                        extra={this.state.exp}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        论坛等级
                    </Item>
                    <Item
                        extra={this.state.currency}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        货币
                    </Item>
                    <Item
                        extra={this.state.signature}
                        arrow="horizontal"
                        onClick={() => {}}
                        platform="android"
                    >
                        个人签名
                    </Item>
                </List>
            </div>
        )
    }
}
