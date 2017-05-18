/**
 * Created by Linwei on 2017/5/7.
 */
import React, {Component} from 'react';
import {NavBar,List,TextareaItem,ImagePicker,Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {formFetch} from '../sources/ajax';
import {URL} from '../actions/actions';

const Item = List.Item;

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

class MessagePublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFiles : data,
            content:''
        }
    }
    goBack(e) {
        this.props.router.goBack();
    }
    onChange(files,type,index){
        console.log(files, type, index);
        this.setState({
            imageFiles:files
        });
        console.log(this.state);
    }
    imageClick(index,fs){
        console.log(index,fs);
    }
    async pushAdd(e){
        let data = this.state;
        let imageFiles = data.imageFiles;
        let content = this.props.form.getFieldInstance('count').props.value;
        let json = await formFetch(URL+'/talkAdd',{
            imageFiles,
            content,
            userId:window.bbs.bbsUser.userId,
            game:'rhythm'
        });
        if(json.success){
          Toast.success("发布成功!");
          this.props.router.goBack();
        }
        else{
          Toast.fail(json.message);
        }
    }
    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div className="transitionWrapper-Page">
                <NavBar leftContent="返回" mode="light" onLeftClick={e => this.goBack(e)}
                        rightContent={[
                            <span onClick={e=>this.pushAdd(e)}>发布</span>
                        ]}
                >
                    发表信息
                </NavBar>
                <List>
                    <TextareaItem
                        {...getFieldProps('count',{
                          ref:this.text
                        })}
                        placeholder="发表内容"
                        rows={5}
                        count={100}
                    />
                </List>
                <p className="images-title">选择图片:</p>
                <ImagePicker
                    files = {this.state.imageFiles}
                    onChange={(files,type,index)=>{this.onChange(files,type,index)}}
                    onImageClick = {(index,fs)=>this.imageClick(index,fs)}
                    selectable = {this.state.imageFiles.length<5}
                />
            </div>
        );
    }
}
const TextareaItemExampleWrapper = createForm()(MessagePublish);
export default TextareaItemExampleWrapper;

MessagePublish.propTypes = {}
