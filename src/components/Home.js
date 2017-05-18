/**
 * Created by Linwei on 2017/5/18.
 */
import React,{Component} from 'react';
import {Tabs,WhiteSpace } from 'antd-mobile';
import MessageList from '../containers/MessageList'

export default class Home extends Component{
    constructor(props){
        super(props);


    }
    callback(key){
        console.log(key);
        document.querySelector(".publish").style.display = 'none';
        setTimeout(function(){
            document.querySelector(".publish").style.display = 'block';
        },400)
    }
    render(){
        const TabPane = Tabs.TabPane;
        return(
            <div className='transitionWrapper-Page'>
                <Tabs defaultActiveKey="1" onChange={this.callback} swipeable={false} >
                    <TabPane tab="律动世界" key="1">
                        <MessageList right="5%" game="rhythm"/>
                    </TabPane>
                    <TabPane tab="律动魔方" key="2">
                        <MessageList right="-95%" game="rhythmCube"/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}


