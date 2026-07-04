import * as React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Auth } from '@/components/Auth';
import { Navbar } from '@/components/Navbar';
import { Marketplace } from '@/components/Marketplace';
import { CartDrawer } from '@/components/CartDrawer';
import { Checkout } from '@/components/Checkout';
import { ReferralHub } from '@/components/ReferralHub';
import { MOCK_USER } from '@/mockData';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [view, setView] = React.useState<'marketplace' | 'referral'>('marketplace');
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    toast.error('Item removed from cart');
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    toast.success('Your order has been placed! Check your orders for updates.');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Auth onAuthComplete={() => setIsAuthenticated(true)} />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReferral={() => setView('referral')}
        onLogout={() => setIsAuthenticated(false)}
        userName={MOCK_USER.name}
      />

      <main className="min-h-[calc(100-4rem)]">
        {view === 'marketplace' ? (
          <Marketplace onAddToCart={handleAddToCart} />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="container mx-auto px-4 py-4">
              <button 
                onClick={() => setView('marketplace')}
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
              >
                ← Back to Marketplace
              </button>
            </div>
            <ReferralHub user={MOCK_USER} />
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {isCheckoutOpen && (
        <Checkout 
          items={cart}
          onComplete={handleCheckoutComplete}
          onCancel={() => setIsCheckoutOpen(false)}
        />
      )}

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              G
            </div>
            <span className="font-bold text-lg">Goonucart</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2023 Goonucart Marketplace. Built for students, by students.</p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Safety Tips</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Community Guidelines</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Campus Ambassadors</a>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" closeButton />
    </div>
  );
}

export default App;
