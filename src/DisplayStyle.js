import React, { useState } from 'react';

const DisplayStyle = ({ changeDisplay, searchFromApp }) => {
  const [searchValue, setSearchValue] = useState('');
  const radio = (radioValue) => {
    changeDisplay(radioValue);
    setSearchValue('');
  };
  const search = (searchVal) => {
    setSearchValue(searchVal);
    searchFromApp(searchVal);
  };
  return (
    <div className='display-search'>
      <div className='radio-container' onChange={(e) => radio(e.target.value)}>
        Display:
        <input type='radio' id='all' name='display' value='all' />
        <label forhtml='all'>All Messages</label>
        <input
          type='radio'
          id='latest'
          name='display'
          value='latest'
          defaultChecked
        />
        <label forhtml='latest'>Latest 10 Messages</label>
      </div>
      <input
        type='text'
        name='search'
        value={searchValue}
        placeholder='Search words'
        onChange={(e) => search(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default DisplayStyle;
