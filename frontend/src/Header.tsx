import React from 'react';

export interface HeaderProps {
  children: any;
}

function Header({ children }: HeaderProps) {
  return (
    <header>
      <h1>{ children }</h1>
    </header>
  );
}

export default Header;
