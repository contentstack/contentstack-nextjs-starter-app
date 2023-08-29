import React from 'react';

import { HeroModel } from './HeroModel';
import type { CMSHeroProps } from './HeroTypes';
import HeroComponent from './organisms/HeroComponent';


export default function Hero(props: CMSHeroProps): JSX.Element {
  return (
    <HeroComponent  {...HeroModel.getProps(props)} />
  )
}
