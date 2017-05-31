/**
 * Created by john_ on 2017/5/18.
 */
import React,{Component} from 'react';
import {List,NavBar,Toast,InputItem } from 'antd-mobile';
import {URL} from '../actions/actions';
import {postFetch} from '../sources/ajax';
export default class PasswordUpdate extends Component{
  constructor(props){
    super(props)
    this.state={
      originalPwd:"",
      newPwd:"",
      confirmPwd:""
    }
  }
  goBack(e){
    this.props.router.goBack();
  }
  async passwordSave(e){
    let originalPwd = this.state.originalPwd;
    let newPwd = this.state.newPwd;
    let confirmPwd = this.state.confirmPwd;
    let userId = window.bbs.exdUser.userId;
    if(newPwd == confirmPwd && confirmPwd != '' && newPwd != '' && originalPwd != ''){
      var json = await postFetch(URL+'/passwordUpdate',{
        userId,
        originalPwd,
        newPwd,
        confirmPwd
      });
      if(json.success){
        Toast.success("密码修改成功");
        this.props.router.goBack();
      }
      else{
        Toast.fail(json.message);
      }
    }
    else{
      Toast.fail("修改密码不允许为空或密码不相等");
    }


  }
  render(){
    return(
      <div className="transitionWrapper-Page">
        <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}
                rightContent={[
                  <span onClick={e=>this.passwordSave(e)}>保存</span>
                ]}
        >
          修改密码
        </NavBar>
        <List>
          '<InputItem
          type="password"
          placeholder="输入原密码"
          onChange={val=>{this.state.originalPwd=val}}
        >原密码</InputItem>
          <InputItem
            type="password"
            placeholder="输新密码"
            onChange={val=>{this.state.newPwd=val}}
          >新密码</InputItem>
          <InputItem
            type="password"
            placeholder="确认确认密码"
            onChange={val=>{this.state.confirmPwd=val}}

          >确认密码</InputItem>
        </List>
      </div>
    )
  }
}
