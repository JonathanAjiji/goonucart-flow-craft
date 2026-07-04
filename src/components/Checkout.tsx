import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Truck, CreditCard, Wallet, Smartphone, CheckCircle2, ChevronLeft, ChevronRight, Package, Box, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types';

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
  onCancel: () => void;
}

export function Checkout({ items, onComplete, onCancel }: CheckoutProps) {
  const [step, setStep] = React.useState<'fulfillment' | 'payment' | 'confirmation'>('fulfillment');
  const [fulfillment, setFulfillment] = React.useState('meetup');
  const [payment, setPayment] = React.useState('campus_card');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const fee = 1.5;
  const total = subtotal + fee;

  const handleNext = () => {
    if (step === 'fulfillment') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  const handleBack = () => {
    if (step === 'payment') setStep('fulfillment');
    else if (step === 'confirmation') setStep('payment');
  };

  const renderFulfillment = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">How would you like to receive your items?</h3>
        <RadioGroup value={fulfillment} onValueChange={setFulfillment} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Label
            htmlFor="meetup"
            className={`flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
              fulfillment === 'meetup' ? 'border-primary' : 'border-muted'
            }`}
          >
            <RadioGroupItem value="meetup" id="meetup" className="sr-only" />
            <MapPin className="mb-3 h-6 w-6 text-primary" />
            <span className="font-semibold text-sm">Meetup</span>
            <span className="text-xs text-muted-foreground mt-1 text-center">Safe exchange location</span>
          </Label>
          <Label
            htmlFor="locker"
            className={`flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
              fulfillment === 'locker' ? 'border-primary' : 'border-muted'
            }`}
          >
            <RadioGroupItem value="locker" id="locker" className="sr-only" />
            <Box className="mb-3 h-6 w-6 text-primary" />
            <span className="font-semibold text-sm">Locker</span>
            <span className="text-xs text-muted-foreground mt-1 text-center">Contactless campus locker</span>
          </Label>
          <Label
            htmlFor="delivery"
            className={`flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
              fulfillment === 'delivery' ? 'border-primary' : 'border-muted'
            }`}
          >
            <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
            <Truck className="mb-3 h-6 w-6 text-primary" />
            <span className="font-semibold text-sm">Dorm Drop</span>
            <span className="text-xs text-muted-foreground mt-1 text-center">Delivered to your door</span>
          </Label>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Location Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Campus</Label>
            <Input defaultValue="Main Campus" readOnly />
          </div>
          <div className="space-y-2">
            <Label>{fulfillment === 'delivery' ? 'Dorm/Apt' : 'Meetup Point'}</Label>
            <Input placeholder={fulfillment === 'delivery' ? 'Building name, Room #' : 'Student Union, Starbucks, etc.'} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPayment = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
          <Label
            htmlFor="campus_card"
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              payment === 'campus_card' ? 'border-primary bg-primary/5' : 'border-muted bg-background'
            }`}
          >
            <div className="flex items-center gap-4">
              <RadioGroupItem value="campus_card" id="campus_card" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Campus ID Card</p>
                  <p className="text-xs text-muted-foreground">Balance: $450.00</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] font-bold">FAST</Badge>
          </Label>

          <Label
            htmlFor="p2p"
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              payment === 'p2p' ? 'border-primary bg-primary/5' : 'border-muted bg-background'
            }`}
          >
            <div className="flex items-center gap-4">
              <RadioGroupItem value="p2p" id="p2p" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Peer-to-Peer App</p>
                  <p className="text-xs text-muted-foreground">Venmo, Zelle, CashApp</p>
                </div>
              </div>
            </div>
          </Label>

          <Label
            htmlFor="card"
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              payment === 'card' ? 'border-primary bg-primary/5' : 'border-muted bg-background'
            }`}
          >
            <div className="flex items-center gap-4">
              <RadioGroupItem value="card" id="card" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Credit / Debit Card</p>
                  <p className="text-xs text-muted-foreground">Ending in 4242</p>
                </div>
              </div>
            </div>
          </Label>
        </RadioGroup>
      </div>
    </motion.div>
  );

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-background"
          >
            <Package className="h-4 w-4" />
          </motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-muted-foreground mb-8">
        Your order <span className="font-mono font-bold text-primary">#GNC-88219</span> has been placed successfully.
      </p>

      <div className="bg-muted/30 border rounded-2xl p-6 text-left space-y-4 max-w-sm mx-auto mb-8">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Security Code</span>
          <span className="text-xl font-mono font-bold tracking-widest bg-white px-3 py-1 rounded-lg border">77-BD-02</span>
        </div>
        <Separator />
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.quantity}x {item.product.name}</span>
              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total Paid</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button onClick={onComplete} className="w-full max-w-sm rounded-xl">
        View My Orders
      </Button>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-none">
        <CardHeader className="border-b bg-muted/20 px-6 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Secure Checkout</CardTitle>
            {step !== 'confirmation' && (
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-1.5 w-12 rounded-full ${step === 'fulfillment' ? 'bg-primary' : 'bg-primary/40'}`} />
                <div className={`h-1.5 w-12 rounded-full ${step === 'payment' ? 'bg-primary' : 'bg-muted'}`} />
                <div className="h-1.5 w-12 rounded-full bg-muted" />
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {step === 'fulfillment' && renderFulfillment()}
                {step === 'payment' && renderPayment()}
                {step === 'confirmation' && renderConfirmation()}
              </AnimatePresence>
            </div>

            {step !== 'confirmation' && (
              <div className="w-full md:w-64 space-y-4">
                <div className="bg-muted/30 p-4 rounded-xl space-y-3">
                  <h4 className="font-bold text-sm">Summary</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Items ({items.length})</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Fee</span>
                      <span>${fee.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full rounded-xl" onClick={handleNext}>
                    {step === 'fulfillment' ? 'Next: Payment' : 'Confirm Order'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  {step !== 'fulfillment' && (
                    <Button variant="ghost" className="w-full text-xs" onClick={handleBack}>
                      <ChevronLeft className="mr-1 h-3 w-3" /> Back
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
