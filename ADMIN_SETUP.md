# Admin Setup Anleitung

## Admin-Benutzer erstellen

Um das Admin-Panel verwenden zu können, müssen Sie einen Admin-Benutzer in Supabase erstellen:

### Option 1: Über Supabase Dashboard (Empfohlen)

1. Öffnen Sie Ihr Supabase Dashboard: https://supabase.com/dashboard
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu **Authentication** → **Users**
4. Klicken Sie auf **Add user** → **Create new user**
5. Geben Sie folgende Daten ein:
   - **Email**: `admin@anatolymok.com` (oder eine beliebige E-Mail)
   - **Password**: Wählen Sie ein sicheres Passwort
   - **Auto Confirm User**: Aktivieren Sie diese Option
6. Klicken Sie auf **Create user**

### Option 2: Über SQL Editor

1. Öffnen Sie Ihr Supabase Dashboard
2. Gehen Sie zu **SQL Editor**
3. Erstellen Sie eine neue Query und fügen Sie folgendes ein:

```sql
-- Über Supabase Admin API (im SQL Editor ausführen)
-- Hinweis: Ersetzen Sie YOUR_PASSWORD mit einem sicheren Passwort

SELECT auth.create_user(
  email := 'admin@anatolymok.com',
  password := 'IHR_SICHERES_PASSWORT',
  email_confirm := true
);
```

## Anmeldung im Admin-Panel

Nach dem Erstellen des Benutzers:

1. Besuchen Sie: `http://localhost:5173/#/admin` (oder Ihre Domain)
2. Melden Sie sich mit der E-Mail und dem Passwort an, die Sie erstellt haben
3. Sie haben jetzt vollen Zugriff auf das Admin-Panel

## Sicherheitshinweise

- Verwenden Sie ein starkes Passwort für den Admin-Account
- Aktivieren Sie MFA (Multi-Factor Authentication) in Production
- Ändern Sie das Passwort regelmäßig
- Speichern Sie die Zugangsdaten sicher (z.B. in einem Passwort-Manager)

## Funktionen des Admin-Panels

Nach der Anmeldung können Sie:
- ✅ Seminare erstellen, bearbeiten und löschen
- ✅ Blog-Posts verwalten
- ✅ Produkte im Shop verwalten
- ✅ Kontaktanfragen einsehen
- ✅ Buchungen verwalten
- ✅ Bilder hochladen (via Drag & Drop)

## Troubleshooting

### "Falsche Anmeldedaten" Fehler
- Stellen Sie sicher, dass der Benutzer in Supabase erstellt wurde
- Überprüfen Sie, ob die E-Mail-Bestätigung aktiviert ist
- Versuchen Sie, das Passwort zurückzusetzen

### Keine Berechtigung zum Bearbeiten
- Die RLS-Policies sind so konfiguriert, dass nur authentifizierte Benutzer Inhalte bearbeiten können
- Stellen Sie sicher, dass Sie angemeldet sind
- Überprüfen Sie in den Browser DevTools, ob eine aktive Session existiert

### Session läuft ab
- Die Session wird automatisch erneuert
- Bei Problemen: Melden Sie sich ab und wieder an
