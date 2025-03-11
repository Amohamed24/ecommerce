import { Dispatch, SetStateAction } from 'react';

export interface Product {
  id: number;
  title: string;
  category: string;
  gender: string;
  price: number;
  size: string;
  alt: string;
  src: string;
}

export interface ProductDetailsProps {
  id?: number;
  title?: string;
  category?: string;
  gender?: string;
  price?: number;
  size?: string;
  alt?: string;
  src?: string;
}

export interface ProductDetailsComponentProps {
  listingData: ProductDetailsProps | null;
  setListingData: React.Dispatch<React.SetStateAction<ProductDetailsProps | null>>;
  count?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: () => void;
}

export interface HomeProps {
  products: Product[];
  search: string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setSearch: (value: string) => void;
  addToCart?: () => void;
}

export interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  products: Product[];
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  addToCart?: () => void;
}

export interface ProductListProps {
  products: Product[];
  search?: string;
  setSearch?: (value: string) => void;
}