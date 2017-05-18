/**
 * Created by Linwei on 2017/5/4.
 */
import {TAB_SELECTED} from "../actions/actions";

export const uiStatus = (state={selectedTab:"redTab"},action) =>{
        switch (action.type){
            case TAB_SELECTED:
                return Object.assign({},state,{
                    selectedTab : action.text
                })
        }
};
