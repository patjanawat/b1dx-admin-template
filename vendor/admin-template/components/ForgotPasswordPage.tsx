
import React, { useState } from 'react';
import { 
  Mail, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send reset link would go here
    alert(`Reset link sent to: ${email}`);
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

      {/* Forgot Password Card */}
      <Card className="w-full max-w-[440px] rounded-2xl shadow-xl border-border p-2 text-center">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription className="px-4">
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 pl-12 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login Link */}
          <button
            onClick={onBackToLogin}
            className="mt-10 inline-flex items-center justify-center gap-2 text-sm font-bold text-primary hover:underline transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Sign In
          </button>
        </CardContent>
      </Card>

      {/* Footer Copyright */}
      <div className="mt-20">
        <p className="text-[13px] text-slate-400 dark:text-slate-500 font-medium">
          © 2024 OMS Admin System. All rights reserved.
        </p>
      </div>
    </div>
  );
};
