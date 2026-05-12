/**
 * Legt einen Supabase-Auth-User für das Admin-Panel an.
 *
 * Voraussetzung in .env (Projektroot):
 *   VITE_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...   (Dashboard → Settings → API → service_role, geheim!)
 *
 * Optional:
 *   ADMIN_EMAIL=admin@anatoly-mook.de
 *   ADMIN_PASSWORD=...   (wenn leer: sicheres Passwort wird generiert)
 *
 * Ausführen: npm run create-admin
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadEnvFile() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

loadEnvFile();

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.env.ADMIN_EMAIL || 'admin@anatoly-mook.de').trim().toLowerCase();

function generatePassword() {
  const raw = crypto.randomBytes(18).toString('base64url');
  return `${raw.slice(0, 14)}Aa7!`;
}

async function main() {
  if (!url || !serviceKey) {
    console.error(`
Fehlende Konfiguration.

1. In Supabase: Project Settings → API → URL + service_role Key kopieren.
2. In .env im Projektroot ergänzen:
   VITE_SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...

3. Erneut: npm run create-admin
`);
    process.exit(1);
  }

  const password = (process.env.ADMIN_PASSWORD || '').trim() || generatePassword();

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    if (String(error.message || '').toLowerCase().includes('already')) {
      console.error('User existiert bereits:', email);
      console.error('→ Im Supabase-Dashboard unter Authentication → Users Passwort zurücksetzen oder neuen User anlegen.');
      process.exit(1);
    }
    console.error('Supabase:', error.message);
    process.exit(1);
  }

  const outPath = path.join(root, 'admin-credentials.local.txt');
  const body = [
    'Admin-Zugang (lokal, nicht committen)',
    '=====================================',
    `E-Mail (Login):     ${email}`,
    'Benutzername:       gleich wie E-Mail (Supabase nutzt nur E-Mail + Passwort)',
    `Passwort:           ${password}`,
    '',
    'URL Admin-Panel:    /admin',
    '',
    'Diese Datei nach dem Speichern des Passworts in einem Passwort-Manager löschen.',
    `Angelegt: ${new Date().toISOString()}`,
    `User-ID:  ${data.user?.id || '—'}`,
  ].join('\n');

  fs.writeFileSync(outPath, body, 'utf8');
  console.log('Admin-User angelegt.');
  console.log('E-Mail:', email);
  console.log('Passwort:', password);
  console.log('Details gespeichert in:', outPath, '(nicht ins Git committen)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
