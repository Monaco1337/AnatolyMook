import { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Falsche Anmeldedaten');
        setIsLoading(false);
        return;
      }

      if (data.session) {
        onLogin();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ein Fehler ist aufgetreten');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[400px] w-full relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center justify-center mb-10">
            <div className="absolute inset-0 bg-blue-500/10 rounded-[24px] blur-xl" />
            <div className="relative w-20 h-20 rounded-[20px] bg-white border border-gray-200/50 shadow-xl flex items-center justify-center">
              <Lock className="text-gray-900" size={36} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-[48px] font-semibold text-gray-900 mb-2 tracking-[-0.03em] leading-none">
            Admin Portal
          </h1>
          <p className="text-[15px] text-gray-500 font-normal">
            Melden Sie sich an, um fortzufahren
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="E-Mail"
              className="w-full px-5 py-4 rounded-[16px] bg-white border border-gray-200/80 text-gray-900 placeholder-gray-400 text-[17px] focus:outline-none focus:border-blue-500/60 focus:shadow-lg focus:shadow-blue-500/5 transition-all duration-300"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Passwort"
                className={`w-full px-5 py-4 rounded-[16px] bg-white border ${
                  error
                    ? 'border-red-500/40 bg-red-50/30'
                    : isFocused
                      ? 'border-blue-500/60 shadow-lg shadow-blue-500/5'
                      : 'border-gray-200/80'
                } text-gray-900 placeholder-gray-400 text-[17px] focus:outline-none transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 flex items-center justify-center"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={2} />
                ) : (
                  <Eye size={18} strokeWidth={2} />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-red-600 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 duration-300">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password || !email}
            className="w-full py-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-[16px] text-[17px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Anmelden...</span>
              </>
            ) : (
              <>
                <span>Anmelden</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-[13px] font-medium mb-5">
            Geschützter Bereich
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-[15px] font-medium transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            <span>Zurück zur Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
