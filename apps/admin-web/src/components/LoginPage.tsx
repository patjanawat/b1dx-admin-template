
import React, { useState } from 'react';
import { 
  Rocket, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Circle,
  ChevronDown
} from 'lucide-react';

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-['Inter'] transition-colors duration-200">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-[#1d8cf8] text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
          <div className="bg-white/20 p-0.5 rounded-md">
             <ChevronDown size={24} className="stroke-[3px]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">OMS Admin</h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[460px] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-colors">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign In</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Enter your credentials to access your account.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1d8cf8] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1d8cf8] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........"
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-12 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#1d8cf8] focus:ring-[#1d8cf8] transition-all"
              />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
            </label>
            <button 
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-bold text-[#1d8cf8] hover:text-[#1a7cdb] transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1d8cf8] hover:bg-[#1a7cdb] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Sign In
            <LogIn size={18} />
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          Don't have an account?{' '}
          <a href="#" className="text-[#1d8cf8] font-bold hover:underline">Contact Admin</a>
        </p>
      </div>

      {/* Status Info */}
      <div className="mt-12 flex items-center gap-6 text-[11px] font-bold tracking-widest text-slate-300 dark:text-slate-700 uppercase">
        <div className="flex items-center gap-2">
          <Circle size={8} className="fill-emerald-400 text-emerald-400" />
          SERVER ONLINE
        </div>
        <div>V2.4.0-BUILD</div>
      </div>
    </div>
  );
};
