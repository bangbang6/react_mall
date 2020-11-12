import React ,{useRef,useEffect,useState,useCallback}from 'react'
import styles from './index.less'
import {InputItem,Button} from 'antd-mobile'
import { history } from 'umi'
export default function SearchInput(props:{queryList:Function}) {
  //ref获取dom
  const inputRef = useRef<any>(null)
  const [value, setValue] = useState('')
  const [searchMode,setSearchMode] = useState(false)
  const {queryList} = props
  useEffect(() => {
    inputRef.current.focus()
    
  }, [])
   //!useeffect除了可以处理不是纯函数 还能够起到watch的作用 每次value变化都去执行这个effect
  useEffect(()=>{
    const val =value.trim()
    setSearchMode(val!=='')
  },[value])
  const inputChange = useCallback(
    (val:string)=>{
      setValue(val)
    },
    []
  )
  const handleClick =useCallback(()=>{
    if(searchMode){
      const val = value.trim()
      console.log(val);
      
      queryList({searchKey:val,pageNo:0})
    }else{
      
      history.push('/')
    }
  },[value,searchMode])
  return (
    <div className = {styles.main} >
      <InputItem ref={inputRef} value={value} onChange={inputChange} clear  className={styles.searchBar}></InputItem>
     <Button type = 'primary' onClick = {handleClick} className={styles.btn}>{searchMode?'搜索':'取消'}</Button>
    </div>
  )
}
