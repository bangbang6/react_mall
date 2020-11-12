import { query } from '@/services/product';
import React,{useEffect,useState} from 'react';
import { IRoute } from 'umi';
import Carousel from './Carousel';
import styles from './[id].less';
import Tags from '@/components/Tags';
import { Card, WhiteSpace } from 'antd-mobile';
import classnames from 'classnames'
import CartAndBuy from './CartAndBuy';
interface productPeops extends IRoute{
  id?:number
}
export interface ProductType  {
  
  imgs:Array<string>,
  price:number,
  title:string,
  tags:Array<string>
}
export default (props:productPeops) => {
  const [productInfo, setproductInfo] = useState<ProductType>({imgs:[],price:0,title:'',tags:[]})
  const {id} = props.match.params
  useEffect(() => {
    
    query({id}).then(res=>{
      setproductInfo({...res.data})
    })
  }, [])
  return (
    <div>
      <div className={styles.main}>
        <Carousel data={productInfo.imgs}></Carousel>
        <WhiteSpace size="lg" />
        <Card full>
          <p className={classnames('red','bold')}>￥{productInfo.price}</p>
          <p className = 'font14'>{productInfo.title}</p>
          <WhiteSpace size="lg" />
          <Tags tags={productInfo.tags} />
        </Card>
        <CartAndBuy product={productInfo}></CartAndBuy>
      </div>
    </div>
  );
}
