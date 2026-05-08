import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const services = [
  {
    titre: 'Maintenance informatique',
    slug: 'maintenance-informatique',
    description: 'La maintenance informatique assure le bon fonctionnement des systèmes : prévention, dépannage, mise à niveau, sécurité, gestion des réseaux et données. Elle est essentielle pour optimiser la performance et la fiabilité.',
    icon: 'Wrench',
    couleur: 'from-[#0A1B2F] to-[#1E2F47]',
    features: ['Préventive & curative', 'Mises à jour & optimisation', 'Sécurité & sauvegardes'],
    ordre: 1
  },
  {
    titre: 'Déploiement des réseaux d\'entreprise',
    slug: 'deploiement-reseaux-entreprise',
    description: 'Le déploiement de réseaux d\'entreprise connecte efficacement les utilisateurs, assure sécurité et performance, facilite l\'accès aux ressources et améliore la productivité grâce à des technologies modernes et des compétences spécialisées.',
    icon: 'Network',
    couleur: 'from-[#0055FF] to-[#3377FF]',
    features: ['Architecture LAN/WAN/Wi-Fi', 'Sécurité & segmentation (VLAN)', 'Qualité de service & supervision'],
    ordre: 2
  },
  {
    titre: 'Câblage réseau informatique',
    slug: 'cablage-reseau-informatique',
    description: 'Le câblage réseau connecte les équipements informatiques via des câbles Ethernet, coaxiaux ou fibre optique, assurant un échange de données fiable, sécurisé et rapide pour garantir le bon fonctionnement du réseau.',
    icon: 'Cable',
    couleur: 'from-[#FFB800] to-[#00D4D4]',
    features: ['Cat6/Cat6a & fibre optique', 'Baie de brassage & test de lien', 'Normes & étiquetage'],
    ordre: 3
  },
  {
    titre: 'Configuration d\'infrastructure réseau',
    slug: 'configuration-infrastructure-reseau',
    description: 'La configuration d\'infrastructure réseau consiste à déployer et gérer les équipements physiques et logiciels pour assurer une connectivité fiable, sécurisée et performante.',
    icon: 'ServerCog',
    couleur: 'from-[#1E2F47] to-[#0A1B2F]',
    features: ['Switching & Routing', 'Pare-feu & VPN', 'Haute dispo & monitoring'],
    ordre: 4
  }
];

const temoignages = [
  {
    client: 'AFP',
    entreprise: 'AFP',
    pays: 'TOGO',
    quote: 'Network Service a complètement transformé notre infrastructure cloud. Leur expertise technique et leur réactivité sont impressionnantes.',
    ordre: 1
  },
  {
    client: 'CAISSE LE SALUT',
    entreprise: 'Caisse Le Salut',
    pays: 'TOGO',
    quote: 'L\'équipe Network Service a développé notre plateforme e-commerce de A à Z en respectant parfaitement nos délais.',
    ordre: 2
  },
  {
    client: 'CAPITAL FINANCE',
    entreprise: 'Capital Finance',
    pays: 'NIGER',
    quote: 'Excellente collaboration avec Network Service sur notre refonte digitale complète.',
    ordre: 3
  },
  {
    client: 'ILEMA',
    entreprise: 'ILEMA',
    pays: 'TOGO',
    quote: 'Support technique exceptionnel disponible 24/7. Leur monitoring proactif nous évite les mauvaises surprises.',
    ordre: 4
  },
  {
    client: 'MUTUAL FINANCE',
    entreprise: 'Mutual Finance',
    pays: 'TOGO',
    quote: 'Network Service nous a accompagnés de l\'idée initiale jusqu\'au lancement de notre application mobile.',
    ordre: 5
  }
];

const projets = [
  {
    titre: 'Infrastructure d\'Interconnexion Réseau',
    slug: 'infrastructure-interconnexion-reseau',
    description: 'Mise en place d\'une architecture d\'interconnexion sécurisée entre plusieurs sites, avec optimisation du routage, VPN IPsec, segmentation VLAN et supervision centralisée pour assurer performance, continuité et sécurité.',
    resultat: 'Infrastructure sécurisée et performante',
    categorie: 'Réseaux & Infrastructure',
    tags: ['VPN IPsec', 'VLAN', 'Firewall', 'Switching'],
    ordre: 1
  },
  {
    titre: 'Maintenance Informatique Professionnelle',
    slug: 'maintenance-informatique-professionnelle',
    description: 'Service complet incluant maintenance préventive et curative, optimisation des postes, gestion des mises à jour, sécurité, sauvegardes automatisées et assistance technique pour une infrastructure fiable et performante.',
    resultat: 'Infrastructure stable et performante',
    categorie: 'Support & Maintenance',
    tags: ['Maintenance', 'Sécurité', 'Optimisation', 'Supervision'],
    ordre: 2
  },
  {
    titre: 'Câblage Réseau Professionnel',
    slug: 'cablage-reseau-professionnel',
    description: 'Installation de câblage Ethernet Cat6/Cat6a et fibre optique, organisation de baie de brassage, test de performance, certification des liaisons et optimisation du réseau pour un débit fiable et sécurisé.',
    resultat: 'Réseau rapide et fiable',
    categorie: 'Infrastructure & Câblage',
    tags: ['Fibre Optique', 'Cat6', 'Baie de brassage', 'RJ45'],
    ordre: 3
  }
];

const categories = [
  { nom: 'Événements', slug: 'evenements', description: 'Séminaires, formations et événements', ordre: 1 },
  { nom: 'Projets', slug: 'projets', description: 'Photos de nos réalisations', ordre: 2 },
  { nom: 'Équipe', slug: 'equipe', description: 'Notre équipe en action', ordre: 3 },
  { nom: 'Bureau', slug: 'bureau', description: 'Nos locaux et installations', ordre: 4 }
];

async function seed() {
  console.log('🌱 Début du seeding...\n');

  try {
    // Insert categories
    console.log('📁 Insertion des catégories...');
    for (const cat of categories) {
      await pool.query(
        'INSERT INTO galerie_categories (nom, slug, description, ordre, active) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (slug) DO UPDATE SET active = TRUE',
        [cat.nom, cat.slug, cat.description, cat.ordre, true]
      );
    }
    console.log('✅ Catégories créées\n');

    // Insert services
    console.log('🛠️ Insertion des services...');
    for (const service of services) {
      await pool.query(
        'INSERT INTO services (titre, slug, description, icon, couleur, features, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING',
        [service.titre, service.slug, service.description, service.icon, service.couleur, JSON.stringify(service.features), service.ordre]
      );
    }
    console.log('✅ Services créés\n');

    // Insert temoignages
    console.log('⭐ Insertion des témoignages...');
    for (const t of temoignages) {
      await pool.query(
        'INSERT INTO temoignages (client, entreprise, pays, quote, ordre) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [t.client, t.entreprise, t.pays, t.quote, t.ordre]
      );
    }
    console.log('✅ Témoignages créés\n');

    // Insert projets
    console.log('💼 Insertion des projets...');
    for (const p of projets) {
      await pool.query(
        'INSERT INTO projets (titre, slug, description, resultat, categorie, tags, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING',
        [p.titre, p.slug, p.description, p.resultat, p.categorie, JSON.stringify(p.tags), p.ordre]
      );
    }
    console.log('✅ Projets créés\n');

    console.log('🎉 Seeding terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur pendant le seeding:', error);
    process.exit(1);
  }
}

seed();