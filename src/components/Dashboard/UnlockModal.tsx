import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Zap, QrCode, CreditCard, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PremiumTemplate } from '../../types';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate?: PremiumTemplate | null;
  onUnlockSuccess: () => void;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  onUnlockSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsUnlocked(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti trigger', e);
      }

      onUnlockSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#0d1424] border border-cyan-500/40 rounded-2xl shadow-glow-cyan overflow-hidden relative">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isUnlocked ? 'Templates Unlocked! 🎉' : 'Unlock Premium Templates'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Student Special • Lifetime Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isUnlocked ? (
            <div className="space-y-5">
              
              {/* Product Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">
                    {selectedTemplate ? selectedTemplate.name : 'All 3 Premium GitFolio Templates'}
                  </span>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-xs text-slate-500 line-through">₹499</span>
                    <span className="text-lg font-bold text-emerald-400">₹99</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Includes full source code (React + Tailwind + HTML), custom domain setup guide, and 1-click GitHub Pages deployment.
                </p>

                {/* Coupon Pill */}
                <div className="mt-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs">
                  <span className="text-cyan-300 font-mono">Coupon: CAMPUS2025</span>
                  <span className="text-emerald-400 font-medium">₹400 OFF Applied</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-glow-subtle'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span>UPI / QR (GPay, PhonePe)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-glow-subtle'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span>Card / Net Banking</span>
                  </button>
                </div>
              </div>

              {/* UPI Mock Preview */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=gitfoliomaker@upi&pn=GitFolio&am=99.00&cu=INR"
                      alt="UPI QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-white">Scan with any UPI App</p>
                    <p className="text-slate-400 font-mono text-[11px]">UPI ID: gitfolio.pay@upi</p>
                    <p className="text-emerald-400 text-[10px]">Instant verification via Razorpay / Cashfree mock</p>
                  </div>
                </div>
              )}

              {/* Guarantee */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Student Satisfaction Guaranteed • Instant code download</span>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-glow-cyan flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Payment of ₹99...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Simulate Payment & Unlock Now (₹99)</span>
                  </>
                )}
              </button>

            </div>
          ) : (
            /* Unlocked state */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-xl font-bold text-white">Payment Successful!</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                All premium templates (Retro Terminal CLI, Silicon Valley 3D Glass, Minimalist Notion) have been unlocked for your account.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-glow-emerald"
                >
                  View Unlocked Templates
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
