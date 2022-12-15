# MCD 

## Les tables de la BDD :

- Plats
   - Nom
   - Ingrédients
   - Type
   - Prix    
  
- Accompagnements
   - Nom
   - Couleur


- Vignettes
   - Nom
   - Icone

- Plats_has_vignettes
   - #plats(id)
   - #vignette(id)

- Plats_has_accompagnements
   - #plats(id)
   - #accompagnements(id)

- Commandes
   - #Profil(id)
   - Prix
   - Statut
   - CreatedAt
   - UpdatedAt
  

- Commandes_has_plats 
   - commandes_id
   - plats_id
  

- Profils
  - Nom
  - Prénom
  - Adresse
  - Points de fidélité
  - Rôle