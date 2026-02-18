
import React, { useState } from 'react';
import { 
  Rocket, 
  Mail, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

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

      {/* Forgot Password Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-3">Forgot Password?</h2>
        <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-10 px-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-[#64748b] mb-2.5">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#f8faff] border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] transition-all outline-none text-[#1e293b] placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1d8cf8] hover:bg-[#1a7cdb] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Send Reset Link
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
      <div className="mt-20">
        <p className="text-[13px] text-slate-400 font-medium">
          © 2024 OMS Admin System. All rights reserved.
        </p>
      </div>
    </div>
  );
};
