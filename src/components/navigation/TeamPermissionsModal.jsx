import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Users, ShieldCheck, UserPlus, Mail } from 'lucide-react';
import { authService } from '../../services/authService';

export default function TeamPermissionsModal({ isOpen, onClose }) {
  const currentUser = authService.getCurrentUser();
  const [teamMembers, setTeamMembers] = useState(currentUser.team || [
    { id: "T1", name: "Mounika", email: "merchant@acmecorp.com", role: "Owner", status: "Active" },
    { id: "T2", name: "Rahul Sharma", email: "rahul@acmecorp.com", role: "Finance Admin", status: "Active" },
    { id: "T3", name: "Priya Reddy", email: "priya@acmecorp.com", role: "Analyst", status: "Active" }
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Analyst');
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember = {
      id: `T${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Active"
    };
    setTeamMembers(prev => [...prev, newMember]);
    setInviteEmail('');
    setShowInviteForm(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Team & Permissions"
      subtitle="Manage organization access levels, team roles, and merchant permissions"
    >
      <div className="space-y-4 text-xs font-medium">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Active Team Members ({teamMembers.length})</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="text-[11px]"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1" />
            <span>Invite Member</span>
          </Button>
        </div>

        {showInviteForm && (
          <form onSubmit={handleAddMember} className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2.5">
            <h5 className="font-extrabold text-indigo-900 text-xs">Invite Team Member</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <Input 
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="ai" size="sm" className="font-bold">
                Send Invite
              </Button>
            </div>
          </form>
        )}

        <div className="overflow-hidden border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {teamMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{m.name}</td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{m.email}</td>
                  <td className="py-2.5 px-3">
                    <Badge variant={m.role === 'Owner' ? 'indigo' : 'slate'}>{m.role}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge variant="emerald">{m.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
