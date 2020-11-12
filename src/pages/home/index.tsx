import React from 'react';
import Carousel from './Carousel';
import styles from './index.less';
import SearchInput from './SearchInput';
import Recommand from './Recommand';
import NavMall from './NavTable';
import Arc from '@/components/Arc';

export default () => {
  return (
    <div>
      <SearchInput></SearchInput>
      <Carousel></Carousel>
      <Arc></Arc>
      <NavMall></NavMall>
      <Recommand></Recommand>
    </div>
  );
}
