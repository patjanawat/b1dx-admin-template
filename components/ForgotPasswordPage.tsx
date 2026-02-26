
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
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-xl shadow-primary/20 mb-4">
          <ChevronDown size={32} className="stroke-[4px]" />
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">OMS Admin</h1>
      </div>

      {/* Forgot Password Card */}
      <Card className="w-full max-w-[440px] rounded-3xl shadow-2xl border-border/40 p-4 md:p-6 text-center">
        <CardHeader className="space-y-2 pb-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Forgot Password?</CardTitle>
          <CardDescription className="text-base text-muted-foreground/80 px-4">
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-bold text-foreground/70">Email Address</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-14 pl-12 rounded-2xl border-border/60 bg-background/50 focus:bg-background transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-transform active:scale-[0.98]"
            >
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login Link */}
          <button
            onClick={onBackToLogin}
            className="mt-10 inline-flex items-center justify-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Back to Sign In
          </button>
        </CardContent>
      </Card>

      {/* Footer Copyright */}
      <div className="mt-16">
        <p className="text-[13px] text-muted-foreground/60 font-medium">
          © 2024 OMS Admin System. All rights reserved.
        </p>
      </div>
    </div>
  );
};
