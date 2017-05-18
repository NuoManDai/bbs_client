/**
 * Created by Linwei on 2017/2/28.
 */
import React, {Component} from 'react';
import {Grid, Card} from 'antd-mobile';
import {hashHistory} from 'react-router';

const gridData = [

    {
        url: '/personalList',
        icon: require('../images/personal/friend.png'),
        text: '我的好友'
    },
    {
        url: '/personalList',
        icon: require('../images/personal/message.png'),
        text: '我的说说'
    },
    {
        url: '/personalComment',
        icon: require('../images/personal/comments.png'),
        text: '我的评论'
    },
    {
        url: '/select/comment',
        icon: require('../images/personal/sysMessage.png'),
        text: '系统消息'
    },
    {
        url: '/select/comment',
        icon: require('../images/personal/activity.png'),
        text: '我的活动'
    },

    {
        url: '/select/comment',
        icon: require('../images/personal/set.png'),
        text: '我的设置'
    },
    {
        url: '/passwordUpdate',
        icon: require('../images/personal/help.png'),
        text: '修改密码'
    },
    {
        url: '/',
        icon: require('../images/personal/pull_right.png'),
        text: '退出登陆'
    }
];


export default class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        let personal = window.bbs;
        let sex = '';
        if(personal.exdUser.sex){
          sex = '../images/personal/male.png';
        }
        else{
         sex = '../images/personal/female.png';
        }
        this.state = {
            personal: {
                avatar: personal.exdUser.avatar,
                name: personal.exdUser.userId,
                sex: sex,
                tag:personal.bbsUser.signature,
                money:personal.bbsUser.currency
            }
        }
    }

    gridClick(_el, index) {
        hashHistory.push(gridData[index].url)
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <div className="card-img">
                            <img src={this.state.personal.avatar} className="images avatar"/>
                        </div>
                        <div className="card-pane">
                            <span className="card-name">{this.state.personal.name}</span>
                            <span className="card-sex"><img className="card-sex" src={this.state.personal.sex}/></span>
                        </div>
                        <div className="card-tag">{this.state.personal.tag}</div>
                    </Card.Body>
                </Card>
                <Grid data={gridData} onClick={(_el, index) => {
                    this.gridClick(_el, index)
                }}/>
            </div>
        )
    }
}
