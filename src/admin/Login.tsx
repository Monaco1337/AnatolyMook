import { useState } from 'react';
import { Lock, ChevronsRight, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  getLocalDevAdminCredentials,
  isLocalDevAdminLoginEnabled,
  setLocalDevAdminLoggedIn,
} from '../lib/adminSession';

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
      if (isLocalDevAdminLoginEnabled()) {
        const { email: devEmail, password: devPassword } = getLocalDevAdminCredentials();
        if (email.trim().toLowerCase() === devEmail.toLowerCase() && password === devPassword) {
          setLocalDevAdminLoggedIn();
          setIsLoading(false);
          onLogin();
          return;
        }
      }

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
        setIsLoading(false);
        onLogin();
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ein Fehler ist aufgetreten');
      setIsLoading(false);
    }
  };

  const inputBase =
    'w-full px-5 py-4 rounded-[14px] text-[16px] transition-all duration-300 outline-none ' +
    'bg-[rgba(14,12,10,0.55)] border text-[rgba(248,243,232,0.92)] placeholder-[rgba(238,230,216,0.38)] ' +
    'focus:border-[rgba(214,168,94,0.45)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.12)]';

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Stein — wie Footer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 85% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(50% 45% at 50% 28%, rgba(214,168,94,0.06) 0%, rgba(0,0,0,0) 62%)',
        }}
      />

      <div className="relative z-[1] w-full max-w-[420px]">
        {/* Obere Linie — dezenter Bronze-Akzent */}
        <div
          className="mx-auto mb-10 h-px w-24"
          aria-hidden
          style={{
            background:
              'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.35) 50%, rgba(214,168,94,0) 100%)',
          }}
        />

        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div
              className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px]"
              style={{
                background: 'linear-gradient(165deg, rgba(36,28,22,0.85) 0%, rgba(12,10,8,0.92) 100%)',
                border: '1px solid rgba(214,168,94,0.22)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <Lock className="text-[#C99B62]" size={30} strokeWidth={1.35} aria-hidden />
            </div>
          </div>

          <h1
            className="mb-3 text-[clamp(2rem,5vw,2.75rem)] font-extralight tracking-[0.18em] uppercase"
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
              color: '#B98452',
              textShadow: '0 1px 0 rgba(20,12,6,0.5), 0 0 1px rgba(201,155,98,0.25)',
            }}
          >
            Admin Portal
          </h1>
          <p
            className="text-[15px] font-light leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(244,239,230,0.58)',
            }}
          >
            Melden Sie sich an, um fortzufahren
          </p>
          {isLocalDevAdminLoginEnabled() && (
            <p
              className="mt-4 text-[12px] font-medium tracking-wide"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(214,168,94,0.55)',
              }}
            >
              Lokaler Test-Login aktiv
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[20px] p-8 sm:p-9"
          style={{
            background: 'linear-gradient(180deg, rgba(18,16,14,0.72) 0%, rgba(8,7,6,0.78) 100%)',
            border: '1px solid rgba(214,168,94,0.12)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="E-Mail"
              autoComplete="email"
              className={`${inputBase} border-[rgba(214,168,94,0.14)]`}
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
                autoComplete="current-password"
                className={`${inputBase} pr-12 ${
                  error
                    ? 'border-[rgba(220,90,70,0.45)] bg-[rgba(40,14,12,0.35)]'
                    : isFocused
                      ? 'border-[rgba(214,168,94,0.38)]'
                      : 'border-[rgba(214,168,94,0.14)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[10px] text-[rgba(238,230,216,0.45)] transition-colors duration-200 hover:bg-[rgba(214,168,94,0.08)] hover:text-[rgba(214,168,94,0.8)]"
                tabIndex={-1}
                aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
              </button>
            </div>
            {error && (
              <p
                className="mt-3 text-[13px] font-medium"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(248, 180, 168, 0.92)',
                }}
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password || !email}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] py-4 text-[16px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
            style={{
              fontFamily: "'Inter', sans-serif",
              background:
                'linear-gradient(180deg, rgba(214,168,94,0.95) 0%, rgba(166,116,60,0.92) 48%, rgba(120,78,40,0.95) 100%)',
              color: 'rgba(12, 8, 6, 0.92)',
              border: '1px solid rgba(255,230,200,0.22)',
              boxShadow: '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            {isLoading ? (
              <>
                <div
                  className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                  style={{ borderColor: 'rgba(12,8,6,0.25)', borderTopColor: 'rgba(12,8,6,0.85)' }}
                />
                <span>Anmelden…</span>
              </>
            ) : (
              <>
                <span>Anmelden</span>
                <ChevronsRight size={18} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p
            className="mb-5 text-[12px] font-medium uppercase tracking-[0.22em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(238,230,216,0.35)',
            }}
          >
            Geschützter Bereich
          </p>
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-[rgba(214,168,94,0.55)] transition-colors duration-300 hover:text-[rgba(244,239,230,0.88)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            <span>Zurück zur Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
