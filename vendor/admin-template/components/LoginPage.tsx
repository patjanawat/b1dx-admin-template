
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Circle,
  Rocket
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface LoginPageProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans transition-colors duration-200">
      {/* Brand Logo & Title */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-xl shadow-primary/20 mb-4">
          <Rocket size={32} className="fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">OMS Admin</h1>
        <p className="text-sm text-muted-foreground font-medium">Order Management System</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-[440px] rounded-3xl shadow-2xl border-border/40 p-4 md:p-6">
        <CardHeader className="space-y-2 pb-8">
          <CardTitle className="text-4xl font-extrabold tracking-tight">Sign In</CardTitle>
          <CardDescription className="text-lg text-muted-foreground/80">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-bold text-foreground/70">Email</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="h-14 pl-12 rounded-2xl border-border/60 bg-background/50 focus:bg-background transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-bold text-foreground/70">Password</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="........"
                  className="h-14 pl-12 pr-12 rounded-2xl border-border/60 bg-background/50 focus:bg-background transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox id="remember" className="rounded-md w-5 h-5" />
                <Label htmlFor="remember" className="text-sm font-semibold text-muted-foreground cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button 
                type="button"
                onClick={onForgotPassword}
                className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              Sign In
              <LogIn size={22} />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground font-semibold">
          Don't have an account?{' '}
          <button className="text-primary font-bold hover:underline">Contact Admin</button>
        </p>
      </div>

      {/* Status Info */}
      <div className="mt-16 flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-muted-foreground/40 uppercase">
        <div className="flex items-center gap-2.5">
          <Circle size={8} className="fill-emerald-500 text-emerald-500" />
          SERVER ONLINE
        </div>
        <div>V2.4.0-BUILD</div>
      </div>
    </div>
  );
};
