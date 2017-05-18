/**
 * Created by Linwei on 2017/5/1.
 */
import React, {Component} from 'react';
import {Button,Card,List} from 'antd-mobile';
import {hashHistory} from 'react-router';
const Item = List.Item;
const Brief = Item.Brief;
export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: [
                {
                    id:1,
                    title:"触手大赛",
                    time:"2017.02.01-2017.02.28",
                    image:"../images/game/rhythm.jpg",
                    content:"触手大赛",
                    type:"律动世界",
                    award:[
                        {
                            title:"一等奖",
                            text:"奖金1000"
                        },
                        {
                            title:"二等奖",
                            text:"奖金100"
                        }
                    ]
                },
                {
                    id:2,
                    title:"美妙的旋律",
                    time:"2017.02.03-2017.02.14",
                    image:"https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png",
                    content:"美妙的旋律",
                    type:"律动魔方",
                    award:[
                        {
                            title:"一等奖",
                            text:"奖金1000"
                        },
                        {
                            title:"二等奖",
                            text:"奖金100"
                        }
                    ]
                }
            ]
        }

    }
    detail(e,index){
        console.log(index);
        var nextLocation = hashHistory.createLocation({
            pathname:'/activityDetails',
            state : index
        });
        hashHistory.push(nextLocation);
    }
    render() {
        let i = 0;
        const cardMap = (index) => {
            return (
                <List.Item
                    extra={<Button type="primary" size="small" inline onClick={e=>this.detail(e,index)}>详情</Button>}
                    multipleLine
                    thumb={index.image}
                    key={i++}
                >

                    {index.title}
                    <p className="list-type">类型:{index.type}</p>
                    <List.Item.Brief>{index.time}</List.Item.Brief>
                </List.Item>
            )
        };
        return (
            <List className="list-image">
                {this.state.activity.map(cardMap)}
            </List>
        )
    }
}
