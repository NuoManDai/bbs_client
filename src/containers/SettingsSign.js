/**
 * Created by john_ on 2017/5/11.
 */
import React,{Component} from 'react';
import {List,NavBar,Toast,InputItem } from 'antd-mobile';
import {URL} from '../actions/actions';
import {postFetch} from '../sources/ajax';
import {dateFormat} from '../sources/dateFormat';
let Item = List.Item;
export default class SettingsSign extends Component{
    constructor(props){
        super(props);
        let exdUser = window.bbs.exdUser;
        let bbsUser = window.bbs.bbsUser;
        this.state = {
            signature:bbsUser.signature
        }
    }
    goBack(e){
        this.props.router.goBack();
    }

    render(){
        return(
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    个性签名
                </NavBar>
                <List>
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '计数功能,我的意见是...',
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
            </div>
        )
    }
}