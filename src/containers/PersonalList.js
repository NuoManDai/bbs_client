/**
 * Created by Linwei on 2017/5/13.
 */
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import PersonalTalkList from './PersonalTalkList'
export default class PersonalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          author:window.bbs.exdUser.userId,
          avatar:window.bbs.exdUser.avatar
        }
    }
    goBack(e){
        this.props.router.goBack();
    }
    render() {
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    我的说说
                </NavBar>
                <PersonalTalkList
                  height="1"
                  type=" "
                  personal = {this.state}
                />
            </div>
        );
    }
}
PersonalList.propTypes = {}
