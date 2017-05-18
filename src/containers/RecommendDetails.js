/**
 * Created by Linwei on 2017/3/12.
 */
import React, {Component} from 'react';
import {NavBar, Badge} from 'antd-mobile';
export default class RecommendDetails extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);

    }

    goBack(e) {
        this.props.router.goBack();
    }
    downLoad(e){
        window.location.href=this.props.location.state.link;
    }
    render() {
        let i = 0;
        const badgeList = (index) => {
            return (
                <Badge text={index} style={{marginRight: 12}} key={i++}/>
            )
        };
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    推荐游戏
                </NavBar>
                <div className="recommend-header">
                    <img src={require("../images/game/head_bg.jpg")} className="images"/>

                </div>
                <div className="recommend-icon">
                    <div className="recommend-center">
                        <div className="recommend-avatar">
                            <img src={this.props.location.state.avatar} className="images"/>
                        </div>
                        <div className="recommend-badge">
                            <p>{this.props.location.state.title}</p>
                            <p>{this.props.location.state.badge.map(badgeList)}</p>
                        </div>
                    </div>
                </div>
                <p className="recommend-title">游戏介绍 :</p>
                <div className="recommend-img">
                    <img src={require("../images/avatar.jpg")} className="images"/>
                    <img src={require("../images/avatar.jpg")} className="images"/>
                    <img src={require("../images/avatar.jpg")} className="images"/>
                </div>
                <div className="recommend-text">
                    {this.props.location.state.content}
                </div>
                <div className="activity-btn" onClick={e=>this.downLoad(e)}>
                    点击下载
                </div>
            </div>
        );
    }
};
RecommendDetails.propTypes = {};
