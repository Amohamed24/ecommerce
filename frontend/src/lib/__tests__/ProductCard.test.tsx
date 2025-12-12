import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/productCard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ProductCard', () => {
  const mockProduct = {
    _id: '123',
    title: 'Test Product',
    price: 99.99,
    category: 'Jackets',
    gender: 'Men',
    image: ['https://example.com/image.jpg'],
    alt: 'Test product image',
    rating: 4.5,
  };

  it('should render product information', () => {
    render(
      <BrowserRouter>
        <ProductCard
          _id={mockProduct._id}
          id={mockProduct._id}
          title={mockProduct.title}
          price={mockProduct.price}
          category={mockProduct.category}
          gender={mockProduct.gender}
          image={mockProduct.image}
          src={mockProduct.image[0]}
          alt={mockProduct.alt}
          starRating={() => <div>★★★★☆</div>}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Test product image')).toBeInTheDocument();
    expect(screen.getByText(/99\.99/)).toBeInTheDocument(); 
    expect(screen.getByText(/Jackets/)).toBeInTheDocument();
  });

  it('should display product image', () => {
    render(
      <BrowserRouter>
        <ProductCard
          _id={mockProduct._id}
          id={mockProduct._id}
          title={mockProduct.title}
          price={mockProduct.price}
          category={mockProduct.category}
          gender={mockProduct.gender}
          image={mockProduct.image}
          src={mockProduct.image[0]}
          alt={mockProduct.alt}
          starRating={() => <div>★★★★☆</div>}
        />
      </BrowserRouter>
    );

    const img = screen.getByAltText('Test product image');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});