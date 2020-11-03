import React from 'react';
import { notification } from 'antd';

import LayoutPageProperties from '../interfaces/LayoutPageProperties';
import { Footer, Header } from './ui';
import './css/index.scss';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

const GlobalLayout = ({ Component, route }: LayoutPageProperties) => (
  <div className='public-layout'>
    <Header />
    <div className='content-page'>
      <div className='content-width breadcrumbs' />
      <Component route={route} />
    </div>
    <Footer />
  </div>
);

export default GlobalLayout;
