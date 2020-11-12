import { queryRecommand } from '@/services/home'
import React,{useState,useEffect} from 'react'
import {WingBlank,Card,Grid} from 'antd-mobile'
import { Link } from 'umi'
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import styles from './index.less'
function Node({id,title,img}:DataItem){
  return <Link to={'/product/'+id} >
    <div className = 'oneRow'>{title}</div>
    <img src = {img} className = {styles.nodeImg}></img>
  </Link>
}
export default function Recommand() {
  const [list,setList] = useState([])
  useEffect(() => {
    queryRecommand().then(res=>{
      
      setList(res.list.data)
    })
    
  }, [])
  return <>
  <WingBlank className= {styles.main}>
    <Card title = '' extra={<a href="#">more</a>}>
      <Card.Header title='好货推荐'></Card.Header>
      <Grid data={list.slice(0,6)} columnNum = {3} renderItem = {data=>Node({...data})}></Grid>
      
    </Card>
  </WingBlank>
  <WingBlank size="lg" className={styles.main2}>
        <Card>
          <Card.Header title="猜你喜欢" />
          <Grid
            data={list.slice(6)}
            columnNum={2}
            renderItem={data => Node({ ...data })}
          />
        </Card>
      </WingBlank>
  </>
}
