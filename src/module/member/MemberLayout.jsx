import React from 'react';
import NavbarMember from './components/NavbarMember';
import { Outlet } from 'react-router-dom';

const MemberLayout = ({perfilData}) => {

  return (
    <div className="w-full pt-16 pb-2">
      <NavbarMember perfilData={perfilData}/>
      <Outlet/>
    </div>
  );
}

export default MemberLayout;
