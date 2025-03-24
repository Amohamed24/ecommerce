import React from 'react';
import Header from '../components/Header';
import { CheckOutPageProps } from '../types/types';
import Shipping from '../components/Shipping';
import Payment from '../components/Payment';
import PlaceOrder from '../components/PlaceOrder';

const CheckoutPage: React.FC<CheckOutPageProps> = ({
  count,
  setCount,
  checkArr,
  setCheckArr,
}) => {
  return (
    <div>
      <Header
        search=""
        setSearch={() => {}}
        products={[]}
        count={count || 0}
        setCount={setCount || (() => {})}
      />

      <PlaceOrder  />
    </div>
  );
};

export default CheckoutPage;
