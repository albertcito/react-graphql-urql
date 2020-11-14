import React from 'react';
import {
  CheckCircleFilled,
  CheckCircleTwoTone,
  ExclamationCircleFilled,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

interface AvailableIconProperties {
  isAvailable: boolean;
  isSelected?: boolean;
}
const AvailableIcon: React.FC<AvailableIconProperties> = ({
  isAvailable,
  isSelected = false,
}) => {
  const colors = {
    available: '#52c41a',
    missing: '#eb2f96',
  };
  if (isSelected) {
    if (isAvailable) {
      return <CheckCircleFilled style={{ color: colors.available }} />;
    }
    return <ExclamationCircleFilled style={{ color: colors.missing }} />;
  }
  if (isAvailable) {
    return <CheckCircleTwoTone twoToneColor={colors.available} />;
  }
  return <ExclamationCircleTwoTone twoToneColor={colors.missing} />;
};

export default AvailableIcon;
