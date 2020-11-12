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
       {/*  getFieldPropsvalue 相当于 加上value = name onchange = name改变 name哪里来的 在createForm函数中会返回一个新组件里面的state有name 然后render时候是返回该组件 实现组件复合又不改变样式 */}
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