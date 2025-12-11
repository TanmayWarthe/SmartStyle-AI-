// API Service for fetching products from DummyJSON
const BASE_URL = 'https://dummyjson.com';

export const productAPI = {
  // Fetch all products with pagination
  getAllProducts: async (limit = 30, skip = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      return {
        products: data.products.map(transformProduct),
        total: data.total
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], total: 0 };
    }
  },

  // Fetch products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      const data = await response.json();
      return data.products.map(transformProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
      const data = await response.json();
      return data.products.map(transformProduct);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      return transformProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};

// Transform API product data to match our app structure
function transformProduct(product) {
  return {
    id: product.id.toString(),
    name: product.title,
    price: Math.round(product.price * 83), // Convert USD to INR (approx)
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'S': product.stock > 10 ? 5 : 2,
      'M': product.stock > 10 ? 8 : 3,
      'L': product.stock > 10 ? 6 : 2,
      'XL': product.stock > 10 ? 4 : 1
    },
    category: formatCategory(product.category),
    image: product.thumbnail || product.images?.[0] || '/placeholder.jpg',
    images: product.images || [product.thumbnail],
    description: product.description,
    rating: product.rating || 4.0,
    brand: product.brand || 'SmartStyle',
    availabilityStatus: product.availabilityStatus || 'In Stock'
  };
}

// Format category names
function formatCategory(category) {
  const categoryMap = {
    'mens-shirts': 'Shirts',
    'mens-shoes': 'Footwear',
    'mens-watches': 'Accessories',
    'womens-dresses': 'Dresses',
    'womens-shoes': 'Footwear',
    'womens-watches': 'Accessories',
    'womens-bags': 'Bags',
    'womens-jewellery': 'Jewellery',
    'sunglasses': 'Accessories',
    'tops': 'T-Shirts'
  };
  
  return categoryMap[category] || category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default productAPI;
