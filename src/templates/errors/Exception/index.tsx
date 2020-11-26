import React from 'react';
import { Row, Col } from 'antd';

import config from './config';
import './index.scss';

interface ExceptionProperties {
  type: 403 | 404 | 500;
  title: string;
  desc: string;
  actions: React.ReactNode;
}

const Exception:React.FC<ExceptionProperties> = ({ type, title, desc, actions }) => {
  const error = config[type];
  return (
    <Row className='exception-page' justify='center'>
      <Col className='exception-page-img' xs={24} sm={12} md={12} lg={15} xl={15}>
        <img
          src={error.img}
          alt={error.title}
        />
      </Col>
      <Col className='exception-page-content' xs={24} sm={12} md={12} lg={9} xl={9}>
        <h1>{title || error.title}</h1>
        <div className='exception-page-desc'>{desc || error.desc}</div>
        <div>
          {actions}
        </div>
      </Col>
    </Row>
  );
};

export default Exception;
