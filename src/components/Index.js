/**
 * Created by Linwei on 2017/5/17.
 */
import React, {Component} from 'react';
import {NavBar, TabBar, List, Button} from 'antd-mobile';
import Home from './Home';
import PersonCenter from  '../containers/PersonalCenter';
import Activity from '../containers/Activity';
import Recommend from '../containers/Recommend';
export default class Index extends Component{
    constructor(props){
        super(props);
        if(!window.tab){
          window.tab= 'redTab';
        }
        this.state = {
            selectedTab: window.tab,
            hidden: false
        }
    }
    render(){
        return(
            <div className="transitionWrapper-Page">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        icon={{ uri: require('../images/icon/home.png') }}
                        selectedIcon={{ uri: require('../images/icon/home_active.png') }}
                        title="首页"
                        key="首页"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            window.tab = 'redTab';
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                    >
                        <Home/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri:  require('../images/icon/notice.png') }}
                        selectedIcon={{ uri: require('../images/icon/notice_active.png') }}
                        title="活动"
                        key="活动"
                        selected={this.state.selectedTab === 'whiteTab'}
                        onPress={() => {
                            window.tab = 'whiteTab';
                            this.setState({
                                selectedTab: 'whiteTab',
                            });
                        }}
                    >
                        <Activity/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: require('../images/icon/collect.png') }}
                        selectedIcon={{ uri: require('../images/icon/collect_active.png') }}
                        title="推荐"
                        key="推荐"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                          window.tab = 'greenTab';
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        <Recommend/>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                          console.log(window.tab);
                          window.tab = 'blueTab';
                          this.setState({
                            selectedTab: 'blueTab',
                          });
                        }}
                    >
                        <PersonCenter/>
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}
