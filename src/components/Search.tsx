'use client';
import { HiMagnifyingGlass } from "react-icons/hi2";


interface Product {
  id: number;
  title: string;
  gender: string;
  category: string;
  price: string;  
  size: string;

}

interface SearchProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {  
  return (
    <div>
        <form className='search relative' onSubmit={(e) => e.preventDefault()}>
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
            />
      </form>
    </div>
  )
}

export default Search;
