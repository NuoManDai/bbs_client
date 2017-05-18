/**
 * Created by john_ on 2017/5/18.
 */
import React,{Component} from 'react';
import {Button,Flex } from 'antd-mobile';

export default class MainPage extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="transitionWrapper-Page">
        <Button className="btn" type="primary">primary 按钮</Button>
        <Button className="btn" disabled onClick={e => console.log(e)}>disabled 按钮</Button>
        <Button className="btn" loading>loading 按钮</Button>
        <Button className="btn" icon="check-circle-o">带图标按钮</Button>
      </div>
    )
  }
}
