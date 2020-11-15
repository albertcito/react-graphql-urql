import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProperties {
  link: string;
  title?: React.ReactNode;
}
const ButtonLink: React.FC<ButtonLinkProperties> = ({ link, title = 'Add new' }) => (
  <Button className='button-right' type='primary'>
    <Link to={`${link}`}>
      {title}
    </Link>
  </Button>
);

export default ButtonLink;
