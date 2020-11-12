import React, { useCallback,useMemo } from 'react';
import { Card, Checkbox, Button } from 'antd-mobile';
import classnames from 'classnames';
import styles from './index.less';
import { CartProductType } from '@/@types/product';

const CheckboxItem = Checkbox.CheckboxItem;

export interface PayBarProps {
  data: CartProductType[];
  checkedAllChange: (allChecked: boolean) => void;
  goPay: () => void;
}

const PayBar: React.FC<PayBarProps> = ({ data, checkedAllChange, goPay }) => {
 
    
  //这里用Usememo好点
   let {totalPrice,allCount,checkedAll} = useMemo(() => {
     let totalPrice = 0,allCount = 0,checkedAll = data.length>0
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        checkedAll = checkedAll && item.checked;
        if (item.checked) {
          totalPrice += item.count * item.price;
          allCount += item.count;
        }
      
      }
  return {totalPrice,allCount,checkedAll}
}, [data])
  

  return (
    <Card full className={styles.main}>
      <CheckboxItem
        onChange={() => checkedAllChange(!checkedAll)}
        checked={checkedAll}
      >
        全选
      </CheckboxItem>
      <span>
        合计: ￥ <span>{totalPrice.toFixed(2)}</span>
      </span>
      <Button
        type="primary"
        disabled={totalPrice <= 0}
        className={classnames(styles.btn)}
        onClick={goPay}
      >
        去结算(<span>{allCount}</span>)
      </Button>
    </Card>
  );
};

export default PayBar;
