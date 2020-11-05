import React from 'react'
import {InputItem,Button,WingBlank,WhiteSpace} from 'antd-mobile'
import {createForm} from 'rc-form'
interface LoginFormProps {
  form:{
    getFieldProps:Function,
    getFieldsValue:Function
  },
  handleSubmit:Function
}
const LoginForm:React.FC<LoginFormProps> = ({form,handleSubmit})=> {
  const {getFieldProps,getFieldsValue} = form
  const submit = ()=>{
    let value = getFieldsValue()
    handleSubmit(value)
  }
  return (
    <div>
      <WingBlank size='lg' >
        <WhiteSpace size='lg'></WhiteSpace>
      <InputItem type='text' {...getFieldProps('name')} clear placeholder='请输入账号'>账号</InputItem>
      
      <InputItem type='password' {...getFieldProps('password')} clear placeholder='请输入密码' autoComplete = "new-password">密码</InputItem>
      <WingBlank size='lg' />
      <WhiteSpace size='lg'></WhiteSpace>

      <Button type ='primary' onClick = {submit}>登录</Button>
      </WingBlank>
    </div>
  )
}
export default createForm()(LoginForm)