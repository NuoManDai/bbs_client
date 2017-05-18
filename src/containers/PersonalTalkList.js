/**
 * Created by Linwei on 2017/5/11.
 */
import React, {Component} from 'react';
import {RefreshControl, ListView, Icon, Toast} from 'antd-mobile'
import {hashHistory} from 'react-router';
import {postFetch} from '../sources/ajax';
import {URL} from '../actions/actions';
import {dateFormat} from '../sources/dateFormat';
let fetchData = [];
let getData = async (component) => {
  let json = await postFetch(URL + '/talkPerson', {
    userId: component.props.personal.author
  });

  if (json.success) {
    var message = json.message;
    fetchData = [];
    for (var i = 0; i < message.length; i++) {
      fetchData.push(
        {
          avatar: component.props.personal.avatar,
          author: component.props.personal.author,
          id: message[i].talk.id,
          time: dateFormat(message[i].talk.time),
          content: message[i].talk.content,
          imgList: message[i].images,
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

export default class PersonalTalkList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    getData(this);
    this.state = {
      dataSource: dataSource.cloneWithRows(fetchData),
      refreshing: true,
      visible: false
    };
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    getData(this);
  };
  onScroll = () => {
    console.log('sss');
  };

  async talkDelete(e, id) {
    let talkId = id;
    let json = await postFetch(URL + '/talkDelete', {
      talkId
    });
    if (json.success) {
      getData(this);
      Toast.success("删除成功");
    }
    else {
      Toast.success("删除失败");
    }
  }

  showPersonCard(e) {
    let nextLocation = hashHistory.createLocation({
      pathname: '/characterCard',
      state: this.props.personal
    });
    hashHistory.push(nextLocation);
  }

  contentClick(e, obj) {

    let nextLocation = hashHistory.createLocation({
      pathname: '/messageContent',
      state: obj
    });
    hashHistory.push(nextLocation);
  }

  render() {
    let imagesIndex = 0;
    const imageList = (index) => {
      return (
        <img src={index} key={imagesIndex++} className="images"/>
      )
    };
    const selectType = (talkId) => {
      if (this.props.type == 'complain') {
        return (
          <div onClick={e => {
            this.showModal(e)
          }}><Icon type={require('!svg-sprite!../images/svg/warning.svg')}/><span>投诉</span></div>
        )
      }
      else {
        return (
          <div onClick={e => {
            this.talkDelete(e, talkId)
          }}><Icon type={require('!svg-sprite!../images/svg/warning.svg')}/><span>删除</span></div>
        )
      }
    };
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
      console.log(rowData, sectionID, rowID);
      return (
        <div key={rowID}
             style={{
               padding: '0.08rem 0.16rem',
               backgroundColor: 'white',
             }}
        >
          <div className="list-content-personal">
            <div className="list-content-avatar" onClick={e => this.showPersonCard(e)}>
              <img src={this.props.personal.avatar} className="images"/>
            </div>
            <div className="list-content-personal-message">
              <p className="list-content-author">{this.props.personal.author}</p>
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
            {selectType(obj.id)}

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
                    height: document.documentElement.clientHeight / this.props.height,
                    border: '1px solid #ddd',
                    margin: '0.1rem 0',
                    color: 'black'

                  }}
                  scrollerOptions={{scrollbars: true}}
                  refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />}
        />
      </div>
    );

  }
}
PersonalTalkList.propTypes = {}
