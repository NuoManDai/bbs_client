/**
 * Created by Linwei on 2017/5/11.
 */
import React, {Component} from 'react';
import {NavBar,Modal,ListView} from 'antd-mobile'
import {createForm} from 'rc-form';
import {hashHistory} from 'react-router'
const data = [
    {
        id: 0,
        talkId:0,
        avatar:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        author:'author',
        content: '不是所有的兼职汪都需要风吹日晒',
        time: "2017-1-1",
        talkContent:'不是所有的兼职汪都需要风吹日晒'
    },
    {
        id: 0,
        talkId:0,
        avatar:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        author:'author',
        content: '不是所有的兼职汪都需要风吹日晒',
        time: "2017-1-1",
        talkContent:'不是所有的兼职汪都需要风吹日晒'
    },
    {
        id: 0,
        talkId:0,
        avatar:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        author:'author',
        content: '不是所有的兼职汪都需要风吹日晒',
        time: "2017-1-1",
        talkContent:'不是所有的兼职汪都需要风吹日晒'
    },
    {
        id: 0,
        talkId:0,
        avatar:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        author:'author',
        content: '不是所有的兼职汪都需要风吹日晒',
        time: "2017-1-1",
        talkContent:'不是所有的兼职汪都需要风吹日晒'
    }
];

let index = data.length - 1;

let pageIndex = 0;

class PersonalComment extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        console.log(dataSource);
        this.initData = [];
        for (let i = 0; i < 20; i++) {
            this.initData.push(`r${i}`);
        }
        console.log(this.initData);
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false
        };
    }
    goBack(){
        this.props.router.goBack();
    }
    contentClick(e, id) {
        console.log(id);
        console.log(e);
        hashHistory.push('/messageContent/' + id);
    }

    showPersonCard(e) {
        hashHistory.push('/characterCard')
    }
    render() {
        const {getFieldProps} = this.props.form;

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
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
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
                            <img src={obj.avatar} className="images"/>
                        </div>
                        <div className="list-content-personal-message">
                            <p className="list-content-author">{obj.author}</p>
                            <p className="list-content-time">{obj.time}</p>
                        </div>
                    </div>
                    <div className="list-content-content" onClick={e=>this.contentClick(e,obj.id)}>
                        {obj.content}
                    </div>
                    <div className="comment-talk" onClick={e=>this.contentClick(e,obj.id)}>
                        来自 : {obj.talkContent}
                    </div>
                </div>
            );
        };
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}>
                    我的评论
                </NavBar>
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
                />
            </div>
        );
    }
}
PersonalComment.propTypes = {}
const TextareaItemExampleWrapper = createForm()(PersonalComment);
export default TextareaItemExampleWrapper;
