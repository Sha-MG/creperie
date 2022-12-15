BEGIN ;

DROP TABLE IF EXISTS "plats",
"vignettes",
"accompagnements",
"plats_has_accompagnements",
"plats_has_vignettes",
"profils",
"commandes",
"commandes_has_plats"  ;


CREATE TABLE IF NOT EXISTS "plats" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL UNIQUE,
    "recette" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prix" MONEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "vignettes" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL UNIQUE,
    "icone" TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "accompagnements" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL UNIQUE,
    "couleur" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "plats_has_vignettes" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "plats_id" INTEGER NOT NULL REFERENCES "plats"("id") ON DELETE CASCADE,
    "vignettes_id" INTEGER NOT NULL REFERENCES "vignettes"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "plats_has_accompagnements" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "plats_id" INTEGER NOT NULL REFERENCES "plats"("id") ON DELETE CASCADE,
    "accompagnements_id" INTEGER NOT NULL REFERENCES "accompagnements"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "profils" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "points" INTEGER,
    "role" TEXT NOT NULL,
    "mail" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "commandes" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "profils_id" INTEGER NOT NULL REFERENCES "profils"("id") ON DELETE CASCADE,
    "prix" MONEY NOT NULL,
    "statut" TEXT NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "commandes_has_plats" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "plats_id" INTEGER NOT NULL REFERENCES "plats"("id") ON DELETE CASCADE,
    "commandes_id" INTEGER NOT NULL REFERENCES "commandes"("id") ON DELETE CASCADE
);
COMMIT ;