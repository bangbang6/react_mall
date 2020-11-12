import { PaginationType } from '@/@types/list';
import { ProductType } from '@/@types/product';
import { query } from '@/services/search';
import React,{useState,useCallback} from 'react';
import List from './List';
import styles from './search.less';
import SearchInput from './SearchInput';
interface ListData {
  data:ProductType[],
  pagination:PaginationType,
}
export default () => {
 const [ListData, setListData] = useState<ListData>({
   data:[],
   pagination:{
     totalPage:0,
     pageNo:0,
     pageSize:10,
     searchKey:''
   }
 })
 const saveState =useCallback(
  (particalState:{
    data?:ProductType[],
    pagination:PaginationType
  })=>{
     let data = [...ListData.data,...(particalState.data||[])]
     let pagination = {
       ...ListData.pagination,
       ...particalState.pagination
     }
     if(pagination.pageNo === 0){
       data = particalState.data||[]
     }
     setListData({data,pagination})
  },
   [ListData],
 ) 
 const queryList = useCallback(
  (pagenation?:PaginationType)=>{
    let {pageNo,pageSize,searchKey} = ListData.pagination
    if(pagenation){
      
      //pageNo = pagenation.pageNo || pageNo
      if(pagenation.pageNo!==undefined) pageNo= pagenation.pageNo
      pageSize = pagenation.pageSize || pageSize
      searchKey = pagenation.searchKey || searchKey
    }
   
    
    query({
      pageNo,pageSize,searchKey
    }).then(res=>{
      const {list} = res
      saveState(list)
    })
 },
   [ListData.pagination,saveState],
 )
  return (
    <div>
      <SearchInput queryList={queryList}></SearchInput>
      <List data = {ListData.data} pagination={ListData.pagination} queryList = {queryList}></List>
    </div>
  );
}
