/**
 * Created by Linwei on 2017/5/11.
 */
import React, {Component} from 'react';
import {NavBar, Button, Modal, List, TextareaItem, ListView, RefreshControl, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {postFetch} from '../sources/ajax';
import {URL} from '../actions/actions';
import {dateFormat} from '../sources/dateFormat';
import {hashHistory} from 'react-router';
let fetchData = [];
let getData = async (component) => {
  let json = await postFetch(URL + '/commentSelect', {
    talkId: component.props.location.state.id
  });
  if (json.success) {
    var message = json.message;
    fetchData = [];
    for (var i = 0; i < message.length; i++) {
      fetchData.push(
        {
          id: message[i].comment.id,
          author: message[i].exdUser.userId,
          avatar: message[i].exdUser.avatar,
          time: dateFormat(message[i].comment.time),
          content: message[i].comment.content
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
class MessageContent extends Component {
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
  showPersonCard(e, obj) {
    let nextLocation = hashHistory.createLocation({
      pathname: '/characterCard',
      state: obj
    });
    hashHistory.push(nextLocation);
  }
  async handleComment() {
    let talkId = this.props.location.state.id;
    let userId = window.bbs.exdUser.userId;
    console.log(this.props.form);

    let content = this.props.form.getFieldInstance('count').props.value;
    let json = await postFetch(URL + '/commentAdd', {
      talkId,
      userId,
      content
    });
    if (json.success) {
      this.props.form.setFieldsValue({
        count : ''
      });
      Toast.success("评论发表成功.");
      getData(this);
      this.onClose();
    }
    else {
      Toast.fail(json.message);
    }

  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    const {getFieldProps} = this.props.form;
    let content = this.props.location.state;
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
          <div className="list-content-content">
            {obj.content}
          </div>
        </div>
      );
    };
    const imageList = (index) => {
      return (
        <img src={index} className="images"/>
      )
    }
    return (
      <div className="transitionWrapper-Page">
        <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
          内容
        </NavBar>
        <div className="content">
          <div
            style={{
              padding: '0.08rem 0.16rem',
              backgroundColor: 'white',
            }}
          >
            <div className="list-content-personal">
              <div className="list-content-avatar" onClick={e => this.showPersonCard(e)}>
                <img src={content.avatar} className="images"/>
              </div>
              <div className="list-content-personal-message">
                <p className="list-content-author">{content.author}</p>
                <p className="list-content-time">{content.time}</p>
              </div>
            </div>
            <div className="list-content-content">
              {content.content}
            </div>
            <div className="list-content-image">
              {typeof content.imgList == 'undefined' ? ' ' : content.imgList.map(imageList)}
            </div>
          </div>
        </div>
        <div className="comment-badge">
          <span>评论 </span>
          <span>赞 {content.like}</span>
        </div>
        <div className="content-comment">
          <ListView dataSource={this.state.dataSource}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    onScroll={this.onScroll}
                    style={{
                      height: document.documentElement.clientHeight / 1.5,
                      border: '1px solid #ddd',
                      color: 'black'
                    }}

                    scrollerOptions={{scrollbars: true}}
                    refreshControl={<RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />}
          />
        </div>
        <div className="comment-btn" onClick={e => this.showModal(e)}>
          <div className="comment-input"></div>
          <Button inline size="small">评论</Button>
        </div>
        <Modal
          title="评论"
          transparent
          maskClosable={false}
          visible={this.state.visible}
          onClose={this.onClose}
          footer={[{
            text: '评论', onPress: () => {
              this.handleComment();
            }
          }, {
            text: '取消', onPress: () => {
              this.onClose();
            }
          }]}
        >
          <List>
            <TextareaItem
              {...getFieldProps('count')}
              placeholder="发表内容"
              rows={5}
              count={100}
            />
          </List>
        </Modal>
      </div>
    );
  }
}

MessageContent.propTypes = {}
const TextareaItemExampleWrapper = createForm()(MessageContent);
export default TextareaItemExampleWrapper;
