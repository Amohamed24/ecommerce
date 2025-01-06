import React, { useState } from 'react'
import { HiMagnifyingGlass } from "react-icons/hi2";




interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {  
  return (
    <div>
        <form className='search' onSubmit={(e) => e.preventDefault()}>
            <input 
                id='search'
                type='text'
                role='searchbox'
                placeholder='Search'
                className='border border-black p-2 rounded pl-10'    
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                
            />
            <HiMagnifyingGlass 
                className="absolute left-[67.15rem] top-1/2 -translate-y-1/2 text-gray-500" 
            />
      </form>
    </div>
  )
}

export default Search;
