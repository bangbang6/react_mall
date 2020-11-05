import React from 'react'
import { TabBar } from 'antd-mobile';
import { history } from 'umi';
interface  BottomNavProps{
  pathname:string
}
const Menu = [
  {
    title:'首页',
    link:"/",//跳转的路由
    icon:"shouye"
  }
  ,
  {
    title:'购物车',
    link:"/cart",//跳转的路由
    icon:"gouwuche"
  },
  {
    title:'订单列表',
    link:"/olist",//跳转的路由
    icon:"dingdanliebiao"
  },
  {
    title:'用户中心',
    link:"/user",//跳转的路由
    icon:"wode"
  },
]
  
const BottomNav:React.FC<BottomNavProps> = (props)=> {
  const {pathname} = props
  return (
   
    <div>
      <TabBar tintColor = 'red'>
      {Menu.map(item=>{
        const {title,link,icon} = item
        return <TabBar.Item 
        key={link} 
        title = {title} 
        icon = {<span className = {'iconfont icon-'+icon}></span>}
        selectedIcon =  {<span className = {' red iconfont icon-'+icon}></span>}
        selected =  {pathname === link}
        onPress = {()=>{
          history.push(link)
         
        }}
        ></TabBar.Item>
      })}
      </TabBar>
    </div>
  )
}



export default BottomNav

