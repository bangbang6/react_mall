import React from 'react'
import { Link } from 'umi'
import styles from './index.less'
const  SearchInput = ()=>{
  return (
  <section className={styles.main}>
    <Link to="/search" className={styles.fakeInput}>
      <i className="iconfont icon-sousuo" /> 寻找宝贝
    </Link>
  </section>
  )
}

export default SearchInput
