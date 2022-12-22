import React from 'react';
import { SanityUserDoc } from '../utils';

interface NavBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  user: undefined | SanityUserDoc;
}

function NavBar({ searchTerm }: NavBarProps) {
  return <div>NavBar</div>;
}

export default NavBar;
