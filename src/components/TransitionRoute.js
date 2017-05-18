/**
 * Created by Linwei on 2017/5/12.
 */

import React, {Component} from "react";
import ReactAddonsCssTransitionGroup from "react-addons-css-transition-group";


export default class TransitionRoute extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
    }

    render() {
        return (
            <ReactAddonsCssTransitionGroup
                transitionName="transitionWrapper"
                component="div"
                transitionAppear={true}
                transitionEnter={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout = {1000}
            >
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
            </ReactAddonsCssTransitionGroup>
        )
    }
}
