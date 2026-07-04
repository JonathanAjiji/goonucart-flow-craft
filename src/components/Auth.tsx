import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, Mail, Lock, User, Upload, Github, Chrome, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthProps {
  onAuthComplete: () => void;
}

export function Auth({ onAuthComplete }: AuthProps) {
  const [step, setStep] = React.useState<'auth' | 'verify' | 'mfa' | 'success'>('auth');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith('.edu')) {
      toast.error('Please use a valid .edu student email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
      toast.success('Verification required');
    }, 1500);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('mfa');
      toast.success('Identity confirmed');
    }, 1500);
  };

  const handleMFA = (value: string) => {
    if (value.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('success');
      }, 1000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'auth':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Student Email (.edu)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="yourname@university.edu"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Student Email (.edu)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="yourname@university.edu"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password-signup" type="password" className="pl-10" required />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Strength: <span className="text-green-500 font-medium">Strong</span>
                      <div className="h-1 w-full bg-muted rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-green-500 w-3/4" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with campus login</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Chrome className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>
            </div>
          </motion.div>
        );
      case 'verify':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary mb-2" />
              <h2 className="text-xl font-semibold">Student Verification</h2>
              <p className="text-sm text-muted-foreground">Please upload your student ID to verify your status</p>
            </div>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm">Drag and drop or click to upload ID</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
            <Button onClick={handleVerify} className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Submit for Review'}
            </Button>
          </motion.div>
        );
      case 'mfa':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
            </div>
            <div className="flex justify-center">
              <InputOTP maxLength={6} onComplete={handleMFA}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-xs text-muted-foreground">
              Didn't receive the code? <button className="text-primary hover:underline">Resend</button>
            </p>
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <div>
              <h2 className="text-2xl font-bold">Welcome to Goonucart!</h2>
              <p className="text-muted-foreground mt-2">Your account has been verified and secured.</p>
            </div>
            <Button onClick={onAuthComplete} className="w-full group">
              Go to Marketplace <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-inner">
              G
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Goonucart</CardTitle>
          <CardDescription>The ultimate campus marketplace for students</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </CardContent>
        {step === 'auth' && (
          <CardFooter className="justify-center pt-0 pb-6 text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
