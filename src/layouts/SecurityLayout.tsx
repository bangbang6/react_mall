import { ConnectProps, ConnectState } from '@/models/connect'
import React, { ReactElement } from 'react'
import { connect, Redirect, UserModelState } from 'umi'
interface SecurityLayoutProps extends ConnectProps{
  user:UserModelState,
  children:ReactElement
}
const SecurityLayout:React.FC<SecurityLayoutProps> = (props) =>{
  const {children,user,dispatch,location} = props
  const {userid} = user.currentUser
  const isLogin = !!userid
  if(!isLogin){
    return <Redirect to={{pathname:'/login',state : {from:location.pathname}}}></Redirect>
  }
  return (
    <div>
      {children}
    </div>
  )
}
export default connect(({user}:ConnectState)=>({user}))(SecurityLayout)