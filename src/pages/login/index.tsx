import { ConnectState,ConnectProps,UserModelState } from '@/models/connect';
import React from 'react';
import styles from './index.less';
import {connect, Dispatch, Redirect} from 'umi'
import LoginForm from './LoginForm';
import {LoginParams} from '../../services/login'
interface LoginProps extends ConnectProps{
  user:UserModelState,
}
const Login:React.FC<LoginProps> = ({user,location,dispatch}) => {
  const {userid} = user.currentUser;
  const isLogin = !!userid
  if(isLogin){
    const { from = '/'} = location.state ||{}
    return <Redirect to={from}></Redirect>
  }
  //不能直接在form组件定义该函数 因为它不需要user的值 所以没必要有connect连接 
  //!在这里定义submit函数 因为这里有和connect的交互可以dispatch派发 这个函数传给form组件 让form组件里面click时候去执行 这个逻辑很重要
  const handleSubmit = (value:LoginParams)=>{
    dispatch({type:'user/login',payload:value})
  }
  return (
    <div className = {styles.main}>
      <div className = {styles.logo}></div>
      <LoginForm handleSubmit = {handleSubmit}></LoginForm>
    </div>
  );
}
export default connect(({user}:ConnectState)=>({user}))(Login)
