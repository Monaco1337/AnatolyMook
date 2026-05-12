/**
 * Optionaler fester Login nur für lokale Entwicklung (npm run dev).
 * Aktivieren: VITE_LOCAL_ADMIN_LOGIN=true in .env oder .env.local
 * Niemals in Production-Builds nutzen (import.meta.env.DEV ist dort false).
 */
const STORAGE_KEY = '__dev_admin_session';

export function isLocalDevAdminLoginEnabled(): boolean {
  return import.meta.env.DEV === true && import.meta.env.VITE_LOCAL_ADMIN_LOGIN === 'true';
}

export function getLocalDevAdminCredentials(): { email: string; password: string } {
  return {
    email: (import.meta.env.VITE_LOCAL_ADMIN_EMAIL as string) || 'admin@anatoly-mook.de',
    password: (import.meta.env.VITE_LOCAL_ADMIN_PASSWORD as string) || 'admin123',
  };
}

export function setLocalDevAdminLoggedIn(): void {
  sessionStorage.setItem(STORAGE_KEY, '1');
}

export function clearLocalDevAdminLoggedIn(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isLocalDevAdminLoggedIn(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}
