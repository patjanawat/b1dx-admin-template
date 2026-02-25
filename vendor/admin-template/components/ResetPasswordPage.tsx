
import React, { useState } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ChevronDown,
  Check,
  Circle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface ResetPasswordPageProps {
  onBackToLogin: () => void;
  onResetSuccess: () => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onBackToLogin, onResetSuccess }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simple validation for the checklist
  const isMinLength = newPassword.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!isMinLength || !hasUpperAndNumber) {
      alert("Please satisfy the security checklist.");
      return;
    }
    // Logic to reset password would go here
    onResetSuccess();
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

      {/* Reset Password Card */}
      <Card className="w-full max-w-[440px] rounded-2xl shadow-xl border-border p-2 text-center">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription className="px-4">
            Enter your new password below to regain access to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* New Password Field */}
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative group">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="........"
                  className="h-12 pr-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative group">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="........"
                  className="h-12 pr-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Security Checklist */}
            <div className="bg-muted/50 rounded-xl p-5 mt-2 transition-colors">
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-3">Security Checklist</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[13px] font-medium transition-colors">
                  {isMinLength ? (
                    <Check size={14} className="text-emerald-500 stroke-[3px]" />
                  ) : (
                    <Circle size={14} className="text-muted-foreground/30 fill-muted-foreground/30" />
                  )}
                  <span className={isMinLength ? 'text-foreground' : 'text-muted-foreground'}>At least 8 characters long</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] font-medium transition-colors">
                  {hasUpperAndNumber ? (
                    <Check size={14} className="text-emerald-500 stroke-[3px]" />
                  ) : (
                    <Circle size={14} className="text-muted-foreground/30 fill-muted-foreground/30" />
                  )}
                  <span className={hasUpperAndNumber ? 'text-foreground' : 'text-muted-foreground'}>One uppercase and one number</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 mt-4"
            >
              Reset Password
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
      <div className="mt-16 text-center">
        <p className="text-[13px] text-slate-400 font-medium mb-3">
          © 2024 OMS Admin System. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-6 text-[12px] font-medium text-slate-400">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
          <a href="#" className="hover:text-slate-600">Support</a>
        </div>
      </div>
    </div>
  );
};
