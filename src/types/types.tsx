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
  description: string;
  rating: number;
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
  description?: string;
  rating?: number;
}

export interface ProductDetailsComponentProps {
  listingData: ProductDetailsProps | null;
  setListingData: React.Dispatch<
    React.SetStateAction<ProductDetailsProps | null>
  >;
  count?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: () => void;
  starRating?: (rating: number) => JSX.Element;
}

export interface HomeProps {
  products: Product[];
  search: string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setSearch: (value: string) => void;
  addToCart?: () => void;
  starRating?: (rating: number) => JSX.Element;
}

export interface CheckoutProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
  addToCart?: () => void;
  checkArr: ProductDetailsProps[];
  setCheckArr: React.Dispatch<React.SetStateAction<ProductDetailsProps[]>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  products: Product[];
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  addToCart?: () => void;
}
