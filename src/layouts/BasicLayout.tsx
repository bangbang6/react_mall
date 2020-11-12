import React, {    useEffect ,useMemo} from 'react'
import BottomNav from '../components/BottomNav/index'
import '@/static/icon-font/iconfont.css' //iconfont就是引入一个全局css即可
import { Location, Dispatch,connect} from 'umi'
import styles from './BasicLayout.less'
import { ConnectState } from '@/models/connect'
interface BasicLayoutProps{
  location:Location,
  dispatch:Dispatch,
  user:any
}
const BasicLayout:React.FC<BasicLayoutProps> = props =>{
  const {children,location,dispatch,user} = props
  
  const pathname = location.pathname
  useEffect(()=>{
    if(dispatch){
      dispatch({
        type:"user/fetchCurrent"
      })
    }
  },[])
  const showBottomNav = useMemo(()=>{
    return pathname!=='/login'
  },[pathname])
  return (<div className={styles.main}>
    <article>{children}</article>
    <footer>
    {showBottomNav &&<BottomNav pathname = {pathname} ></BottomNav>}

    </footer>
    </div>)
}
export default connect(({user}:ConnectState)=>({user}))(BasicLayout)