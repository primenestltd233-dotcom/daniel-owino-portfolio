import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  Mail, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from '../../lib/firebase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('danielowino233@gmail.com');
  const [password, setPassword] = useState('DanielOwino2026!');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Admin account created successfully! Logging you in...');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Authenticated as Admin!');
      }

      setTimeout(() => {
        onLoginSuccess();
        onClose();
      }, 800);
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Account not found or password incorrect. Try registering this email or check credentials.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This admin email already exists. Switching to Sign In...');
        setIsRegisterMode(false);
      } else {
        setError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess('Google Authentication Successful!');
      setTimeout(() => {
        onLoginSuccess();
        onClose();
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Google Auth failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto font-bold shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {isRegisterMode ? 'Create Admin Credentials' : 'Admin Portal Login'}
          </h3>
          <p className="text-xs text-slate-500">
            Secure CMS access for portfolio management (Daniel Owino)
          </p>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="danielowino233@gmail.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : (isRegisterMode ? 'Register & Access Admin' : 'Sign In to Dashboard')}</span>
          </button>
        </form>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or</span></div>
        </div>

        {/* Single Click Google Auth */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          type="button"
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2"
        >
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Sign In with Google</span>
        </button>

        {/* Toggle Mode */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => { setIsRegisterMode(!isRegisterMode); setError(null); }}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            {isRegisterMode ? 'Already registered? Sign In instead' : 'First time setup? Register initial Admin account'}
          </button>
        </div>

      </div>
    </div>
  );
};
