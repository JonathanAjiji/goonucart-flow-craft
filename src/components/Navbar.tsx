import * as React from 'react';
import { Search, ShoppingCart, User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReferral: () => void;
  onLogout: () => void;
  userName: string;
}

export function Navbar({ cartCount, onOpenCart, onOpenReferral, onLogout, userName }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
              G
            </div>
            <span className="hidden font-bold sm:inline-block text-xl">Goonucart</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 md:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, services, campuses..."
              className="w-full pl-10 rounded-full bg-muted/50 border-none focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex font-medium text-primary hover:text-primary hover:bg-primary/5"
            onClick={onOpenReferral}
          >
            Invite & Earn
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={onOpenCart}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 border-l pl-2 md:pl-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium leading-none">{userName}</span>
              <button onClick={onLogout} className="text-[10px] text-muted-foreground hover:text-primary">Logout</button>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium border border-primary/20">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
