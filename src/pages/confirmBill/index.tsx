import React,{useEffect,useState,useMemo} from 'react';
import styles from './index.less';
import {WingBlank,WhiteSpace,Toast} from 'antd-mobile'
import { getDefaultReceivingInfo } from '@/services/confirmBill';
import ReceivingInfo, { ReceivingInfoType } from './ReceivingInfo';
import ListNode from './ListNode';
import { CartModelState, connect } from 'umi';
import {ConnectProps, ConnectState} from '@/models/connect'
import PayBar from './PayBar';
export interface ConfirmBillState{
  receivingInfo:ReceivingInfoType
}
export interface ConfirmBillProps extends ConnectProps{
  cart:CartModelState
}
export default connect(({cart}:ConnectState)=>({cart}))((props:ConfirmBillProps) => {
  const [confirmBillInfo,setConfiemBillInfo] = useState<ConfirmBillState>({receivingInfo:{name:'',tel:'',address:""}})
  
  
  const {data} = props.cart
  useEffect(()=>{
    if(data.length === 0){
      Toast.info("请重新进入确定订单页面")
      history.go(-1)
    }else{
      getDefaultReceivingInfo().then(res=>{
        setConfiemBillInfo({receivingInfo:{...res}})
      })
    }
  },[])
  let payBarOptions = useMemo(()=>{
    let totalPrice = 0,count = 0
    data.forEach(item=>{
      if(item.checked){
        totalPrice+=item.price*item.count
        count += item.count
      }
    })
    return {totalPrice,count}
  },[data])
  let nodeArr = useMemo(()=>{
   
    return data.map(item=>{
     
      return <ListNode {...item} key={item.id}></ListNode>
    })
  },[data])
  return (
    <WingBlank size='lg'>
      <WhiteSpace size='lg'></WhiteSpace>
      <ReceivingInfo {...confirmBillInfo.receivingInfo}></ReceivingInfo>
      <WhiteSpace size='lg'></WhiteSpace>
      <div>{nodeArr}</div>
      <PayBar {...payBarOptions}></PayBar>
    </WingBlank>
  );
})
