BEGIN ;

INSERT INTO "plats" ("nom", "recette", "type", "prix")
VALUES  ('Galette pouet pouet', 'Pleins de bonnes choses', 'Plat', 10.50),
        ('Crêpi crêpa', 'Un soupcon de bidule avec ud machin', 'Dessert', 12),
        ('Burger du chef', 'Un bon burger trop classe', 'Plat', 13.50),
        ('Tiramisu', 'Le vrai de vrai', 'Dessert', 9),
        ('Salade', 'Pour les gens qui veulent faire attention', 'Entrée', 7),
        ('Galette Bretonne', 'Y a que ça de vrai', 'Plat', 12)
        ;

INSERT INTO "vignettes" ("nom", "icone")
VALUES  ('Poisson', 'fa-fish'),
        ('Viande', 'fa-drumstick-bite'),
        ('Végétarien', 'fa-leaf'),
        ('Arachide', 'fa-cubes-stacked'),
        ('Gluten', 'fa-wheat-awn'),
        ('Lait', 'fa-bottle-water')
        ;


INSERT INTO "accompagnements" ("nom", "couleur")
VALUES  ('Frites', 'frites'),
        ('Salade', 'salade'),
        ('Pâtes', 'pates'),
        ('Ratatouille', 'ratatouille')
        ;

INSERT INTO "plats_has_vignettes" ("plats_id", "vignettes_id")
VALUES  (1, 1),
        (1, 4),
        (1, 5),
        (2, 2),
        (2, 6),
        (3, 3),
        (4, 1),
        (4, 5),
        (5, 2),
        (5, 3),
        (6, 4),
        (6, 5);


INSERT INTO "plats_has_accompagnements" ("plats_id", "accompagnements_id")
VALUES  (1, 1),
        (1, 2),
        (2, 3),
        (2, 1),
        (2, 2),
        (2, 4),
        (3, 1),
        (3, 3),
        (4, 1),
        (4, 2),
        (4, 4),
        (5, 1),
        (3, 3),
        (4, 1),
        (4, 2),
        (4, 4),
        (5, 1),
        (6, 4)
        ;

INSERT INTO "profils" ("nom", "prenom", "adresse", "points", "role", "mail", "password")
VALUES  ('Michel', 'Bidule', '01 rue de la joie 74000 Paris', 0, 'customer', 'michel@gmail.com', 'michel'),
        ('Admin', 'Admin', '34 rue du bonheur 35000 Rennes', 10, 'admin', 'admin@gmail.com', 'admin')
        ;

INSERT INTO "commandes" ("profils_id", "prix", "statut", "created_at", "updated_at")
VALUES  (1, 48, 'Terminé', '2021-01-19 03:14:07', '2021-01-19 04:10:01' ),
        (1, 32, 'En cours', '2022-04-14 11:45:34', null)
        ;

INSERT INTO "commandes_has_plats" ("commandes_id", "plats_id")
VALUES  (1, 1 ),
        (1, 2),
        (1, 4),
        (2, 3),
        (2, 2),
        (2, 1)
        ;

COMMIT ;