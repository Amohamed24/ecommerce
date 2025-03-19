import ProductCard from '../components/productCard';
import { IoSearchOutline } from 'react-icons/io5';
import { Product } from '../types/types';

interface ProductListProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
  starRating?: (rating: number) => JSX.Element;
}

const ProductList = ({
  products,
  search,
  setSearch,
  starRating,
}: ProductListProps) => {
  return (
    <div className="flex flex-col items-center w-full pb-10">
      <div className="w-[30rem] relative my-4">
        <div className="relative">
          <input
            type="text"
            role="searchbox"
            placeholder="Search products"
            className="border border-gray-400 border-none rounded-3xl p-2 py-3 pl-16 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 ml-5" />
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap m-auto justify-center w-full gap-9">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            gender={product.gender}
            price={product.price}
            size={product.size}
            src={product.src}
            alt={product.alt || product.title}
            description={product.description}
            rating={product.rating}
            starRating={starRating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
