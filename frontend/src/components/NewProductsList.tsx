import ProductCard from '../components/productCard';
import { NewProducts } from '../types/types';

interface NewProductListsProps {
  products: NewProducts[];
  starRating?: (rating: number) => JSX.Element;
}

const NewProductsList = ({ products, starRating }: NewProductListsProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* New Product List */}
      <div className="flex flex-wrap m-auto justify-center w-full gap-9">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            id={product.id}
            _id={product._id}
            title={product.title}
            category={product.category}
            gender={product.gender}
            price={product.price}
            size={product.size}
            src={product.src}
            image={product.image}
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

export default NewProductsList;
