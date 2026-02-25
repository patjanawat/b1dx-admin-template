
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
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';

interface UserProfilePageProps {
  onCancel: () => void;
  onSave: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onCancel, onSave }) => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className="max-w-[800px] mx-auto pb-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces"
            alt="Alex Rivera"
            className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-background"
          />
          <button className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-lg shadow-lg border-2 border-background hover:bg-primary/90 transition-colors">
            <Edit2 size={16} />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">Alex Rivera</h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider">
              Warehouse Lead
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Manage your personal details, security settings, and notifications.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground/60 text-xs font-medium">
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
            <User size={18} className="text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                type="text" 
                defaultValue="Alex Rivera"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                type="email" 
                defaultValue="alex.rivera@oms-admin.com"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input 
                type="text" 
                defaultValue="+1 (555) 012-3456"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input 
                type="text" 
                defaultValue="Logistics & Fulfillment"
                className="h-12 rounded-xl bg-muted cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Security</h2>
          </div>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground mb-1">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago. We recommend updating it regularly.</p>
              </div>
              <Button variant="outline" className="font-bold gap-2">
                <RefreshCw size={14} />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Bell size={18} className="text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts about inventory levels and order status changes via email.</p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive real-time browser notifications for critical system alerts.</p>
                </div>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-10 flex items-center justify-end gap-6 border-t border-border">
          <button 
            onClick={onCancel}
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <Button 
            onClick={onSave}
            className="h-12 px-10 rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
