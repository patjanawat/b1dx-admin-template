
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Calendar, 
  MapPin, 
  Edit2, 
  RefreshCw,
  Camera
} from 'lucide-react';
import { Button } from './ui/Button';

interface UserProfilePageProps {
  onCancel: () => void;
  onSave: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onCancel, onSave }) => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const Toggle = ({ enabled, setEnabled }: { enabled: boolean, setEnabled: (v: boolean) => void }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? 'bg-[#1d8cf8]' : 'bg-slate-200 dark:bg-slate-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-[800px] mx-auto pb-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces"
            alt="Alex Rivera"
            className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white dark:border-slate-800"
          />
          <button className="absolute -bottom-2 -right-2 bg-[#1d8cf8] text-white p-2 rounded-lg shadow-lg border-2 border-white dark:border-slate-800 hover:bg-[#1a7cdb] transition-colors">
            <Edit2 size={16} />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alex Rivera</h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[#1d8cf8] dark:text-blue-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
              Warehouse Lead
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Manage your personal details, security settings, and notifications.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-slate-400 dark:text-slate-500 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Member since Oct 2023
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              Main Warehouse, CA
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Personal Information */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <User size={18} className="text-[#1d8cf8]" />
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Full Name</label>
              <input 
                type="text" 
                defaultValue="Alex Rivera"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] outline-none transition-all dark:text-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Email Address</label>
              <input 
                type="email" 
                defaultValue="alex.rivera@oms-admin.com"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] outline-none transition-all dark:text-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Phone Number</label>
              <input 
                type="text" 
                defaultValue="+1 (555) 012-3456"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-[#1d8cf8] outline-none transition-all dark:text-slate-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Department</label>
              <input 
                type="text" 
                defaultValue="Logistics & Fulfillment"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-[#1d8cf8]" />
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight">Security</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Password</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 3 months ago. We recommend updating it regularly.</p>
            </div>
            <Button variant="outline" className="text-[#1d8cf8] border-[#1d8cf8] hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold gap-2">
              <RefreshCw size={14} />
              Change Password
            </Button>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Bell size={18} className="text-[#1d8cf8]" />
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Email Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts about inventory levels and order status changes via email.</p>
              </div>
              <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Push Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive real-time browser notifications for critical system alerts.</p>
              </div>
              <Toggle enabled={pushNotif} setEnabled={setPushNotif} />
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-10 flex items-center justify-end gap-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={onCancel}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="bg-[#1d8cf8] hover:bg-[#1a7cdb] text-white font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
