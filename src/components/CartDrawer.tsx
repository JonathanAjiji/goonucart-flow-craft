import * as React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, CreditCard, Wallet, Truck, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const fee = subtotal > 0 ? 1.5 : 0;
  const total = subtotal + fee;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
              <span className="text-sm font-normal text-muted-foreground ml-2">({items.length} items)</span>
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground mt-2">Looks like you haven't added anything yet. Start browsing the campus market!</p>
              <Button variant="outline" className="mt-6" onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                        <button 
                          onClick={() => onRemove(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.product.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md h-8 px-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-sm text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t p-6 bg-muted/20">
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full h-12 rounded-xl group" onClick={onCheckout}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
