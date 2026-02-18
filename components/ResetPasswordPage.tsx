
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ChevronDown,
  Check,
  Circle
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center p-6 font-['Inter']">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-[#1d8cf8] text-white p-2.5 rounded-xl shadow-lg shadow-blue-200">
          <div className="bg-white/20 p-0.5 rounded-md">
             <ChevronDown size={24} className="stroke-[3px]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#1e293b] tracking-tight">OMS Admin</h1>
      </div>

      {/* Reset Password Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-3">Reset Password</h2>
        <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-10 px-4">
          Enter your new password below to regain access to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2.5">New Password</label>
            <div className="relative group">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="........"
                className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-4 pr-12 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] transition-all outline-none text-[#1e293b] placeholder:text-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2.5">Confirm New Password</label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="........"
                className="w-full bg-white border border-slate-200 rounded-xl py-3.5 px-4 pr-12 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] transition-all outline-none text-[#1e293b] placeholder:text-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Security Checklist */}
          <div className="bg-[#f8faff] rounded-xl p-5 mt-2">
            <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.1em] mb-3">Security Checklist</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] font-medium transition-colors">
                {isMinLength ? (
                  <Check size={14} className="text-emerald-500 stroke-[3px]" />
                ) : (
                  <Circle size={14} className="text-slate-300 fill-slate-300" />
                )}
                <span className={isMinLength ? 'text-slate-600' : 'text-slate-500'}>At least 8 characters long</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-medium transition-colors">
                {hasUpperAndNumber ? (
                  <Check size={14} className="text-emerald-500 stroke-[3px]" />
                ) : (
                  <Circle size={14} className="text-slate-300 fill-slate-300" />
                )}
                <span className={hasUpperAndNumber ? 'text-slate-600' : 'text-slate-500'}>One uppercase and one number</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1d8cf8] hover:bg-[#1a7cdb] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Link */}
        <button
          onClick={onBackToLogin}
          className="mt-10 inline-flex items-center justify-center gap-2 text-sm font-bold text-[#1d8cf8] hover:text-[#1a7cdb] transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Sign In
        </button>
      </div>

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
