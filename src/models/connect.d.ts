import { Location,Dispatch } from 'umi';
import { UserModelState } from "./user";

//!model state 的类型 就是存储在store的类型 
//!公共的state的类型 
export interface ConnectState {
  user:UserModelState
}
//!每个组件的公共的props类型 每个都会有location的路由类型 其他组件自己的props自己去继承再写
export interface ConnectProps{
  location:Location,
  dispatch:Dispatch
}
export {
  UserModelState
}