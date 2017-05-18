/**
 * Created by Linwei on 2017/5/10.
 */
import React, {Component} from 'react';
import {NavBar, Card} from 'antd-mobile';
import PersonalTalkList from './PersonalTalkList'
export default class CharacterCard extends Component {
  constructor(props) {
    super(props);
    let personal = this.props.location.state;
    let sex = '';
    if (personal.sex) {
      sex = '../images/personal/male.png';
    }
    else {
      sex = '../images/personal/female.png';
    }
    this.state = {
      personal: {
        avatar: personal.avatar,
        name: personal.author,
        sex: sex,
        tag: personal.signature,
        currency: 0
      }
    }

  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    return (
      <div className="transitionWrapper-Page">
        <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
          个人卡片
        </NavBar>
        <Card>
          <Card.Body>
            <div className="ch-card-img">
              <img src={this.state.personal.avatar} className="images avatar"/>
            </div>
            <div className="ch-card-pane">
              <span className="ch-card-name">{this.state.personal.name}</span>
              <span className="ch-card-sex"><img className="card-sex" src={this.state.personal.sex}/></span>
            </div>
            <div className="card-tag">{this.state.personal.tag}</div>
          </Card.Body>
        </Card>
        <div className="game-tag">
          <p className="tag-title">
            我的游戏:
          </p>
          <div className="tag-badge">
            <img src={require("../images/game/rhythm.jpg")} alt="" className="tag-badge-icon"/>


          </div>
        </div>
        <div className="person-content">
          <p className="tag-title">我的说说:</p>
          <div className="person-content-list">
            <PersonalTalkList
              height="1.75"
              type="complain"
              personal = {this.props.location.state}
            />
          </div>
        </div>
      </div>
    );
  }
}
CharacterCard.propTypes = {}
