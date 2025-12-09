'use client';

import ProductList from '../components/ProductList';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { HomeProps } from '../types/types';

interface HomePageProps extends HomeProps {
  allProducts: any[];
}

const Home = ({
  search,
  setSearch,
  products,
  count,
  setCount,
  addToCart,
  starRating,
  setFilteredByGender,
  setSortOrder,
  allProducts,
}: HomePageProps) => {
  console.log('Home - allProducts:', allProducts);
  console.log('Home - products:', products);
  console.log('Home - products length:', products.length);

  return (
    <main>
      <section className="min-h-screen bg-gray-100">
        <Header
          search={search}
          setSearch={setSearch}
          products={products}
          count={count}
          setCount={setCount}
          addToCart={addToCart}
        />

        <div className="flex flex-row">
          <SideBar
            setFilteredProducts={setFilteredByGender}
            allProducts={allProducts}
          />
          <ProductList
            products={products}
            search={search}
            setSearch={setSearch}
            starRating={starRating}
            setSortOrder={setSortOrder}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
