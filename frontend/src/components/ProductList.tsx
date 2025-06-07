import ProductCard from '../components/productCard';
import { Product, SortOrder } from '../types/types';
import Filter from './Filter';

interface ProductListProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
  starRating?: (rating: number) => JSX.Element;
  setSortOrder: (order: SortOrder) => void;
}

const ProductList = ({
  products,
  search,
  setSearch,
  starRating,
  setSortOrder,
}: ProductListProps) => {


  return (
    <div className="flex flex-col items-center w-full pb-10">
      <Filter 
        setSortOrder={setSortOrder} 
        sortOrder={'none'}     
      />

      <div className="flex flex-wrap m-auto justify-center w-full gap-5 mt-20 z-1">
        {products.length > 0 ? (
          products.map((product) => (
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
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-lg font-medium text-gray-600">
              No products found for "{search}"
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try a different search term or browse all products
            </p>
            <button
              className="mt-4 px-4 py-2 bg-teal-200 rounded-md hover:bg-teal-300 transition-colors"
              onClick={() => setSearch('')}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
