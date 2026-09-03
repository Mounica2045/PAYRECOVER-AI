import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Sparkles, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('merchant@acmecorp.com');
  const [password, setPassword] = useState('Password123!');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login({ email, password, remember });
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'Authentication failed. Please check credentials.');
        return;
      }

      if (onLoginSuccess) onLoginSuccess(res.user);
    }, 450);
  };

  const handleDemoSignIn = () => {
    setEmail('merchant@acmecorp.com');
    setPassword('Password123!');
    const res = authService.login({ email: 'merchant@acmecorp.com', password: 'Password123!', remember: true });
    if (res.success && onLoginSuccess) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>PayRecover AI Fintech OS</span>
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight">Sign In to PayRecover</h1>
          <p className="text-xs text-slate-400 font-medium">Access your merchant recovery dashboard and AI intelligence suite</p>
        </div>

        {/* Login Form Card */}
        <Card className="p-6 space-y-4 border border-indigo-900/50 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Merchant Email Address</label>
              <Input 
                type="email"
                placeholder="merchant@acmecorp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Password</label>
              <Input 
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 font-medium">
                <input 
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember session</span>
              </label>

              <span className="text-indigo-400 font-bold hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <Button 
              type="submit" 
              variant="ai" 
              size="lg" 
              disabled={isLoading}
              className="w-full font-extrabold shadow-lg flex items-center justify-center gap-2 py-3"
            >
              <span>{isLoading ? 'Authenticating Session...' : 'Sign In to Merchant OS'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Demo Sign In Action */}
          <div className="pt-3 border-t border-slate-800 text-center space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Demo Reviewer Shortcut</span>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoSignIn}
              className="w-full text-xs text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
              <span>One-Click Sign In as Acme Corp.</span>
            </Button>
          </div>
        </Card>

        {/* Security Footer Notice */}
        <div className="text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Simulation Environment • Encrypted Auth Session</span>
        </div>
      </div>
    </div>
  );
}
