import { ConnectState,ConnectProps,UserModelState } from '@/models/connect';
import React, { useEffect,useCallback,useState } from 'react';
import { connect} from 'umi';
import Header from './Header';
import styles from './index.less';
import Logout from './Logout';
import MyList from './MyList';
interface UserProps extends ConnectProps {
    user:UserModelState
}
const User:React.FC<UserProps> =  (props) => {
  const {dispatch,user} = props
  let [num,setNum] = useState(0)
  /*useEffect(()=>{
    let timer = setInterval(()=>{
      setNum(++num)
    },1000)
    return ()=>{
      clearInterval(timer)
    }*
  },[])*/
  
  useEffect(()=>{
    dispatch({type:"user/queryDetail"})
  },[])
  const {name,icon} = user.detail
  const logout = useCallback(
    ()=>{
      dispatch({type:"user/logout"})
    },[]
  )
  return (
    <div>
      <Header name={name} icon = {icon} ></Header>
      <MyList />
      <Logout logout = {logout}></Logout>
    </div>
  );
}

export default connect(({user}:ConnectState)=>({user}))(User)