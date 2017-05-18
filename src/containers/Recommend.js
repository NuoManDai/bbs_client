/**
 * Created by Linwei on 2017/3/6.
 */
import React, {Component} from 'react';
import {Carousel,Badge,List,Button} from 'antd-mobile';
import {hashHistory} from 'react-router'
export default class Recommend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommend: [
                {
                    id:1,
                    title:"律动世界",
                    avatar:"../images/game/rhythm.jpg",
                    content:"《律动世界》是国内音游爱好者利用自研引擎YHMEngine开发的独立游戏，是一款支持多人在线对战的社交型音乐游戏，上线于2014年夏，曾位列Windows Store最受欢迎的游戏软件Top10，多次被微软应用商店推荐。《律动世界》中集成了单人游戏、多人竞技、管理曲图、游戏商店等多项功能，支持利用律动编辑器（Rhythm Editor）制作的.yhm曲图文件进行游戏。目前《律动世界》中拥有3种下落式的轨道模式，并且支持曲图文件的背景视频的播放，所有曲图文件均为玩家爱好者中有经验的谱师进行人工打谱，并且需经过曲谱质量认证后（仅.yhm文件）才可进行传播。现已发布WindowsPhone8.1/10版本以及Windows8.1/10的应用商店版本。",
                    imageList:[

                    ],
                    badge:["Hot","New"],
                    exp:1000,
                    link:"http://exdstudio.net/show/index.html"
                },
                {
                    id:2,
                    title:"律动魔方",
                    avatar:"../images/game/timg.jpg",
                    content:"《律动世界》是国内音游爱好者利用自研引擎YHMEngine开发的独立游戏，是一款支持多人在线对战的社交型音乐游戏，上线于2014年夏，曾位列Windows Store最受欢迎的游戏软件Top10，多次被微软应用商店推荐。《律动世界》中集成了单人游戏、多人竞技、管理曲图、游戏商店等多项功能，支持利用律动编辑器（Rhythm Editor）制作的.yhm曲图文件进行游戏。目前《律动世界》中拥有3种下落式的轨道模式，并且支持曲图文件的背景视频的播放，所有曲图文件均为玩家爱好者中有经验的谱师进行人工打谱，并且需经过曲谱质量认证后（仅.yhm文件）才可进行传播。现已发布WindowsPhone8.1/10版本以及Windows8.1/10的应用商店版本。",
                    imageList:[

                    ],
                    badge:["Hot","New"],
                    exp:0,
                    link:"http://cube.exdstudio.net/show/index.html"
                }

            ]
        }

    }
    expCount(exp){
        if(exp>0){
            exp = exp/100;
            return "等级:"+exp;
        }
        else{
            return "未开始游戏";
        }
    }
    onDetails(e,index){
        var nextLocation = hashHistory.createLocation({
            pathname:'/recommendDetails',
            state: index
        });
        hashHistory.push(nextLocation);
    }

    render() {
        const listMap = (index)=>{
            return(
                <List.Item
                    extra={<Button type="primary" size="small" inline onClick={e=>this.onDetails(e,index)}>详情</Button>}
                    multipleLine
                    thumb={index.avatar}
                    key={index.id}
                >

                    {index.title}
                    <p className="list-type">{index.badge.map(badgeMap)}</p>
                    <List.Item.Brief className="recommend-level">{this.expCount(index.exp)}</List.Item.Brief>
                </List.Item>
            )
        };
        let i=0
        const badgeMap = (index)=>{
            return(
                <Badge text={index} style={{ marginRight: 12 }} key={i++} />
            )
        };
        return (
            <div>
                <Carousel className="my-carousel" autoplay infinite>
                    <div className="v-item"><img src={require("../images/carousel/carousel_1.jpg")} className="images"/> </div>
                    <div className="v-item"><img src={require("../images/carousel/carousel_2.jpg")} className="images"/></div>
                    <div className="v-item"><img src={require("../images/carousel/carousel_3.jpg")} className="images"/></div>
                </Carousel>

                <List className="recommend-image">
                    {this.state.recommend.map(listMap)}
                </List>
            </div>
        );
    }
}
Recommend.propTypes = {};
