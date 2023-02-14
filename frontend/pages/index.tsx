import * as React from 'react';
import type { NextPage } from 'next';
import DepositCardStack from 'components/Deposits/DepositCardStack';
import CommonLayout from 'layouts/CommonLayout';

const Home: NextPage = () => {
  return (
    // main page content
    <>
      <DepositCardStack />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout></CommonLayout>
    </>
  );
};

export default Home;
