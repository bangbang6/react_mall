import { CartProductType } from '@/@types/product';
import { query } from '@/services/olist';
import React,{useEffect,useState} from 'react';
import styles from './index.less';
import List from './List';

export default () => {
  const [olist,setOlist] = useState<CartProductType[]>([])
  useEffect(() => {
    query().then(res=>{
      setOlist(res.list.data)
    })
    
  }, [])
  return (
    <div>
     <List data={olist}> </List>
    </div>
  );
}
