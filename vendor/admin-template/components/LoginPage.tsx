
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Circle,
  ChevronDown
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
    // In a real app, validation would go here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans transition-colors duration-200">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-primary text-primary-foreground p-2.5 rounded-xl shadow-lg shadow-primary/20">
          <div className="bg-white/20 p-0.5 rounded-md">
             <ChevronDown size={24} className="stroke-[3px]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">OMS Admin</h1>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-[460px] rounded-2xl shadow-xl border-border p-2">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="h-12 pl-12 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="........"
                  className="h-12 pl-12 pr-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-medium text-muted-foreground cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button 
                type="button"
                onClick={onForgotPassword}
                className="text-sm font-bold text-primary hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Sign In
              <LogIn size={18} />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          Don't have an account?{' '}
          <a href="#" className="text-[#1d8cf8] font-bold hover:underline">Contact Admin</a>
        </p>
      </div>

      {/* Status Info */}
      <div className="mt-12 flex items-center gap-6 text-[11px] font-bold tracking-widest text-muted-foreground/30 uppercase">
        <div className="flex items-center gap-2">
          <Circle size={8} className="fill-emerald-400 text-emerald-400" />
          SERVER ONLINE
        </div>
        <div>V2.4.0-BUILD</div>
      </div>
    </div>
  );
};
