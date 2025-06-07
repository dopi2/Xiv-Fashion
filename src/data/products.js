// Mock product data
const products = [
  {
    id: 'p1',
    name: 'Basic Slim Fit T-Shirt',
    category: 'tshirts',
    price: 99,
    colors: ['#FFFFFF', '#1A1A1A', '#D3D3D3', '#7FDBDA', '#A5C8FF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/06105729cf84798bc8f8b95168ab2f40.jpg',
      '/images/products/1fe263e071a332b9ee32f138d701604c.jpg',
      '/images/products/284c836256c6f56c5ef635aa99bf5181.jpg',
      '/images/products/60f697ca6376520a887fbca6edd5a341.jpg',
      '/images/products/75b1ab3731e1b61fcfa3f13a6a75c1ab.jpg',
    ],
    description: 'Relaxed fit shirt. Camp collar and short sleeves. Button-up front.',
    details: [
      '100% cotton',
      'Regular fit',
      'Machine washable',
      'Model is 6\'2" and wears size L'
    ],
    tags: ['new', 'bestseller', 'essentials'],
    stock: 45
  },
  {
    id: 'p2',
    name: 'Basic Heavy Weight T-Shirt',
    category: 'tshirts',
    price: 99,
    colors: ['#FFFFFF', '#1A1A1A', '#D3D3D3', '#7FDBDA'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/84f16f572d2124d3dbd621f83099c0ac.jpg',
      '/images/products/85e9a171ef21ad03147091e7bf10356c.jpg',
      '/images/products/a192c003756bf3335c68e214af390f33.jpg',
      '/images/products/bd7fe942ccff7605b4a5d01707cf7773.jpg',
    ],
    description: 'Heavyweight cotton t-shirt with a relaxed fit and durable construction.',
    details: [
      '220 gsm cotton',
      'Oversized fit',
      'Machine washable',
      'Model is 6\'1" and wears size L'
    ],
    tags: ['bestseller', 'essentials'],
    stock: 32
  },
  {
    id: 'p3',
    name: 'Full Sleeve Zipper',
    category: 'shirts',
    price: 199,
    colors: ['#1A1A1A', '#4A5F41', '#D3D3D3'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/df4bdbf6f890efa7938dddedf9752acc.jpg',
      '/images/products/f341947020f9e0dda2030f83320f8853.jpg',
      '/images/products/06105729cf84798bc8f8b95168ab2f40.jpg',
    ],
    description: 'Relaxed fit full sleeve shirt with zipper closure and camp collar.',
    details: [
      '100% cotton',
      'Regular fit',
      'Machine washable',
      'Model is 6\'0" and wears size M'
    ],
    tags: ['new', 'trending'],
    stock: 18
  },
  {
    id: 'p4',
    name: 'Abstract Print T-Shirt',
    category: 'tshirts',
    price: 99,
    colors: ['#1A1A1A', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/60f697ca6376520a887fbca6edd5a341.jpg',
      '/images/products/75b1ab3731e1b61fcfa3f13a6a75c1ab.jpg',
      '/images/products/84f16f572d2124d3dbd621f83099c0ac.jpg',
      '/images/products/85e9a171ef21ad03147091e7bf10356c.jpg',
    ],
    description: 'Oversized fit t-shirt with a clean, minimalist design and comfortable fabric.',
    details: [
      '100% cotton',
      'Oversized fit',
      'Machine washable',
      'Model is 6\'2" and wears size L'
    ],
    tags: ['new', 'limited'],
    stock: 12
  },
  {
    id: 'p5',
    name: 'Minimal Pocket Tee',
    category: 'tshirts',
    price: 89,
    colors: ['#FFFFFF', '#1A1A1A', '#A5C8FF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/images/products/a192c003756bf3335c68e214af390f33.jpg',
      '/images/products/bd7fe942ccff7605b4a5d01707cf7773.jpg',
      '/images/products/df4bdbf6f890efa7938dddedf9752acc.jpg',
    ],
    description: 'Minimalist t-shirt with a single chest pocket and clean finish.',
    details: [
      '180 gsm cotton',
      'Regular fit',
      'Machine washable',
      'Model is 5\'11" and wears size M'
    ],
    tags: ['essentials', 'bestseller'],
    stock: 38
  },
  {
    id: 'p6',
    name: 'Structured Overshirt',
    category: 'outerwear',
    price: 159,
    colors: ['#4A5F41', '#1A1A1A', '#D3D3D3'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/df4bdbf6f890efa7938dddedf9752acc.jpg',
      '/images/products/f341947020f9e0dda2030f83320f8853.jpg',
      '/images/products/06105729cf84798bc8f8b95168ab2f40.jpg',
    ],
    description: 'Structured overshirt with utility pockets and durable fabric.',
    details: [
      '98% cotton, 2% elastane',
      'Regular fit',
      'Machine washable',
      'Model is 6\'2" and wears size L'
    ],
    tags: ['new', 'trending'],
    stock: 24
  },
  {
    id: 'p7',
    name: 'Relaxed Linen Shirt',
    category: 'shirts',
    price: 129,
    colors: ['#FFFFFF', '#A5C8FF', '#D3D3D3'],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/1fe263e071a332b9ee32f138d701604c.jpg',
      '/images/products/284c836256c6f56c5ef635aa99bf5181.jpg',
      '/images/products/60f697ca6376520a887fbca6edd5a341.jpg',
    ],
    description: 'Breathable linen shirt with a relaxed fit, perfect for warm weather.',
    details: [
      '100% linen',
      'Relaxed fit',
      'Machine washable',
      'Model is 6\'0" and wears size M'
    ],
    tags: ['new', 'summer'],
    stock: 30
  },
  {
    id: 'p8',
    name: 'Minimal Denim Jacket',
    category: 'outerwear',
    price: 199,
    colors: ['#1A1A1A', '#4A5F41'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/75b1ab3731e1b61fcfa3f13a6a75c1ab.jpg',
      '/images/products/84f16f572d2124d3dbd621f83099c0ac.jpg',
      '/images/products/85e9a171ef21ad03147091e7bf10356c.jpg',
    ],
    description: 'Minimalist denim jacket with clean lines and subtle detailing.',
    details: [
      '100% cotton denim',
      'Regular fit',
      'Machine washable',
      'Model is 6\'1" and wears size L'
    ],
    tags: ['bestseller', 'essentials'],
    stock: 15
  },
  {
    id: 'p9',
    name: 'Relaxed Chino Pants',
    category: 'pants',
    price: 129,
    colors: ['#D3D3D3', '#1A1A1A', '#4A5F41'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    images: [
      '/images/products/1fe263e071a332b9ee32f138d701604c.jpg',
      '/images/products/284c836256c6f56c5ef635aa99bf5181.jpg',
      '/images/products/60f697ca6376520a887fbca6edd5a341.jpg',
    ],
    description: 'Relaxed fit chino pants with a comfortable waistband and clean finish.',
    details: [
      '98% cotton, 2% elastane',
      'Relaxed fit',
      'Machine washable',
      'Model is 6\'0" and wears size 32'
    ],
    tags: ['essentials', 'bestseller'],
    stock: 28
  },
  {
    id: 'p10',
    name: 'Minimal Shorts',
    category: 'shorts',
    price: 89,
    colors: ['#1A1A1A', '#D3D3D3', '#FFFFFF'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      '/images/products/75b1ab3731e1b61fcfa3f13a6a75c1ab.jpg',
      '/images/products/84f16f572d2124d3dbd621f83099c0ac.jpg',
      '/images/products/85e9a171ef21ad03147091e7bf10356c.jpg',
    ],
    description: 'Minimalist shorts with clean lines and subtle detailing.',
    details: [
      '100% cotton',
      'Regular fit',
      'Machine washable',
      'Model is 6\'1" and wears size 32'
    ],
    tags: ['new', 'summer'],
    stock: 22
  },
  {
    id: 'p11',
    name: 'Structured Polo Shirt',
    category: 'polos',
    price: 109,
    colors: ['#FFFFFF', '#1A1A1A', '#A5C8FF'],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/a192c003756bf3335c68e214af390f33.jpg',
      '/images/products/bd7fe942ccff7605b4a5d01707cf7773.jpg',
      '/images/products/df4bdbf6f890efa7938dddedf9752acc.jpg',
    ],
    description: 'Structured polo shirt with a clean finish and subtle branding.',
    details: [
      '100% cotton piqué',
      'Regular fit',
      'Machine washable',
      'Model is 6\'0" and wears size M'
    ],
    tags: ['essentials', 'bestseller'],
    stock: 35
  },
  {
    id: 'p12',
    name: 'Minimal Sweatshirt',
    category: 'sweatshirts',
    price: 129,
    colors: ['#D3D3D3', '#1A1A1A', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2X'],
    images: [
      '/images/products/a192c003756bf3335c68e214af390f33.jpg',
      '/images/products/bd7fe942ccff7605b4a5d01707cf7773.jpg',
      '/images/products/df4bdbf6f890efa7938dddedf9752acc.jpg',
    ],
    description: 'Minimalist sweatshirt with a clean finish and comfortable fit.',
    details: [
      '100% cotton fleece',
      'Regular fit',
      'Machine washable',
      'Model is 6\'1" and wears size L'
    ],
    tags: ['essentials', 'bestseller'],
    stock: 40
  }
];

export default products;

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === id) || null;
};

export const getProductsByCategory = (category) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const getProductsByTag = (tag) => {
  if (!tag) return products;
  return products.filter(product => product.tags.includes(tag));
};

export const getFilteredProducts = (filters) => {
  let filteredProducts = [...products];
  
  // Filter by category
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }
  
  // Filter by tag
  if (filters.tag) {
    filteredProducts = filteredProducts.filter(product => product.tags.includes(filters.tag));
  }
  
  // Filter by size
  if (filters.size) {
    filteredProducts = filteredProducts.filter(product => product.sizes.includes(filters.size));
  }
  
  // Filter by color
  if (filters.color) {
    filteredProducts = filteredProducts.filter(product => product.colors.includes(filters.color));
  }
  
  // Filter by price range
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);
  }
  
  // Filter by availability
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(product => product.stock > 0);
  }
  
  return filteredProducts;
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Get products in the same category
  const sameCategory = products.filter(p => p.id !== productId && p.category === product.category);
  
  // If we have enough products in the same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  // Otherwise, add products with the same tags
  let related = [...sameCategory];
  
  for (const tag of product.tags) {
    if (related.length >= limit) break;
    
    const sameTag = products.filter(
      p => p.id !== productId && 
      !related.some(r => r.id === p.id) && 
      p.tags.includes(tag)
    );
    
    related = [...related, ...sameTag];
  }
  
  // If we still don't have enough, add random products
  if (related.length < limit) {
    const remaining = products.filter(
      p => p.id !== productId && !related.some(r => r.id === p.id)
    );
    
    related = [...related, ...remaining];
  }
  
  return related.slice(0, limit);
};