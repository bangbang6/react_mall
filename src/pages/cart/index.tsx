import { CartProductType } from '@/@types/product';
import { query } from '@/services/cart';
import React,{useEffect,useState} from 'react';
import List, { UpdateProductType } from './List';
import styles from './index.less';
import PayBar from './PayBar';
import { connect,history } from 'umi';
import { ConnectState,ConnectProps } from '@/models/connect';
interface cartListProps {
  data:CartProductType[]
}
interface CartState extends ConnectProps{
  data:CartProductType[]
}
export default connect(({cart}:ConnectState)=>({cart}))((props:CartState) => {
  const [cartList,setCartList] = useState<cartListProps>({data:[]})
  useEffect(() => {
    query().then(res=>{
      setCartList({data:res.list.data})
    })
  }, [])
  const updateProduct = (newState:UpdateProductType)=>{
    const {id,index,count,checked} = newState
    let data = [...cartList.data]
    if(count === 0){
      data.splice(index,1)
    }else Object.assign(data[index],newState)
    
    setCartList({data})
  }
  const checkedAllChange = (allchecked:boolean)=>{
    let data = [...cartList.data]
   
    
    data.forEach(item=>{item.checked =allchecked})
    
    setCartList({data})
  }
  const goPay = ()=>{
    const {data} = cartList
    const checkData = data.filter(item=>item.checked)
    props.dispatch({type:'cart/saveCart',payload:{data:checkData}})
    history.push('/confirmBill')
  }
  return (
    <div>
      <List data = {cartList.data} updateProduct = {updateProduct}></List>
      <PayBar data = {cartList.data} checkedAllChange  = {checkedAllChange} goPay = {goPay}></PayBar>
    </div>
  );
})
