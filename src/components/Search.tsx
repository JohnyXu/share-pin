import React from 'react';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Search(props: SearchProps) {
  return <div>Search</div>;
}

export default Search;
