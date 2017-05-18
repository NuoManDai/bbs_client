/**
 * Created by Linwei on 2017/5/6.
 */
import React, {Component} from 'react';
import {RefreshControl, ListView, Icon, Modal, Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';
import {getFetch} from '../sources/ajax';
import {URL} from '../actions/actions';
import {dateFormat} from '../sources/dateFormat';

let fetchData = [];
let getData = async (component) => {
  let json = await getFetch(URL + '/talkSelect', {
    game: "rhythm"
  });
  if (json.success) {
    var message = json.message;
    fetchData = [];
    for (var i = 0; i < message.length; i++) {
      fetchData.push(
        {
          id: message[i].talk.id,
          author: message[i].exdUser.userId,
          avatar: message[i].exdUser.avatar,
          time: dateFormat(message[i].talk.time),
          content: message[i].talk.content,
          imgList: message[i].images,
          signature: message[i].bbsUser.signature,
          currency: message[i].bbsUser.currency,
          sex: message[i].exdUser.sex,
          like: 100
        }
      );
    }
    component.setState({
      dataSource: component.state.dataSource.cloneWithRows(fetchData),
      refreshing: false,
    });
  }
  else {
    Toast.fail('数据捕获失败');
  }
};

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(fetchData),
      refreshing: true,
      visible: false
    };
    getData(this);
  }

  onRefresh = async () => {
    this.setState({refreshing: true});
    getData(this);
  };
  onScroll = async () => {
    // let json = await getFetch(URL+'/talkSelect',{
    //   game:"rhythm"
    // });
    // console.log(json);
  };

  showModal = (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  likeClick(e) {

  }

  contentClick(e, obj) {
    console.log(e);
    let nextLocation = hashHistory.createLocation({
      pathname: '/messageContent',
      state: obj
    });
    hashHistory.push(nextLocation);
  }

  showPersonCard(e, obj) {
    let nextLocation = hashHistory.createLocation({
      pathname: '/characterCard',
      state: obj
    });
    hashHistory.push(nextLocation);
  }

  addClick(e) {
    hashHistory.push('/messagePublish');
  }

  render() {
    let image = 0;
    const imageList = (index) => {
      return (
        <img key={image++} src={index} className="images"/>
      )
    }
    const separator = (sectionID, rowID) => {
      return <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    };
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;
      //console.log(obj);
      return (
        <div key={rowID}
             style={{
               padding: '0.08rem 0.16rem',
               backgroundColor: 'white',
             }}
        >
          <div className="list-content-personal">
            <div className="list-content-avatar" onClick={e => this.showPersonCard(e, obj)}>
              <img src={obj.avatar} className="images"/>
            </div>
            <div className="list-content-personal-message">
              <p className="list-content-author">{obj.author}</p>
              <p className="list-content-time">{obj.time}</p>
            </div>
          </div>
          <div className="list-content-content" onClick={e => this.contentClick(e, obj)}>
            {obj.content}
          </div>
          <div className="list-content-image">
            {typeof obj.imgList == 'undefined' ? " " : obj.imgList.map(imageList)}
          </div>
          <div className="list-content-btn">
            <div className="border-right"><Icon size="sm"
                                                type={require('!svg-sprite!../images/svg/good.svg')}/><span>赞</span>
            </div>
            <div className="border-right" onClick={e => this.contentClick(e, obj)}><Icon
              type={require('!svg-sprite!../images/svg/comments.svg')}/><span>评论</span></div>
            <div onClick={e => {
              this.showModal(e)
            }}><Icon type={require('!svg-sprite!../images/svg/warning.svg')}/><span>投诉</span></div>

          </div>
        </div>
      );
    };
    return (
      <div>
        <ListView dataSource={this.state.dataSource}
                  renderRow={row}
                  renderSeparator={separator}
                  initialListSize={5}
                  pageSize={5}
                  scrollRenderAheadDistance={200}
                  scrollEventThrottle={20}
                  onScroll={this.onScroll}
                  style={{
                    height: document.documentElement.clientHeight,
                    border: '1px solid #ddd',
                    color: 'black'
                  }}

                  scrollerOptions={{scrollbars: true}}
                  refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />}
        />
        <Modal
          title="投诉"
          transparent
          maskClosable={false}
          visible={this.state.visible}
          onClose={this.onClose}
          footer={[{
            text: '确定', onPress: () => {
              console.log('ok');
              this.onClose();
            }
          }, {
            text: '取消', onPress: () => {
              console.log('ok');
              this.onClose();
            }
          }]}
        >
          <p className="complain">
            <label><input type="radio" name="complain"/>该信息含有不健康内容</label>
          </p>
          <p className="complain">
            <label><input type="radio" name="complain"/>该信息含人生攻击诋毁</label>
          </p>
          <p className="complain">
            <label><input type="radio" name="complain"/>信息不符国家有关规定</label>
          </p>

        </Modal>
        <div className="publish" onClick={e => this.addClick(e)} style={{right: this.props.right}}></div>
      </div>
    );
  }
}
MessageList.propTypes = {};
