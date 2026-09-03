import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Sparkles, ShieldCheck, Mail, ArrowRight, AlertCircle, RefreshCw, Key, CheckCircle2, ArrowLeft } from 'lucide-react';
import { otpService } from '../services/otpService';

export default function Login({ onLoginSuccess }) {
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP
  const [email, setEmail] = useState('merchant@acmecorp.com');
  const [otpCode, setOtpCode] = useState('');
  
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugOtp, setDebugOtp] = useState('');

  // Resend Cooldown Timer
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = otpService.sendOtp(email);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'Failed to send verification code.');
        if (res.cooldownRemaining) setCooldown(res.cooldownRemaining);
        return;
      }

      setDebugOtp(res.debugCode);
      setInfoMessage(res.message);
      setCooldown(res.cooldownSeconds || 30);
      setStep(2);
    }, 400);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = otpService.verifyOtp(email, otpCode);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'OTP verification failed.');
        return;
      }

      // Success! Pass authenticated user up
      if (onLoginSuccess) onLoginSuccess(res.user);
    }, 400);
  };

  // Demo Email Shortcut Click
  const handleDemoSelect = (selectedEmail) => {
    setEmail(selectedEmail);
    setError('');
    setInfoMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = otpService.sendOtp(selectedEmail);
      setIsLoading(false);
      if (res.success) {
        setDebugOtp(res.debugCode);
        setOtpCode(res.debugCode); // Auto fill OTP for fast demo review
        setInfoMessage(res.message);
        setCooldown(30);
        setStep(2);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>PayRecover AI • Passwordless Auth</span>
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight">
            {step === 1 ? 'Sign In to PayRecover' : 'Check Your Inbox'}
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {step === 1 
              ? 'Enter your email address to receive a secure 6-digit verification code' 
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="p-6 space-y-4 border border-indigo-900/50 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && step === 2 && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* STEP 1: EMAIL INPUT */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Merchant Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <Input 
                    type="email"
                    placeholder="merchant@acmecorp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 pl-9 focus:border-indigo-500"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="ai" 
                size="lg" 
                disabled={isLoading}
                className="w-full font-extrabold shadow-lg flex items-center justify-center gap-2 py-3"
              >
                <span>{isLoading ? 'Sending Verification Code...' : 'Send Verification Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          {/* STEP 2: OTP CODE INPUT */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-medium">
              {/* Sandbox Debug OTP Callout (Requirements #5 & #6) */}
              {debugOtp && (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-indigo-400" />
                    <span>Demo Reviewer Code: <strong className="font-mono text-indigo-300 text-sm tracking-widest">{debugOtp}</strong></span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setOtpCode(debugOtp)} 
                    className="text-[10px] text-indigo-400 underline font-bold hover:text-indigo-300"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold block">Enter 6-Digit Code</label>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(''); setInfoMessage(''); }}
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Change Email</span>
                  </button>
                </div>

                <Input 
                  type="text"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 font-mono text-center text-lg tracking-[0.5em] focus:border-indigo-500"
                />
              </div>

              <Button 
                type="submit" 
                variant="ai" 
                size="lg" 
                disabled={isLoading || otpCode.length < 6}
                className="w-full font-extrabold shadow-lg flex items-center justify-center gap-2 py-3"
              >
                <span>{isLoading ? 'Verifying Code...' : 'Verify Code & Sign In'}</span>
                <ShieldCheck className="w-4 h-4" />
              </Button>

              {/* Resend OTP Cooldown (Requirement #19) */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  disabled={cooldown > 0 || isLoading}
                  onClick={handleSendOtp}
                  className={`text-xs font-semibold flex items-center justify-center gap-1.5 mx-auto ${
                    cooldown > 0 ? 'text-slate-500 cursor-not-allowed' : 'text-indigo-400 hover:underline'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${cooldown > 0 ? 'animate-spin' : ''}`} />
                  <span>
                    {cooldown > 0 ? `Resend code available in ${cooldown}s` : "Didn't receive code? Resend OTP"}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Accounts Shortcut */}
          <div className="pt-3 border-t border-slate-800 text-center space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Demo Reviewer Accounts</span>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoSelect('merchant@acmecorp.com')}
                className="text-[11px] text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10 truncate"
              >
                Acme Corp.
              </Button>

              <Button 
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoSelect('apex@merchants.com')}
                className="text-[11px] text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10 truncate"
              >
                Apex Retail
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer Security Notice */}
        <div className="text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Passwordless Auth Engine • 5-Min OTP Expiration</span>
        </div>
      </div>
    </div>
  );
}
