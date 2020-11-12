import React,{useState,useEffect} from 'react'
import {Card,ListView,WingBlank,Icon} from 'antd-mobile'
import styles from './index.less'
import { ProductType } from '@/@types/product'
import { PaginationType } from '@/@types/list'
import { Link } from 'umi'
import Tags from '@/components/Tags'
import classnames from 'classnames'
interface ListProps {
  data:ProductType[],
  pagination:PaginationType,
  queryList:Function
}
interface ListState {
  dataSource:any
}
export default function List(props:ListProps) {
  const {data,pagination,queryList} = props
  const [listViewData, setlistViewData] = useState<ListState>({
     dataSource:new ListView.DataSource({
      rowHasChanged :(r1:any,r2:any)=>{
         return r1!==r2
       }
     })
   })
   const onEndReach = ()=>{
     console.log('pagination',pagination);
     
     if(pagination.pageNo < pagination.totalPage-1){
       queryList({
         pageNo:pagination.pageNo+1
       })
     }
   }
   useEffect(() => {
     queryList()
     
   }, [])
  return (
    <Card full className = {styles.main}>
    {data.length>0 ?(<ListView dataSource = {listViewData.dataSource.cloneWithRows(data)} 
      renderRow={item=>{
        return Node(item)
      }}
      pageSize = {pagination.pageSize}
      initialListSize = {pagination.pageSize}
      onEndReached={onEndReach}
      useBodyScroll={true}
      renderFooter = {()=>{
      return <div className='txtCenter'>{ pagination.pageNo<pagination.totalPage-1?(<Icon type='loading'></Icon>):(<div>加载完毕</div>) }</div>
      } }
      onEndReachedThreshold = {10}
      ></ListView>):(<div className='txtCenter font14'>暂无数据</div>)
      }
    </Card>
  )
}
function Node({ img, title, price, tags, id }: ProductType) {
  return (
    <Link className={styles.node} to={'/product/' + id}>
      <div className={classnames(styles.imgBox, 'xyCenter')}>
        <img src={img} />
      </div>
      <WingBlank size="lg" className={styles.ctn}>
        <div className="twoRows">{title}</div>
        <div className={classnames(styles.priceBox, 'font16')}>
          <span className={styles.yuan}>￥</span>
          <span className={styles.price}>{price}</span>
        </div>
        <Tags tags={tags} />
      </WingBlank>
    </Link>
  );
}