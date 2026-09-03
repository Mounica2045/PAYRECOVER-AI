import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Building, Mail, ShieldCheck, Key } from 'lucide-react';
import { authService } from '../../services/authService';

export default function AccountSettingsModal({ isOpen, onClose, onSaveSuccess }) {
  const currentUser = authService.getCurrentUser();

  const [formData, setFormData] = useState({
    name: currentUser.name || 'Mounika',
    company: currentUser.company || 'Acme Corp.',
    email: currentUser.email || 'merchant@acmecorp.com',
    merchantId: currentUser.merchantId || 'acc_live_99214A',
    role: currentUser.role || 'Merchant Owner'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = authService.updateMerchantProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onSaveSuccess) onSaveSuccess(updated);
      onClose();
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Merchant Account Settings"
      subtitle="Manage business identity, contact details, and account parameters"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>✓ Merchant profile updated successfully!</span>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Merchant Status</span>
            <Badge variant="emerald">Live Merchant Account</Badge>
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">Company / Merchant Name</label>
            <Input 
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">Merchant Account ID</label>
            <Input 
              value={formData.merchantId}
              onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
              required
              className="font-mono"
            />
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">Account Owner Name</label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">Primary Email Address</label>
            <Input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="ai" className="font-extrabold shadow-sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
