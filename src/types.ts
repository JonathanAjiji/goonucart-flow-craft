export type Category = 'Electronics' | 'Books' | 'Furniture' | 'Services' | 'Transportation' | 'Other';
export type Condition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
export type Campus = 'Main Campus' | 'North Campus' | 'South Campus' | 'West Campus';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  condition?: Condition;
  location: Campus;
  type: 'Item' | 'Service';
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  mfaEnabled: boolean;
  referralCode: string;
  referralCount: number;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  status: 'Claimed' | 'Pending';
  code?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
