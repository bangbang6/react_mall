import React, {    useEffect } from 'react'
import BottomNav from '../components/BottomNav/index'
import '@/static/icon-font/iconfont.css' //iconfont就是引入一个全局css即可
import { Location, Dispatch,connect} from 'umi'
import styles from './BasicLayout.less'
interface BasicLayoutProps{
  location:Location,
  dispatch:Dispatch,
  user:any
}
const BasicLayout:React.FC<BasicLayoutProps> = props =>{
  const {children,location,dispatch,user} = props
  console.log('user',user);
  
  const pathname = location.pathname
  useEffect(()=>{
    if(dispatch){
      dispatch({
        type:"user/fetchCurrent"
      })
    }
  },[])
  return (<div className={styles.main}>
    <article>{children}</article>
    <footer>
    <BottomNav pathname = {pathname} ></BottomNav>

    </footer>
    </div>)
}
export default connect(({user})=>({user}))(BasicLayout)