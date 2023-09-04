import React from 'react';

import HeaderComponent from './organisms/HeaderComponent';
import { HeaderComponentCMSProps } from './HeaderTypes';
import { HeaderModel } from './HeaderModel';

export function Header(props: HeaderComponentCMSProps): JSX.Element {
  return (
    <HeaderComponent {...HeaderModel.getProps(props)} />
  )
}
