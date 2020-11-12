import React,{memo} from 'react'
import {WingBlank,Button} from 'antd-mobile'
interface LogoutProps{
  logout:Function
}
export default memo(function Logout(props:LogoutProps) {
  const {logout} = props
  console.log(1);
  
  return (
    <WingBlank>
      <Button type = 'primary' onClick = {()=>logout()}> 退出登录</Button>
    </WingBlank>
  )  
})
