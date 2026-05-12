/*
  # Change Seminars ID Type to TEXT

  ## Beschreibung
    Ändert die ID-Spalte von UUID zu TEXT, da die Seminar-IDs als sprechende Strings
    (z.B. 'bewusstsein-praesenz') verwendet werden

  ## Änderungen
    - Ändert id von UUID zu TEXT
    - Entfernt DEFAULT gen_random_uuid()
    - Behält PRIMARY KEY constraint
*/

-- ID-Spalte zu TEXT ändern
ALTER TABLE seminars ALTER COLUMN id TYPE TEXT;
ALTER TABLE seminars ALTER COLUMN id DROP DEFAULT;
