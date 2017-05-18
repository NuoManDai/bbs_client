/**
 * Created by Linwei on 2017/5/12.
 */
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
export default class ActivityDetails extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
    }
    goBack(){
        this.props.router.goBack();
    }
    activitySubmit(e){

    }
    render() {
        const list = (index)=>{
            return(
                <p className="activity-content">
                    <span>{index.title}</span>
                    <span>{index.text}</span>
                </p>
            )
        };
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    活动
                </NavBar>
                <div className="activity-cover">
                    <img src={require('../images/game/head_bg.jpg')} className="images"/>
                </div>
                <div className="activity-container">
                    <p className="activity-head">{this.props.location.state.title}</p>
                    <p className="activity-title">游戏名称 :  {this.props.location.state.type}</p>
                    <p className="activity-title">活动时间 :  {this.props.location.state.time}</p>
                    <p className="activity-title">活动规则 :</p>
                    <p className="activity-content">{this.props.location.state.content}</p>
                    <p className="activity-title">活动奖励 :</p>
                    <div>
                        {this.props.location.state.award.map(list)}
                    </div>
                </div>
                <div className="activity-btn" onClick={e=>this.activitySubmit(e)}>
                    我要报名
                </div>
            </div>
        );
    }
}
ActivityDetails.propTypes = {};
