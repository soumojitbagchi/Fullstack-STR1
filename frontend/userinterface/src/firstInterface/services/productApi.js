import productJacket from '../../assets/product_jacket.png';
import productSneakers from '../../assets/product_sneakers.png';
import productTshirt from '../../assets/product_tshirt.png';
import productCargo from '../../assets/product_cargo.png';
import productVisor from '../../assets/product_visor.png';
import productHoodie from '../../assets/product_hoodie.png';

const mockProducts = [
  {
    id: 1,
    name: 'Neon Cyber Jacket',
    price: 129.99,
    originalPrice: 179.99,
    category: 'outerwear',
    description: 'Glow in the dark cyberpunk inspired jacket with reflective neon green trim. Water-resistant outer shell with breathable inner lining.',
    image: productJacket,
    stock: 12,
    hasDiscount: true
  },
  {
    id: 2,
    name: 'Holo Sneakers',
    price: 89.99,
    originalPrice: 89.99,
    category: 'shoes',
    description: 'Holographic sneakers with comfortable memory foam soles. Iridescent finish shifts color as you move.',
    image: productSneakers,
    stock: 25,
    hasDiscount: false
  },
  {
    id: 3,
    name: 'Void T-Shirt',
    price: 34.99,
    originalPrice: 49.99,
    category: 'tops',
    description: 'Ultra-black t-shirt made from premium cotton blend. Minimal design for maximum impact.',
    image: productTshirt,
    stock: 0,
    hasDiscount: true
  },
  {
    id: 4,
    name: 'Quantum Cargo Pants',
    price: 79.99,
    originalPrice: 79.99,
    category: 'bottoms',
    description: 'Tactical cargo pants with 8 utility pockets. Durable ripstop fabric with stretch comfort fit.',
    image: productCargo,
    stock: 7,
    hasDiscount: false
  },
  {
    id: 5,
    name: 'Neon Visor',
    price: 45.00,
    originalPrice: 60.00,
    category: 'accessories',
    description: 'Futuristic LED visor with adjustable strap. UV protection with built-in tint control.',
    image: productVisor,
    stock: 3,
    hasDiscount: true
  },
  {
    id: 6,
    name: 'Stealth Hoodie',
    price: 95.00,
    originalPrice: 95.00,
    category: 'outerwear',
    description: 'Matte black hoodie with hidden zip pockets. Heavyweight fleece for all-season comfort.',
    image: productHoodie,
    stock: 18,
    hasDiscount: false
  },
];

export const fetchCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return ['outerwear', 'shoes', 'tops', 'bottoms', 'accessories'];
};

export const fetchAllProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const fetchProductsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockProducts.filter(p => p.category === category);
};
