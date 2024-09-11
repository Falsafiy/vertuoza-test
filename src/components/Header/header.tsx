import React from 'react';
import Image from 'next/image';
 
const Header = () => {
  return (
    <div className="w-full mb-4">
      <Image src={'/svg/logo.svg'} alt={'logo Vertuoza'} width={140} height={50} className={'mx-auto '}/>
    </div>
  );
};

export default Header;
