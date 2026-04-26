import { useState, useMemo, useEffect, createContext, useContext } from "react";

// ─── i18n ───────────────────────────────────────────────────────────────────
const translations = {
  de: {
    nav: { start: "Start", foerderungen: "Förderungen", about: "Über uns", cta: "Jetzt matchen" },
    hero: {
      badge: "Kostenlos für Hamburger Startups",
      h1: "Finde die passende Förderung für dein Startup.",
      p: "Beantworte ein paar kurze Fragen und unser Algorithmus zeigt dir, welche Förderprogramme in Hamburg zu deinem Startup passen.",
      cta1: "Förderung finden",
      cta2: "Alle Förderungen ansehen",
    },
    stats: { programs: "Förderprogramme", volume: "Max. Fördervolumen", free: "Kostenlos" },
    how: {
      title: "So funktioniert's",
      sub: "In drei Schritten zur passenden Förderung",
      s1t: "Profil erstellen", s1p: "Beantworte ein paar Fragen zu deinem Startup — Branche, Phase, Teamgröße.",
      s2t: "Matching", s2p: "Unser Algorithmus analysiert dein Profil und findet passende Förderprogramme.",
      s3t: "Bewerben", s3p: "Sieh dir die Details an und bewirb dich direkt beim Fördergeber.",
    },
    form: {
      title: "Dein Startup-Profil",
      sub: "Beantworte diese Fragen und wir finden passende Förderungen.",
      branche: "In welcher Branche ist dein Startup?",
      branchePlaceholder: "Branche wählen...",
      phase: "In welcher Phase befindet ihr euch?",
      preSeed: "Pre-Seed (Idee / Vorgründung)",
      seed: "Seed (Gegründet, erste Kunden)",
      team: "Wie groß ist euer Team?",
      art: "Welche Art von Förderung sucht ihr?",
      artAll: "Alles anzeigen",
      zuschuss: "Zuschuss (nicht-rückzahlbar)",
      stipendium: "Stipendium",
      kredit: "Kredit / Darlehen",
      beteiligung: "Beteiligung",
      accelerator: "Accelerator / Inkubator",
      submit: "Förderungen finden",
    },
    results: {
      title: "Deine Ergebnisse",
      sub: "Basierend auf deinem Profil",
      hits: "Treffer",
      adjust: "Suche anpassen",
      noResults: "Leider keine passenden Förderungen gefunden.",
      adjustProfile: "Profil anpassen",
      match: "Match",
    },
    uebersicht: {
      title: "Alle Förderungen",
      sub: "Programme für Hamburger Startups",
      all: "Alle",
    },
    detail: {
      back: "Zurück",
      betrag: "Förderbetrag",
      laufzeit: "Laufzeit",
      phase: "Phase",
      beschreibung: "Beschreibung",
      voraussetzungen: "Voraussetzungen",
      branchen: "Branchen",
      antragsprozess: "Antragsprozess",
      komplexitaet: "Antragskomplexität",
      komplexStufen: ["Sehr einfach", "Einfach", "Mittel", "Komplex", "Sehr komplex"],
      zurFoerderung: "Zur Förderung",
      alumni: "Geförderte Startups",
      alumniSub: "Diese Startups wurden bereits durch dieses Programm gefördert.",
    },
    about: {
      h1: "Förderungen finden sollte nicht so kompliziert sein.",
      lead: "Wir glauben, dass jedes Pre-Seed-Startup in Hamburg Zugang zu den Fördermöglichkeiten haben sollte, die zu ihm passen — ohne stundenlanges Durchforsten von Datenbanken.",
      why: "Warum Fördermatch?",
      whyP: "Hamburgs Förderlandschaft ist vielfältig: Zuschüsse, Stipendien, Kredite, Beteiligungen, Acceleratoren. Aber die Informationen sind über Dutzende Websites verstreut, oft in Behördendeutsch geschrieben und schwer zu vergleichen. Fördermatch bündelt alles an einem Ort und macht es durchsuchbar.",
      howTitle: "Wie funktioniert das Matching?",
      howP: "Unser Algorithmus gleicht dein Startup-Profil — Branche, Phase, Teamgröße und Förderbedarf — mit den Kriterien jedes Förderprogramms ab. Je besser die Übereinstimmung, desto höher der Match-Score.",
      freeTitle: "Kostenlos. Immer.",
      freeP: "Fördermatch ist und bleibt kostenlos. Keine versteckten Kosten, kein Premium-Modell, kein Kleingedrucktes. Wir wollen, dass möglichst viele Gründer:innen in Hamburg die Unterstützung finden, die ihnen zusteht.",
      dataTitle: "Daten & Aktualität",
      dataP: "Unsere Datenbank umfasst aktuell {count} Förderprogramme mit Fokus auf Hamburg. Wir aktualisieren die Informationen regelmäßig, empfehlen aber immer, die Details direkt beim Fördergeber zu prüfen.",
    },
    footer: "Kostenloser Förder-Finder für Hamburger Startups",
  },
  en: {
    nav: { start: "Home", foerderungen: "Funding", about: "About", cta: "Find funding" },
    hero: {
      badge: "Free for Hamburg startups",
      h1: "Find the right funding for your startup.",
      p: "Answer a few quick questions and our algorithm will show you which funding programs in Hamburg match your startup.",
      cta1: "Find funding",
      cta2: "Browse all programs",
    },
    stats: { programs: "Funding programs", volume: "Max. funding volume", free: "Free" },
    how: {
      title: "How it works",
      sub: "Three steps to the right funding",
      s1t: "Create profile", s1p: "Answer a few questions about your startup — industry, stage, team size.",
      s2t: "Matching", s2p: "Our algorithm analyzes your profile and finds matching funding programs.",
      s3t: "Apply", s3p: "Review the details and apply directly with the funding provider.",
    },
    form: {
      title: "Your startup profile",
      sub: "Answer these questions and we'll find matching funding.",
      branche: "What industry is your startup in?",
      branchePlaceholder: "Select industry...",
      phase: "What stage are you at?",
      preSeed: "Pre-Seed (Idea / Pre-founding)",
      seed: "Seed (Founded, first customers)",
      team: "How big is your team?",
      art: "What type of funding are you looking for?",
      artAll: "Show all",
      zuschuss: "Grant (non-repayable)",
      stipendium: "Scholarship",
      kredit: "Loan",
      beteiligung: "Equity investment",
      accelerator: "Accelerator / Incubator",
      submit: "Find funding",
    },
    results: {
      title: "Your results",
      sub: "Based on your profile",
      hits: "matches",
      adjust: "Adjust search",
      noResults: "Unfortunately no matching funding programs found.",
      adjustProfile: "Adjust profile",
      match: "Match",
    },
    uebersicht: {
      title: "All funding programs",
      sub: "Programs for Hamburg startups",
      all: "All",
    },
    detail: {
      back: "Back",
      betrag: "Funding amount",
      laufzeit: "Duration",
      phase: "Stage",
      beschreibung: "Description",
      voraussetzungen: "Requirements",
      branchen: "Industries",
      antragsprozess: "Application process",
      komplexitaet: "Application complexity",
      komplexStufen: ["Very easy", "Easy", "Medium", "Complex", "Very complex"],
      zurFoerderung: "Visit program",
      alumni: "Funded startups",
      alumniSub: "These startups have been funded through this program.",
    },
    about: {
      h1: "Finding funding shouldn't be this complicated.",
      lead: "We believe every pre-seed startup in Hamburg should have access to the funding opportunities that fit — without spending hours scouring databases.",
      why: "Why Fördermatch?",
      whyP: "Hamburg's funding landscape is diverse: grants, scholarships, loans, equity, accelerators. But the information is scattered across dozens of websites, often written in bureaucratic German and hard to compare. Fördermatch bundles everything in one place and makes it searchable.",
      howTitle: "How does matching work?",
      howP: "Our algorithm matches your startup profile — industry, stage, team size and funding needs — against the criteria of each funding program. The better the match, the higher the score.",
      freeTitle: "Free. Always.",
      freeP: "Fördermatch is and will remain free. No hidden costs, no premium model, no fine print. We want as many founders in Hamburg as possible to find the support they deserve.",
      dataTitle: "Data & currency",
      dataP: "Our database currently includes {count} funding programs focused on Hamburg. We update the information regularly but always recommend checking the details directly with the funding provider.",
    },
    footer: "Free funding finder for Hamburg startups",
  },
  fr: {
    nav: { start: "Accueil", foerderungen: "Financements", about: "À propos", cta: "Trouver un financement" },
    hero: {
      badge: "Gratuit pour les startups de Hambourg",
      h1: "Trouvez le financement adapté à votre startup.",
      p: "Répondez à quelques questions et notre algorithme vous montrera quels programmes de financement à Hambourg correspondent à votre startup.",
      cta1: "Trouver un financement",
      cta2: "Voir tous les programmes",
    },
    stats: { programs: "Programmes", volume: "Volume max.", free: "Gratuit" },
    how: {
      title: "Comment ça marche",
      sub: "Trois étapes vers le bon financement",
      s1t: "Créer un profil", s1p: "Répondez à quelques questions sur votre startup — secteur, phase, taille de l'équipe.",
      s2t: "Matching", s2p: "Notre algorithme analyse votre profil et trouve les programmes adaptés.",
      s3t: "Postuler", s3p: "Consultez les détails et postulez directement auprès du financeur.",
    },
    form: {
      title: "Votre profil startup",
      sub: "Répondez à ces questions et nous trouverons les financements adaptés.",
      branche: "Dans quel secteur est votre startup ?",
      branchePlaceholder: "Choisir un secteur...",
      phase: "À quelle phase êtes-vous ?",
      preSeed: "Pre-Seed (Idée / Pré-création)",
      seed: "Seed (Créée, premiers clients)",
      team: "Quelle est la taille de votre équipe ?",
      art: "Quel type de financement cherchez-vous ?",
      artAll: "Tout afficher",
      zuschuss: "Subvention (non remboursable)",
      stipendium: "Bourse",
      kredit: "Prêt",
      beteiligung: "Prise de participation",
      accelerator: "Accélérateur / Incubateur",
      submit: "Trouver des financements",
    },
    results: {
      title: "Vos résultats",
      sub: "Basés sur votre profil",
      hits: "résultats",
      adjust: "Modifier la recherche",
      noResults: "Aucun programme de financement correspondant trouvé.",
      adjustProfile: "Modifier le profil",
      match: "Match",
    },
    uebersicht: {
      title: "Tous les financements",
      sub: "Programmes pour les startups de Hambourg",
      all: "Tous",
    },
    detail: {
      back: "Retour",
      betrag: "Montant",
      laufzeit: "Durée",
      phase: "Phase",
      beschreibung: "Description",
      voraussetzungen: "Conditions",
      branchen: "Secteurs",
      antragsprozess: "Processus de candidature",
      komplexitaet: "Complexité de la candidature",
      komplexStufen: ["Très facile", "Facile", "Moyen", "Complexe", "Très complexe"],
      zurFoerderung: "Voir le programme",
      alumni: "Startups financées",
      alumniSub: "Ces startups ont été financées par ce programme.",
    },
    about: {
      h1: "Trouver un financement ne devrait pas être si compliqué.",
      lead: "Nous croyons que chaque startup pre-seed à Hambourg devrait avoir accès aux opportunités de financement qui lui correspondent — sans passer des heures à fouiller des bases de données.",
      why: "Pourquoi Fördermatch ?",
      whyP: "Le paysage du financement à Hambourg est diversifié : subventions, bourses, prêts, participations, accélérateurs. Mais les informations sont dispersées sur des dizaines de sites, souvent en allemand administratif et difficiles à comparer. Fördermatch rassemble tout en un seul endroit.",
      howTitle: "Comment fonctionne le matching ?",
      howP: "Notre algorithme compare votre profil startup — secteur, phase, taille d'équipe et besoins de financement — avec les critères de chaque programme. Plus la correspondance est bonne, plus le score est élevé.",
      freeTitle: "Gratuit. Toujours.",
      freeP: "Fördermatch est et restera gratuit. Pas de coûts cachés, pas de modèle premium, pas de petits caractères.",
      dataTitle: "Données et actualité",
      dataP: "Notre base de données comprend actuellement {count} programmes de financement axés sur Hambourg. Nous mettons régulièrement à jour les informations mais recommandons toujours de vérifier les détails directement auprès du financeur.",
    },
    footer: "Outil gratuit de recherche de financements pour les startups de Hambourg",
  },
  es: {
    nav: { start: "Inicio", foerderungen: "Financiación", about: "Sobre nosotros", cta: "Buscar financiación" },
    hero: {
      badge: "Gratis para startups de Hamburgo",
      h1: "Encuentra la financiación adecuada para tu startup.",
      p: "Responde algunas preguntas y nuestro algoritmo te mostrará qué programas de financiación en Hamburgo se ajustan a tu startup.",
      cta1: "Buscar financiación",
      cta2: "Ver todos los programas",
    },
    stats: { programs: "Programas", volume: "Volumen máx.", free: "Gratis" },
    how: {
      title: "Cómo funciona",
      sub: "Tres pasos hacia la financiación adecuada",
      s1t: "Crear perfil", s1p: "Responde algunas preguntas sobre tu startup — sector, fase, tamaño del equipo.",
      s2t: "Matching", s2p: "Nuestro algoritmo analiza tu perfil y encuentra programas de financiación adecuados.",
      s3t: "Aplicar", s3p: "Revisa los detalles y aplica directamente con el financiador.",
    },
    form: {
      title: "Tu perfil de startup",
      sub: "Responde estas preguntas y encontraremos financiación adecuada.",
      branche: "¿En qué sector está tu startup?",
      branchePlaceholder: "Seleccionar sector...",
      phase: "¿En qué fase estáis?",
      preSeed: "Pre-Seed (Idea / Pre-fundación)",
      seed: "Seed (Fundada, primeros clientes)",
      team: "¿Cuántas personas hay en el equipo?",
      art: "¿Qué tipo de financiación buscáis?",
      artAll: "Mostrar todo",
      zuschuss: "Subvención (no reembolsable)",
      stipendium: "Beca",
      kredit: "Préstamo",
      beteiligung: "Participación",
      accelerator: "Aceleradora / Incubadora",
      submit: "Buscar financiación",
    },
    results: {
      title: "Tus resultados",
      sub: "Basados en tu perfil",
      hits: "resultados",
      adjust: "Ajustar búsqueda",
      noResults: "No se encontraron programas de financiación adecuados.",
      adjustProfile: "Ajustar perfil",
      match: "Match",
    },
    uebersicht: {
      title: "Todos los programas",
      sub: "Programas para startups de Hamburgo",
      all: "Todos",
    },
    detail: {
      back: "Volver",
      betrag: "Importe",
      laufzeit: "Duración",
      phase: "Fase",
      beschreibung: "Descripción",
      voraussetzungen: "Requisitos",
      branchen: "Sectores",
      antragsprozess: "Proceso de solicitud",
      komplexitaet: "Complejidad de la solicitud",
      komplexStufen: ["Muy fácil", "Fácil", "Medio", "Complejo", "Muy complejo"],
      zurFoerderung: "Ver programa",
      alumni: "Startups financiadas",
      alumniSub: "Estas startups ya han sido financiadas por este programa.",
    },
    about: {
      h1: "Encontrar financiación no debería ser tan complicado.",
      lead: "Creemos que cada startup pre-seed en Hamburgo debería tener acceso a las oportunidades de financiación que le corresponden — sin pasar horas revisando bases de datos.",
      why: "¿Por qué Fördermatch?",
      whyP: "El panorama de financiación en Hamburgo es diverso: subvenciones, becas, préstamos, participaciones, aceleradoras. Pero la información está dispersa en docenas de sitios web y es difícil de comparar. Fördermatch lo agrupa todo en un solo lugar.",
      howTitle: "¿Cómo funciona el matching?",
      howP: "Nuestro algoritmo compara tu perfil de startup — sector, fase, tamaño del equipo y necesidades de financiación — con los criterios de cada programa. Cuanto mejor sea la coincidencia, mayor será la puntuación.",
      freeTitle: "Gratis. Siempre.",
      freeP: "Fördermatch es y seguirá siendo gratuito. Sin costes ocultos, sin modelo premium, sin letra pequeña.",
      dataTitle: "Datos y actualidad",
      dataP: "Nuestra base de datos incluye actualmente {count} programas de financiación enfocados en Hamburgo. Actualizamos la información regularmente pero siempre recomendamos verificar los detalles directamente con el financiador.",
    },
    footer: "Buscador gratuito de financiación para startups de Hamburgo",
  },
};

// ─── Funding Data ───────────────────────────────────────────────────────────
const foerderungen = [
  {
    id: "innofounder",
    name: "InnoFounder",
    anbieter: "IFB Innovationsstarter / Hamburg",
    kurz: {
      de: "Zuschuss zum Lebensunterhalt für innovative Gründer:innen in der Vorgründungsphase.",
      en: "Living cost grant for innovative founders in the pre-founding phase.",
      fr: "Subvention pour les frais de subsistance des fondateurs innovants en phase de pré-création.",
      es: "Subvención para gastos de vida de fundadores innovadores en fase de pre-fundación.",
    },
    beschreibung: {
      de: "InnoFounder unterstützt innovative Gründerteams und Einzelgründer:innen in der Vorgründungs- oder sehr frühen Gründungsphase. Der Zuschuss dient zur Finanzierung des Lebensunterhalts und der mit dem Gründungsvorhaben verbundenen Kosten.",
      en: "InnoFounder supports innovative founding teams and individual founders in the pre-founding or very early founding phase. The grant finances living costs and expenses related to the founding project.",
      fr: "InnoFounder soutient les équipes fondatrices innovantes dans la phase de pré-création ou de création très précoce. La subvention finance les frais de subsistance et les coûts liés au projet.",
      es: "InnoFounder apoya a equipos fundadores innovadores en la fase de pre-fundación o fundación muy temprana. La subvención financia los gastos de vida y los costes relacionados con el proyecto.",
    },
    antragsprozess: {
      de: "1. Online-Bewerbung über das Portal der IFB Innovationsstarter einreichen. 2. Pitchtermin vor der Jury (ca. 15 Min. Pitch + 15 Min. Q&A). 3. Bei positiver Bewertung: Fördervertrag und Auszahlung der monatlichen Pauschale. Die Bewerbung kann laufend eingereicht werden, es gibt keine festen Deadlines.",
      en: "1. Submit online application via the IFB Innovationsstarter portal. 2. Pitch appointment before the jury (approx. 15 min pitch + 15 min Q&A). 3. If approved: funding contract and monthly payment disbursement. Applications can be submitted on a rolling basis.",
      fr: "1. Soumettre la candidature en ligne via le portail IFB Innovationsstarter. 2. Présentation devant le jury (env. 15 min pitch + 15 min Q&R). 3. En cas d'approbation : contrat et versement mensuel. Les candidatures peuvent être soumises en continu.",
      es: "1. Presentar solicitud online a través del portal IFB Innovationsstarter. 2. Presentación ante el jurado (aprox. 15 min pitch + 15 min Q&A). 3. Si es aprobado: contrato y pago mensual. Las solicitudes se pueden presentar de forma continua.",
    },
    komplexitaet: 2,
    betrag: "Bis zu 2.500 € / Person / Monat",
    betragMax: 75000,
    laufzeit: "Bis zu 18 Monate",
    art: "Zuschuss",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 3,
    voraussetzungen: {
      de: ["Innovatives, wissensbasiertes Gründungsvorhaben", "Sitz oder geplanter Sitz in Hamburg", "Vor- oder sehr frühe Gründungsphase", "Max. 3 Personen im Gründungsteam"],
      en: ["Innovative, knowledge-based founding project", "Based or planning to be based in Hamburg", "Pre-founding or very early founding phase", "Max. 3 people in the founding team"],
      fr: ["Projet de création innovant et basé sur le savoir", "Siège ou siège prévu à Hambourg", "Phase de pré-création ou de création très précoce", "Max. 3 personnes dans l'équipe"],
      es: ["Proyecto fundacional innovador basado en conocimiento", "Sede o sede prevista en Hamburgo", "Fase de pre-fundación o fundación muy temprana", "Máx. 3 personas en el equipo"],
    },
    link: "https://innovationsstarter.com/innofounder/",
    tags: ["Lebensunterhalt", "Vorgründung", "Alle Branchen"],
    alumni: ["Yook", "PLAN3T", "Wildplastic", "DealCircle", "delovska.de"],
  },
  {
    id: "innorampup",
    name: "InnoRampUp",
    anbieter: "IFB Innovationsstarter / Hamburg",
    kurz: {
      de: "Zuschuss bis 150.000 € für technologiebasierte Hamburger Startups in der Startphase.",
      en: "Grant up to €150,000 for technology-based Hamburg startups in the launch phase.",
      fr: "Subvention jusqu'à 150 000 € pour les startups technologiques de Hambourg en phase de lancement.",
      es: "Subvención de hasta 150.000 € para startups tecnológicas de Hamburgo en fase de lanzamiento.",
    },
    beschreibung: {
      de: "InnoRampUp richtet sich an Hamburger Startups mit besonders innovativen und technologiebasierten Geschäftsmodellen. Der nicht-rückzahlbare Zuschuss unterstützt die Entwicklung vom Prototyp zur Marktreife.",
      en: "InnoRampUp targets Hamburg startups with highly innovative, technology-based business models. The non-repayable grant supports development from prototype to market readiness.",
      fr: "InnoRampUp cible les startups de Hambourg avec des modèles commerciaux innovants et technologiques. La subvention non remboursable soutient le développement du prototype à la mise sur le marché.",
      es: "InnoRampUp se dirige a startups de Hamburgo con modelos de negocio innovadores y tecnológicos. La subvención no reembolsable apoya el desarrollo desde el prototipo hasta la madurez del mercado.",
    },
    antragsprozess: {
      de: "1. Erstgespräch mit dem Innovationsstarter-Team vereinbaren. 2. Ausführlichen Antrag mit Businessplan und Finanzplanung einreichen. 3. Prüfung durch das Investment-Komitee. 4. Bei Bewilligung: Meilensteinbasierte Auszahlung des Zuschusses. Bearbeitungszeit ca. 6–8 Wochen.",
      en: "1. Schedule initial consultation with the Innovationsstarter team. 2. Submit detailed application with business plan and financial planning. 3. Review by the investment committee. 4. If approved: milestone-based grant disbursement. Processing time approx. 6–8 weeks.",
      fr: "1. Prendre rendez-vous avec l'équipe Innovationsstarter. 2. Soumettre une candidature détaillée avec plan d'affaires. 3. Examen par le comité d'investissement. 4. Si approuvé : versement basé sur les jalons. Délai env. 6–8 semaines.",
      es: "1. Programar consulta inicial con el equipo Innovationsstarter. 2. Presentar solicitud detallada con plan de negocio. 3. Revisión por el comité de inversión. 4. Si es aprobado: desembolso basado en hitos. Tiempo de procesamiento aprox. 6–8 semanas.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 150.000 €",
    betragMax: 150000,
    laufzeit: "Projektabhängig",
    art: "Zuschuss",
    phase: ["Seed"],
    branchen: ["Digital Tech", "Industrial Tech", "Life Science"],
    teamMin: 1, teamMax: 10,
    voraussetzungen: {
      de: ["Technologiebasiertes Geschäftsmodell", "Prototyp oder Beta-Version vorhanden", "Sitz in Hamburg", "Unternehmen nicht älter als 5 Jahre"],
      en: ["Technology-based business model", "Prototype or beta version available", "Based in Hamburg", "Company not older than 5 years"],
      fr: ["Modèle commercial basé sur la technologie", "Prototype ou version bêta disponible", "Siège à Hambourg", "Entreprise de moins de 5 ans"],
      es: ["Modelo de negocio basado en tecnología", "Prototipo o versión beta disponible", "Sede en Hamburgo", "Empresa de menos de 5 años"],
    },
    link: "https://innovationsstarter.com/innorampup/",
    tags: ["Technologie", "Prototyp", "Marktreife"],
    alumni: ["apoQlar", "Sympatient", "Mindpeak", "HQLabs", "Geneequine Biotherapeutics"],
  },
  {
    id: "exist-gruendungsstipendium",
    name: "EXIST Gründungsstipendium",
    anbieter: "BMWK (Bund)",
    kurz: {
      de: "Stipendium für Gründer:innen aus der Wissenschaft — bis zu 3.000 € / Monat.",
      en: "Scholarship for founders from academia — up to €3,000 / month.",
      fr: "Bourse pour fondateurs issus du milieu académique — jusqu'à 3 000 € / mois.",
      es: "Beca para fundadores del ámbito académico — hasta 3.000 € / mes.",
    },
    beschreibung: {
      de: "Das EXIST-Gründungsstipendium unterstützt Studierende, Absolvent:innen und Wissenschaftler:innen, die ihre Gründungsidee in einen Businessplan umsetzen wollen. Es finanziert Lebensunterhalt, Sachausgaben und Coaching über ein Jahr.",
      en: "The EXIST founding scholarship supports students, graduates and researchers who want to turn their founding idea into a business plan. It finances living costs, material expenses and coaching for one year.",
      fr: "La bourse EXIST soutient les étudiants, diplômés et chercheurs souhaitant transformer leur idée en plan d'affaires. Elle finance les frais de subsistance, les dépenses matérielles et le coaching pendant un an.",
      es: "La beca EXIST apoya a estudiantes, graduados e investigadores que quieren convertir su idea en un plan de negocio. Financia gastos de vida, materiales y coaching durante un año.",
    },
    antragsprozess: {
      de: "1. Gründungsidee beim Gründungsnetzwerk der Hochschule vorstellen. 2. Hochschule muss als Antragsteller fungieren. 3. Gemeinsam den EXIST-Antrag beim Projektträger Jülich (PtJ) einreichen. 4. Begutachtung durch externe Gutachter. 5. Bei Bewilligung: 12-monatige Förderphase. Vorlaufzeit ca. 3–4 Monate. Erfolgsquote ca. 50–60%.",
      en: "1. Present founding idea to the university's startup network. 2. The university must act as applicant. 3. Submit EXIST application together to the Projektträger Jülich. 4. External review process. 5. If approved: 12-month funding phase. Lead time approx. 3–4 months. Success rate approx. 50–60%.",
      fr: "1. Présenter l'idée au réseau de création de l'université. 2. L'université doit agir comme demandeur. 3. Soumettre la candidature EXIST ensemble. 4. Évaluation par des experts externes. 5. Si approuvé : phase de financement de 12 mois. Délai env. 3–4 mois. Taux de réussite env. 50–60%.",
      es: "1. Presentar la idea al network de la universidad. 2. La universidad debe actuar como solicitante. 3. Presentar la solicitud EXIST conjuntamente. 4. Evaluación por expertos externos. 5. Si es aprobado: fase de financiación de 12 meses. Plazo aprox. 3–4 meses. Tasa de éxito aprox. 50–60%.",
    },
    komplexitaet: 4,
    betrag: "1.000–3.000 € / Monat + 30.000 € Sachmittel",
    betragMax: 30000,
    laufzeit: "12 Monate",
    art: "Stipendium",
    phase: ["Pre-Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 3,
    voraussetzungen: {
      de: ["Anbindung an eine Hochschule", "Innovatives technologie- oder wissensbasiertes Vorhaben", "Noch kein Unternehmen gegründet", "Max. 3 Personen"],
      en: ["Affiliation with a university", "Innovative technology or knowledge-based project", "No company founded yet", "Max. 3 people"],
      fr: ["Affiliation à une université", "Projet innovant basé sur la technologie ou le savoir", "Pas encore d'entreprise créée", "Max. 3 personnes"],
      es: ["Afiliación a una universidad", "Proyecto innovador basado en tecnología o conocimiento", "Sin empresa fundada aún", "Máx. 3 personas"],
    },
    link: "https://www.exist.de/",
    tags: ["Wissenschaft", "Hochschule", "Stipendium"],
    alumni: ["Provirex", "FUSE-AI", "Transformance"],
  },
  {
    id: "innofintech",
    name: "InnoFinTech",
    anbieter: "IFB Innovationsstarter / Hamburg",
    kurz: {
      de: "Zuschuss bis 200.000 € für FinTech-, InsurTech-, LegalTech- und PropTech-Startups.",
      en: "Grant up to €200,000 for FinTech, InsurTech, LegalTech and PropTech startups.",
      fr: "Subvention jusqu'à 200 000 € pour les startups FinTech, InsurTech, LegalTech et PropTech.",
      es: "Subvención de hasta 200.000 € para startups FinTech, InsurTech, LegalTech y PropTech.",
    },
    beschreibung: {
      de: "InnoFinTech fördert innovative Hamburger Startups in den Bereichen FinTech, InsurTech, LegalTech und PropTech mit einem Zuschuss von bis zu 90% der förderfähigen Kosten.",
      en: "InnoFinTech supports innovative Hamburg startups in FinTech, InsurTech, LegalTech and PropTech with grants covering up to 90% of eligible costs.",
      fr: "InnoFinTech soutient les startups innovantes de Hambourg dans les domaines FinTech, InsurTech, LegalTech et PropTech avec une subvention couvrant jusqu'à 90% des coûts éligibles.",
      es: "InnoFinTech apoya startups innovadoras de Hamburgo en FinTech, InsurTech, LegalTech y PropTech con subvenciones de hasta el 90% de los costes elegibles.",
    },
    antragsprozess: {
      de: "1. Erstgespräch mit IFB Innovationsstarter. 2. Vollständigen Antrag mit Projektbeschreibung und Kostenplan einreichen. 3. Prüfung und Bewilligung. 4. Meilensteinbasierte Auszahlung. Laufende Einreichung möglich.",
      en: "1. Initial consultation with IFB Innovationsstarter. 2. Submit full application with project description and cost plan. 3. Review and approval. 4. Milestone-based disbursement. Rolling submissions accepted.",
      fr: "1. Consultation initiale avec IFB Innovationsstarter. 2. Soumettre la candidature complète. 3. Examen et approbation. 4. Versement basé sur les jalons. Soumissions en continu.",
      es: "1. Consulta inicial con IFB Innovationsstarter. 2. Presentar solicitud completa. 3. Revisión y aprobación. 4. Desembolso basado en hitos. Presentación continua.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 200.000 € (max. 90%)",
    betragMax: 200000,
    laufzeit: "Projektabhängig",
    art: "Zuschuss",
    phase: ["Seed"],
    branchen: ["FinTech", "InsurTech", "LegalTech", "PropTech"],
    teamMin: 1, teamMax: 20,
    voraussetzungen: {
      de: ["Innovatives FinTech/InsurTech/LegalTech/PropTech-Geschäftsmodell", "Sitz in Hamburg", "Unternehmen nicht älter als 5 Jahre", "Eigenanteil mindestens 10%"],
      en: ["Innovative FinTech/InsurTech/LegalTech/PropTech business model", "Based in Hamburg", "Company not older than 5 years", "Own contribution at least 10%"],
      fr: ["Modèle commercial innovant FinTech/InsurTech/LegalTech/PropTech", "Siège à Hambourg", "Moins de 5 ans", "Contribution propre min. 10%"],
      es: ["Modelo de negocio innovador FinTech/InsurTech/LegalTech/PropTech", "Sede en Hamburgo", "Menos de 5 años", "Contribución propia mín. 10%"],
    },
    link: "https://www.foerderdatenbank.de/FDB/Content/DE/Foerderprogramm/Land/Hamburg/innofintech.html",
    tags: ["FinTech", "InsurTech", "Digitale Finanzen"],
    alumni: ["Centify", "mellem", "TRACE Electricity"],
  },
  {
    id: "ifh",
    name: "Innovationsstarter Fonds Hamburg",
    anbieter: "IFB Innovationsstarter / Hamburg",
    kurz: {
      de: "Beteiligungskapital bis 1,5 Mio. € für innovative Hamburger Startups.",
      en: "Equity capital up to €1.5M for innovative Hamburg startups.",
      fr: "Capital d'investissement jusqu'à 1,5 M€ pour les startups innovantes de Hambourg.",
      es: "Capital de inversión de hasta 1,5 M€ para startups innovadoras de Hamburgo.",
    },
    beschreibung: {
      de: "Der Innovationsstarter Fonds Hamburg beteiligt sich an innovativen Startups mit Sitz in Hamburg. Über mehrere Finanzierungsrunden kann das Investment bis zu 1,5 Mio. € betragen.",
      en: "The Innovationsstarter Fonds Hamburg invests in innovative Hamburg-based startups. The investment can reach up to €1.5M across multiple funding rounds.",
      fr: "Le fonds investit dans les startups innovantes basées à Hambourg. L'investissement peut atteindre 1,5 M€ sur plusieurs tours.",
      es: "El fondo invierte en startups innovadoras de Hamburgo. La inversión puede alcanzar 1,5 M€ en varias rondas.",
    },
    antragsprozess: {
      de: "1. Pitchdeck und Executive Summary einreichen. 2. Erstgespräch mit dem Investment-Team. 3. Due Diligence und detaillierte Prüfung. 4. Entscheidung durch das Investment-Komitee. 5. Term Sheet und Beteiligungsvertrag. Prozess dauert ca. 2–4 Monate.",
      en: "1. Submit pitch deck and executive summary. 2. Initial meeting with investment team. 3. Due diligence and detailed review. 4. Investment committee decision. 5. Term sheet and investment agreement. Process takes approx. 2–4 months.",
      fr: "1. Soumettre pitch deck et résumé exécutif. 2. Première rencontre avec l'équipe d'investissement. 3. Due diligence. 4. Décision du comité. 5. Term sheet et contrat. Processus env. 2–4 mois.",
      es: "1. Presentar pitch deck y resumen ejecutivo. 2. Reunión inicial con el equipo de inversión. 3. Due diligence. 4. Decisión del comité. 5. Term sheet y contrato. Proceso aprox. 2–4 meses.",
    },
    komplexitaet: 4,
    betrag: "Bis zu 1.500.000 €",
    betragMax: 1500000,
    laufzeit: "Mehrere Runden",
    art: "Beteiligung",
    phase: ["Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 50,
    voraussetzungen: {
      de: ["Innovatives Geschäftsmodell", "Sitz in Hamburg", "Nicht älter als 5 Jahre", "Skalierungspotenzial"],
      en: ["Innovative business model", "Based in Hamburg", "Not older than 5 years", "Scalability potential"],
      fr: ["Modèle innovant", "Siège à Hambourg", "Moins de 5 ans", "Potentiel de scalabilité"],
      es: ["Modelo innovador", "Sede en Hamburgo", "Menos de 5 años", "Potencial de escalabilidad"],
    },
    link: "https://innovationsstarter.com/ifh/",
    tags: ["Beteiligung", "Investment", "Skalierung"],
    alumni: ["Geneequine Biotherapeutics", "HQLabs", "Mindpeak", "Sympatient", "Provirex", "Transformance", "Centify", "LIVEABLE PLACES", "mellem", "Mirox", "TRACE Electricity"],
  },
  {
    id: "hamburg-kredit-mikro",
    name: "Hamburg-Kredit Mikro",
    anbieter: "IFB Hamburg",
    kurz: {
      de: "Mikrokredit bis 40.000 € für Gründungen und kleine Unternehmen.",
      en: "Microloan up to €40,000 for startups and small businesses.",
      fr: "Microcrédit jusqu'à 40 000 € pour les créations et petites entreprises.",
      es: "Microcrédito de hasta 40.000 € para fundaciones y pequeñas empresas.",
    },
    beschreibung: {
      de: "Der Hamburg-Kredit Mikro bietet zinsgünstige Darlehen für Existenzgründer:innen und kleine Unternehmen. Besonders geeignet für kleinere Investitionen und erste Betriebsmittel.",
      en: "The Hamburg-Kredit Mikro offers low-interest loans for founders and small businesses. Particularly suitable for smaller investments and initial working capital.",
      fr: "Le Hamburg-Kredit Mikro offre des prêts à taux réduit pour les fondateurs et petites entreprises.",
      es: "El Hamburg-Kredit Mikro ofrece préstamos a bajo interés para fundadores y pequeñas empresas.",
    },
    antragsprozess: {
      de: "1. Antrag über die Hausbank stellen. 2. Hausbank leitet den Antrag an die IFB weiter. 3. Prüfung durch die IFB. 4. Bewilligung und Auszahlung über die Hausbank. Bearbeitungszeit ca. 2–4 Wochen.",
      en: "1. Apply through your bank. 2. Bank forwards application to IFB. 3. Review by IFB. 4. Approval and disbursement through your bank. Processing time approx. 2–4 weeks.",
      fr: "1. Faire la demande via votre banque. 2. La banque transmet à l'IFB. 3. Examen par l'IFB. 4. Approbation et versement. Délai env. 2–4 semaines.",
      es: "1. Solicitar a través de tu banco. 2. El banco transmite a IFB. 3. Revisión por IFB. 4. Aprobación y desembolso. Plazo aprox. 2–4 semanas.",
    },
    komplexitaet: 2,
    betrag: "Bis zu 25.000 / 40.000 €",
    betragMax: 40000,
    laufzeit: "Bis zu 5 Jahre",
    art: "Kredit",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 10,
    voraussetzungen: {
      de: ["Gründung oder Unternehmen in Hamburg", "Tragfähiges Geschäftskonzept", "Positive Bonitätsprüfung"],
      en: ["Startup or business in Hamburg", "Viable business concept", "Positive credit check"],
      fr: ["Création ou entreprise à Hambourg", "Concept commercial viable", "Vérification de crédit positive"],
      es: ["Fundación o empresa en Hamburgo", "Concepto de negocio viable", "Verificación de crédito positiva"],
    },
    link: "https://www.ifbhh.de/foerderprogramm/hamburg-kredit-mikro",
    tags: ["Kredit", "Kleinunternehmen", "Betriebsmittel"],
    alumni: [],
  },
  {
    id: "hamburg-kredit-gruendung",
    name: "Hamburg-Kredit Gründung und Nachfolge",
    anbieter: "IFB Hamburg",
    kurz: {
      de: "Darlehen bis 750.000 € für Gründungen, Übernahmen und Investitionen.",
      en: "Loan up to €750,000 for startups, acquisitions and investments.",
      fr: "Prêt jusqu'à 750 000 € pour créations, reprises et investissements.",
      es: "Préstamo de hasta 750.000 € para fundaciones, adquisiciones e inversiones.",
    },
    beschreibung: {
      de: "Der Hamburg-Kredit Gründung und Nachfolge unterstützt größere Investitionen in der Gründungsphase für Gründer:innen, Unternehmen und Freiberufler:innen.",
      en: "Hamburg-Kredit Gründung und Nachfolge supports larger investments in the founding phase for founders, companies and freelancers.",
      fr: "Ce programme soutient les investissements plus importants dans la phase de création.",
      es: "Este programa apoya inversiones mayores en la fase de fundación.",
    },
    antragsprozess: {
      de: "1. Antrag über die Hausbank stellen (Businessplan erforderlich). 2. Hausbank prüft und leitet an IFB weiter. 3. Gemeinsame Prüfung durch IFB und Hausbank. 4. Bewilligung und Auszahlung. Bearbeitungszeit ca. 4–6 Wochen.",
      en: "1. Apply through your bank (business plan required). 2. Bank reviews and forwards to IFB. 3. Joint review. 4. Approval and disbursement. Processing time approx. 4–6 weeks.",
      fr: "1. Demande via la banque (plan d'affaires requis). 2. La banque examine et transmet. 3. Examen conjoint. 4. Approbation. Délai env. 4–6 semaines.",
      es: "1. Solicitar a través del banco (plan de negocio requerido). 2. El banco revisa y transmite. 3. Revisión conjunta. 4. Aprobación. Plazo aprox. 4–6 semanas.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 750.000 €",
    betragMax: 750000,
    laufzeit: "Bis zu 20 Jahre",
    art: "Kredit",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 50,
    voraussetzungen: {
      de: ["Gründung, Übernahme oder Festigung in Hamburg", "Tragfähiges Geschäftskonzept", "Antragstellung über die Hausbank"],
      en: ["Startup, acquisition or consolidation in Hamburg", "Viable business concept", "Application through your bank"],
      fr: ["Création, reprise ou consolidation à Hambourg", "Concept commercial viable", "Demande via la banque"],
      es: ["Fundación, adquisición o consolidación en Hamburgo", "Concepto de negocio viable", "Solicitud a través del banco"],
    },
    link: "https://www.ifbhh.de/foerderprogramm/hamburg-kredit-gruendung-und-nachfolge",
    tags: ["Kredit", "Investition", "Betriebsmittel"],
    alumni: [],
  },
  {
    id: "kleinstunternehmen",
    name: "Gründung von Kleinstunternehmen",
    anbieter: "IFB Hamburg",
    kurz: {
      de: "Darlehen bis 35.000 € mit Schuldendiensthilfe für Gründer:innen aus der Arbeitslosigkeit.",
      en: "Loan up to €35,000 with debt relief for founders from unemployment.",
      fr: "Prêt jusqu'à 35 000 € avec aide pour fondateurs sortant du chômage.",
      es: "Préstamo de hasta 35.000 € con ayuda para fundadores desde el desempleo.",
    },
    beschreibung: {
      de: "Richtet sich an Gründer:innen, die aus der Arbeitslosigkeit heraus gründen. Bietet ein zinsgünstiges Darlehen plus Schuldendiensthilfe von bis zu 3.500 €.",
      en: "Targets founders starting from unemployment. Offers a low-interest loan plus debt service assistance of up to €3,500.",
      fr: "Cible les fondateurs sortant du chômage. Offre un prêt à taux réduit plus une aide au service de la dette.",
      es: "Dirigido a fundadores que parten del desempleo. Ofrece un préstamo a bajo interés más ayuda de hasta 3.500 €.",
    },
    antragsprozess: {
      de: "1. Beratung bei der Agentur für Arbeit oder Jobcenter. 2. Tragfähigkeitsbescheinigung einholen (z.B. von der Handelskammer). 3. Antrag über die Hausbank einreichen. 4. Prüfung und Bewilligung. Bearbeitungszeit ca. 3–4 Wochen.",
      en: "1. Consultation with employment agency. 2. Obtain viability certificate. 3. Submit application through your bank. 4. Review and approval. Processing approx. 3–4 weeks.",
      fr: "1. Consultation auprès de l'agence pour l'emploi. 2. Obtenir un certificat de viabilité. 3. Soumettre la demande via la banque. 4. Examen et approbation. Délai env. 3–4 semaines.",
      es: "1. Consulta con la agencia de empleo. 2. Obtener certificado de viabilidad. 3. Presentar solicitud a través del banco. 4. Revisión y aprobación. Plazo aprox. 3–4 semanas.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 35.000 € + 3.500 € Hilfe",
    betragMax: 35000,
    laufzeit: "Bis zu 5 Jahre",
    art: "Kredit",
    phase: ["Pre-Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 1,
    voraussetzungen: {
      de: ["Gründung aus Arbeitslosigkeit", "Unternehmen nicht älter als 4 Jahre", "Sitz in Hamburg", "Tragfähiges Geschäftskonzept"],
      en: ["Founding from unemployment", "Company not older than 4 years", "Based in Hamburg", "Viable business concept"],
      fr: ["Création depuis le chômage", "Moins de 4 ans", "Siège à Hambourg", "Concept viable"],
      es: ["Fundación desde el desempleo", "Menos de 4 años", "Sede en Hamburgo", "Concepto viable"],
    },
    link: "https://www.ifbhh.de/",
    tags: ["Arbeitslosigkeit", "Kleinstunternehmen"],
    alumni: [],
  },
  {
    id: "media-lift",
    name: "Media Lift",
    anbieter: "Hamburg Kreativ Gesellschaft",
    kurz: {
      de: "15.000 € plus Mentoring für Gründer:innen im Medien- und Digitalbereich.",
      en: "€15,000 plus mentoring for founders in the media and digital sector.",
      fr: "15 000 € plus mentorat pour fondateurs dans le secteur média et numérique.",
      es: "15.000 € más mentoría para fundadores en el sector de medios y digital.",
    },
    beschreibung: {
      de: "Media Lift unterstützt Gründer:innen und Teams in der Medien- und Digitalbranche mit Finanzierung, Mentoring, Workshops und professionellen Trainings.",
      en: "Media Lift supports founders and teams in media and digital with funding, mentoring, workshops and professional training.",
      fr: "Media Lift soutient les fondateurs dans le secteur média et numérique avec financement, mentorat et ateliers.",
      es: "Media Lift apoya a fundadores en el sector de medios y digital con financiación, mentoría y talleres.",
    },
    antragsprozess: {
      de: "1. Online-Bewerbung während der Bewerbungsphase einreichen (feste Termine, ca. 1–2x pro Jahr). 2. Auswahlprozess durch Jury. 3. Bei Auswahl: Teilnahme am mehrmonatigen Programm. Einfache Bewerbung mit Ideenbeschreibung.",
      en: "1. Submit online application during application phase (fixed dates, 1–2x per year). 2. Jury selection process. 3. If selected: participation in multi-month program. Simple application with idea description.",
      fr: "1. Candidature en ligne pendant la phase de candidature (dates fixes, 1–2x par an). 2. Sélection par jury. 3. Si sélectionné : participation au programme. Candidature simple.",
      es: "1. Solicitud online durante la fase de solicitud (fechas fijas, 1–2x al año). 2. Selección por jurado. 3. Si es seleccionado: participación en el programa. Solicitud sencilla.",
    },
    komplexitaet: 1,
    betrag: "15.000 € pro Team",
    betragMax: 15000,
    laufzeit: "Programmabhängig",
    art: "Zuschuss",
    phase: ["Pre-Seed"],
    branchen: ["Medien", "Digital"],
    teamMin: 1, teamMax: 5,
    voraussetzungen: {
      de: ["Gründungsvorhaben im Medien-/Digitalbereich", "Bezug zu Hamburg", "Innovative Idee mit Marktpotenzial"],
      en: ["Founding project in media/digital", "Connection to Hamburg", "Innovative idea with market potential"],
      fr: ["Projet dans le secteur média/numérique", "Lien avec Hambourg", "Idée innovante"],
      es: ["Proyecto en sector medios/digital", "Conexión con Hamburgo", "Idea innovadora con potencial"],
    },
    link: "https://kreativgesellschaft.org/",
    tags: ["Medien", "Mentoring", "Workspace"],
    alumni: ["BotTalk", "musicube", "Female Leadership Academy", "NURIO", "LensChangeAI", "Anymate Me", "fuse.space", "lit-x", "Neuralfinity", "Storydive", "DearMonday"],
  },
  {
    id: "games-lift",
    name: "Games Lift",
    anbieter: "Gamecity Hamburg",
    kurz: {
      de: "15.000 € plus Mentoring für Spieleentwickler:innen in der Konzeptphase.",
      en: "€15,000 plus mentoring for game developers in the concept phase.",
      fr: "15 000 € plus mentorat pour développeurs de jeux en phase de concept.",
      es: "15.000 € más mentoría para desarrolladores de juegos en fase de concepto.",
    },
    beschreibung: {
      de: "Games Lift fördert Spieleentwickler:innen-Teams in der Konzeptphase mit Förderung, Workshop- und Mentoring-Programm durch Branchenexpert:innen.",
      en: "Games Lift supports game developer teams in the concept phase with funding, workshops and mentoring from industry experts.",
      fr: "Games Lift soutient les équipes de développeurs de jeux en phase de concept avec financement et mentorat.",
      es: "Games Lift apoya equipos de desarrolladores de juegos en fase de concepto con financiación y mentoría.",
    },
    antragsprozess: {
      de: "1. Online-Bewerbung mit Spielekonzept einreichen (jährlicher Call). 2. Auswahl durch Fachjury. 3. Mehrtägiges Kick-off-Event. 4. Begleitendes Mentoring über mehrere Monate. Sehr unkomplizierte Bewerbung.",
      en: "1. Submit online application with game concept (annual call). 2. Selection by expert jury. 3. Multi-day kick-off event. 4. Ongoing mentoring over several months. Very straightforward application.",
      fr: "1. Candidature en ligne avec concept de jeu (appel annuel). 2. Sélection par jury. 3. Événement de lancement. 4. Mentorat continu. Candidature très simple.",
      es: "1. Solicitud online con concepto de juego (convocatoria anual). 2. Selección por jurado. 3. Evento de lanzamiento. 4. Mentoría continua. Solicitud muy sencilla.",
    },
    komplexitaet: 1,
    betrag: "15.000 € pro Team",
    betragMax: 15000,
    laufzeit: "Programmabhängig",
    art: "Zuschuss",
    phase: ["Pre-Seed"],
    branchen: ["Games", "Digital"],
    teamMin: 1, teamMax: 5,
    voraussetzungen: {
      de: ["Spieleentwicklungs-Team", "Konzeptphase", "Innovative Spielidee"],
      en: ["Game development team", "Concept phase", "Innovative game idea"],
      fr: ["Équipe de développement de jeux", "Phase de concept", "Idée de jeu innovante"],
      es: ["Equipo de desarrollo de juegos", "Fase de concepto", "Idea de juego innovadora"],
    },
    link: "https://gamecity-hamburg.de/",
    tags: ["Games", "Spieleentwicklung", "Mentoring"],
    alumni: ["Symmetry Break Studio", "OneManOnMars (Leif's Adventure)", "Impawsible Games (Ninja Brigade)", "Crumbling (Ole Jürgensen)", "Alchymia (Julia Reberg)"],
  },
  {
    id: "prototypenfoerderung-games",
    name: "Prototypenförderung (Gamecity)",
    anbieter: "Gamecity Hamburg",
    kurz: {
      de: "Zuschuss bis 80.000 € für die Entwicklung von Spieleprototypen.",
      en: "Grant up to €80,000 for game prototype development.",
      fr: "Subvention jusqu'à 80 000 € pour le développement de prototypes de jeux.",
      es: "Subvención de hasta 80.000 € para desarrollo de prototipos de juegos.",
    },
    beschreibung: {
      de: "Die Prototypenförderung unterstützt Spieleentwickler:innen und Studios bei der Erstellung von Prototypen mit bis zu 80% der förderfähigen Kosten.",
      en: "The prototype funding supports game developers and studios in creating prototypes with up to 80% of eligible costs covered.",
      fr: "Le financement de prototype soutient les développeurs de jeux dans la création de prototypes avec jusqu'à 80% des coûts éligibles.",
      es: "La financiación de prototipos apoya a desarrolladores de juegos con hasta el 80% de los costes elegibles.",
    },
    antragsprozess: {
      de: "1. Antrag mit detaillierter Projektbeschreibung und Kostenplan bei Gamecity Hamburg einreichen. 2. Fachliche Begutachtung. 3. Bei Bewilligung: Fördervertrag mit Meilensteinplan. 4. Regelmäßige Fortschrittsberichte. Bearbeitungszeit ca. 6–8 Wochen.",
      en: "1. Submit application with detailed project description and cost plan. 2. Expert review. 3. If approved: funding contract with milestones. 4. Regular progress reports. Processing time approx. 6–8 weeks.",
      fr: "1. Soumettre candidature avec description détaillée du projet. 2. Évaluation d'experts. 3. Si approuvé : contrat avec jalons. 4. Rapports réguliers. Délai env. 6–8 semaines.",
      es: "1. Presentar solicitud con descripción detallada del proyecto. 2. Evaluación de expertos. 3. Si es aprobado: contrato con hitos. 4. Informes regulares. Plazo aprox. 6–8 semanas.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 80.000 € (max. 80%)",
    betragMax: 80000,
    laufzeit: "Projektabhängig",
    art: "Zuschuss",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Games"],
    teamMin: 1, teamMax: 20,
    voraussetzungen: {
      de: ["Spieleentwickler:in oder Studio", "Prototyp-Vorhaben", "Eigenanteil mindestens 20%"],
      en: ["Game developer or studio", "Prototype project", "Own contribution at least 20%"],
      fr: ["Développeur de jeux ou studio", "Projet de prototype", "Contribution propre min. 20%"],
      es: ["Desarrollador de juegos o estudio", "Proyecto de prototipo", "Contribución propia mín. 20%"],
    },
    link: "https://gamecity-hamburg.de/de/foerderung/",
    tags: ["Games", "Prototyp", "Studio"],
    alumni: ["Symmetry Break Studio"],
  },
  {
    id: "btg-digitalisierung",
    name: "BTG Digitalisierung 5.0",
    anbieter: "BTG Hamburg",
    kurz: {
      de: "Beteiligung bis 250.000 € für digitale Projekte.",
      en: "Equity up to €250,000 for digital projects.",
      fr: "Participation jusqu'à 250 000 € pour projets numériques.",
      es: "Participación de hasta 250.000 € para proyectos digitales.",
    },
    beschreibung: {
      de: "BTG Digitalisierung 5.0 unterstützt Unternehmen und Startups bei der Umsetzung digitaler Projekte wie Webentwicklung, Cloud-Infrastruktur und digitales Marketing.",
      en: "BTG Digitalisierung 5.0 supports companies and startups implementing digital projects such as web development, cloud infrastructure and digital marketing.",
      fr: "BTG Digitalisierung 5.0 soutient les entreprises dans leurs projets numériques.",
      es: "BTG Digitalisierung 5.0 apoya empresas en proyectos digitales.",
    },
    antragsprozess: {
      de: "1. Kontaktaufnahme mit der BTG Hamburg. 2. Einreichung des Businessplans und Digitalisierungsvorhabens. 3. Prüfung und Verhandlung der Beteiligungskonditionen. 4. Beteiligungsvertrag. Prozess ca. 4–8 Wochen.",
      en: "1. Contact BTG Hamburg. 2. Submit business plan and digitalization project. 3. Review and negotiate terms. 4. Investment agreement. Process approx. 4–8 weeks.",
      fr: "1. Contacter BTG Hamburg. 2. Soumettre le plan d'affaires. 3. Examen et négociation. 4. Contrat de participation. Délai env. 4–8 semaines.",
      es: "1. Contactar BTG Hamburg. 2. Presentar plan de negocio. 3. Revisión y negociación. 4. Contrato de participación. Proceso aprox. 4–8 semanas.",
    },
    komplexitaet: 3,
    betrag: "Bis zu 250.000 €",
    betragMax: 250000,
    laufzeit: "Projektabhängig",
    art: "Beteiligung",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 50,
    voraussetzungen: {
      de: ["Digitalisierungsprojekt", "Sitz in Hamburg", "Tragfähiges Geschäftsmodell"],
      en: ["Digitalization project", "Based in Hamburg", "Viable business model"],
      fr: ["Projet de numérisation", "Siège à Hambourg", "Modèle commercial viable"],
      es: ["Proyecto de digitalización", "Sede en Hamburgo", "Modelo de negocio viable"],
    },
    link: "https://www.btg-hamburg.de/",
    tags: ["Digitalisierung", "Cloud", "Marketing"],
    alumni: [],
  },
  {
    id: "ai-ideation",
    name: "AI.STARTUP.HUB Ideation",
    anbieter: "AI.STARTUP.HUB Hamburg",
    kurz: {
      de: "Mentoring und Workspace für KI-basierte Gründungsideen.",
      en: "Mentoring and workspace for AI-based startup ideas.",
      fr: "Mentorat et espace de travail pour les idées de startups basées sur l'IA.",
      es: "Mentoría y espacio de trabajo para ideas de startups basadas en IA.",
    },
    beschreibung: {
      de: "Das AI Ideation Program richtet sich an Studierende, Forschende und KI-Begeisterte mit KI-basierten Geschäftsideen. Es bietet Mentoring, Workshops zu Prototyping und Arbeitsräume.",
      en: "The AI Ideation Program targets students, researchers and AI enthusiasts with AI-based business ideas. It offers mentoring, prototyping workshops and workspace.",
      fr: "Le programme AI Ideation cible les étudiants et chercheurs avec des idées basées sur l'IA.",
      es: "El programa AI Ideation se dirige a estudiantes e investigadores con ideas basadas en IA.",
    },
    antragsprozess: {
      de: "1. Online-Bewerbung über die AI.STARTUP.HUB-Website. 2. Kurze Beschreibung der KI-Idee. 3. Auswahlgespräch. 4. Bei Auswahl: Start im nächsten Programmjahrgang. Sehr niedrigschwellige Bewerbung.",
      en: "1. Online application via AI.STARTUP.HUB website. 2. Brief AI idea description. 3. Selection interview. 4. If selected: start in next program cohort. Very low-threshold application.",
      fr: "1. Candidature en ligne. 2. Description de l'idée IA. 3. Entretien de sélection. 4. Si sélectionné : début du programme. Candidature très accessible.",
      es: "1. Solicitud online. 2. Descripción de la idea IA. 3. Entrevista de selección. 4. Si es seleccionado: inicio del programa. Solicitud muy accesible.",
    },
    komplexitaet: 1,
    betrag: "Workspace + Mentoring",
    betragMax: 0,
    laufzeit: "Programmabhängig",
    art: "Accelerator",
    phase: ["Pre-Seed"],
    branchen: ["KI / AI", "Digital Tech"],
    teamMin: 1, teamMax: 5,
    voraussetzungen: {
      de: ["KI-basierte Geschäftsidee", "Student:in, Forscher:in oder KI-Enthusiast:in", "Bezug zu Hamburg"],
      en: ["AI-based business idea", "Student, researcher or AI enthusiast", "Connection to Hamburg"],
      fr: ["Idée basée sur l'IA", "Étudiant, chercheur ou passionné d'IA", "Lien avec Hambourg"],
      es: ["Idea basada en IA", "Estudiante, investigador o entusiasta de IA", "Conexión con Hamburgo"],
    },
    link: "https://www.aistartuphub.com/ideation-program/",
    tags: ["KI", "Mentoring", "Prototyping"],
    alumni: ["adtriba", "ai-omatic", "Cauliflower", "Dealcode", "Katulu", "PANDA Technology", "repath", "Verlingo", "neuroflash", "FlowShare", "BotTalk", "913.ai", "OceanScore"],
  },
  {
    id: "next-generation",
    name: "Next.Generation Inkubator",
    anbieter: "Körber-Stiftung",
    kurz: {
      de: "Inkubator für Social Entrepreneurs unter 30 Jahren.",
      en: "Incubator for social entrepreneurs under 30.",
      fr: "Incubateur pour entrepreneurs sociaux de moins de 30 ans.",
      es: "Incubadora para emprendedores sociales menores de 30 años.",
    },
    beschreibung: {
      de: "Fördert junge Social Entrepreneurs unter 30, die gesellschaftliche Herausforderungen lösen wollen. Bietet Workshops, Coaching und individuelles Mentoring.",
      en: "Supports young social entrepreneurs under 30 who want to solve societal challenges. Offers workshops, coaching and individual mentoring.",
      fr: "Soutient les jeunes entrepreneurs sociaux de moins de 30 ans. Offre ateliers, coaching et mentorat.",
      es: "Apoya a jóvenes emprendedores sociales menores de 30 años. Ofrece talleres, coaching y mentoría.",
    },
    antragsprozess: {
      de: "1. Online-Bewerbung auf der Körber-Stiftung-Website (jährlicher Call). 2. Beschreibung des sozialen Vorhabens. 3. Auswahlgespräche. 4. Programmteilnahme über mehrere Monate. Einfache, niedrigschwellige Bewerbung.",
      en: "1. Online application on Körber Foundation website (annual call). 2. Describe your social venture. 3. Selection interviews. 4. Program participation over several months. Simple, low-threshold application.",
      fr: "1. Candidature en ligne sur le site de la fondation Körber (appel annuel). 2. Description du projet social. 3. Entretiens. 4. Participation au programme. Candidature simple.",
      es: "1. Solicitud online en web de la Fundación Körber (convocatoria anual). 2. Descripción del proyecto social. 3. Entrevistas. 4. Participación en el programa. Solicitud sencilla.",
    },
    komplexitaet: 1,
    betrag: "Coaching + Mentoring",
    betragMax: 0,
    laufzeit: "Programmabhängig",
    art: "Accelerator",
    phase: ["Pre-Seed"],
    branchen: ["Social Impact"],
    teamMin: 1, teamMax: 5,
    voraussetzungen: {
      de: ["Unter 30 Jahre alt", "Sozialunternehmerisches Vorhaben", "Gesellschaftliche Problemstellung"],
      en: ["Under 30 years old", "Social entrepreneurship project", "Societal problem to solve"],
      fr: ["Moins de 30 ans", "Projet d'entrepreneuriat social", "Problème sociétal"],
      es: ["Menor de 30 años", "Proyecto de emprendimiento social", "Problema social a resolver"],
    },
    link: "https://koerber-stiftung.de/projekte/koerber-start-hub/",
    tags: ["Social Impact", "Unter 30", "Gesellschaft"],
    alumni: ["Yakady", "waymaker stories"],
  },
  {
    id: "hamburg-digital",
    name: "Hamburg Digital",
    anbieter: "Stadt Hamburg",
    kurz: {
      de: "Zuschuss bis 17.000 € für Digitalisierungsberatung und IT-Investitionen.",
      en: "Grant up to €17,000 for digitalization consulting and IT investments.",
      fr: "Subvention jusqu'à 17 000 € pour la consultation en numérisation et les investissements IT.",
      es: "Subvención de hasta 17.000 € para consultoría de digitalización e inversiones IT.",
    },
    beschreibung: {
      de: "Hamburg Digital fördert KMU und Gründer:innen bei der Digitalisierung. Modul 1: Beratung (bis 2.500 €), Modul 2: Software/Hardware (bis 17.000 €).",
      en: "Hamburg Digital supports SMEs and founders with digitalization. Module 1: Consulting (up to €2,500), Module 2: Software/Hardware (up to €17,000).",
      fr: "Hamburg Digital soutient les PME et fondateurs dans la numérisation. Module 1 : Conseil, Module 2 : Logiciel/Matériel.",
      es: "Hamburg Digital apoya a PYMES y fundadores en la digitalización. Módulo 1: Consultoría, Módulo 2: Software/Hardware.",
    },
    antragsprozess: {
      de: "1. Online-Antrag über das Förderportal der Stadt Hamburg. 2. Angebote von Dienstleistern einholen. 3. Antrag mit Kostenvoranschlägen einreichen. 4. Prüfung und Bewilligung. 5. Nach Umsetzung: Verwendungsnachweis einreichen. Bearbeitungszeit ca. 2–4 Wochen.",
      en: "1. Online application via Hamburg funding portal. 2. Obtain quotes from service providers. 3. Submit application with quotes. 4. Review and approval. 5. After implementation: submit proof of use. Processing approx. 2–4 weeks.",
      fr: "1. Candidature en ligne via le portail de Hambourg. 2. Obtenir des devis. 3. Soumettre avec les devis. 4. Examen et approbation. 5. Justificatif d'utilisation. Délai env. 2–4 semaines.",
      es: "1. Solicitud online a través del portal de Hamburgo. 2. Obtener presupuestos. 3. Presentar solicitud con presupuestos. 4. Revisión y aprobación. 5. Justificante de uso. Plazo aprox. 2–4 semanas.",
    },
    komplexitaet: 2,
    betrag: "Bis zu 2.500 / 17.000 €",
    betragMax: 17000,
    laufzeit: "Projektabhängig",
    art: "Zuschuss",
    phase: ["Pre-Seed", "Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 50,
    voraussetzungen: {
      de: ["Unternehmen oder Gründung in Hamburg", "Digitalisierungsbedarf", "KMU-Kriterien erfüllt"],
      en: ["Business or startup in Hamburg", "Digitalization need", "SME criteria met"],
      fr: ["Entreprise ou création à Hambourg", "Besoin de numérisation", "Critères PME"],
      es: ["Empresa o fundación en Hamburgo", "Necesidad de digitalización", "Criterios PYME"],
    },
    link: "https://www.hamburg.de/",
    tags: ["Digitalisierung", "Beratung", "IT"],
    alumni: [],
  },
  {
    id: "exist-women",
    name: "EXIST-Women",
    anbieter: "BMWK (Bund)",
    kurz: {
      de: "Förderprogramm speziell für Gründerinnen aus der Wissenschaft.",
      en: "Funding program specifically for female founders from academia.",
      fr: "Programme de financement spécialement pour les fondatrices issues du milieu académique.",
      es: "Programa de financiación específico para fundadoras del ámbito académico.",
    },
    beschreibung: {
      de: "EXIST-Women unterstützt Frauen an Hochschulen und Forschungseinrichtungen dabei, ihre Gründungsideen voranzubringen. Finanzielle Unterstützung, Coaching und Netzwerkzugang.",
      en: "EXIST-Women supports women at universities and research institutions in advancing their founding ideas. Financial support, coaching and network access.",
      fr: "EXIST-Women soutient les femmes dans les universités à développer leurs idées de création. Soutien financier, coaching et réseau.",
      es: "EXIST-Women apoya a mujeres en universidades a avanzar sus ideas de fundación. Apoyo financiero, coaching y red.",
    },
    antragsprozess: {
      de: "1. Bewerbung über das Gründungszentrum der Hochschule. 2. Hochschule reicht den Antrag beim BMWK ein. 3. Begutachtung. 4. Bei Bewilligung: 6–12 monatige Förderphase. Orientiert sich am EXIST-Prozess, aber mit vereinfachten Anforderungen.",
      en: "1. Apply through the university's startup center. 2. University submits application to BMWK. 3. Expert review. 4. If approved: 6–12 month funding phase. Based on EXIST process but with simplified requirements.",
      fr: "1. Candidature via le centre de création de l'université. 2. L'université soumet la demande. 3. Évaluation. 4. Si approuvé : phase de 6–12 mois. Exigences simplifiées.",
      es: "1. Solicitar a través del centro de emprendimiento de la universidad. 2. La universidad presenta la solicitud. 3. Evaluación. 4. Si es aprobado: fase de 6–12 meses. Requisitos simplificados.",
    },
    komplexitaet: 3,
    betrag: "Stipendium + Sachmittel",
    betragMax: 0,
    laufzeit: "Bis zu 12 Monate",
    art: "Stipendium",
    phase: ["Pre-Seed"],
    branchen: ["Alle"],
    teamMin: 1, teamMax: 1,
    voraussetzungen: {
      de: ["Weibliche Gründerin", "Anbindung an Hochschule", "Innovative Gründungsidee"],
      en: ["Female founder", "University affiliation", "Innovative founding idea"],
      fr: ["Fondatrice", "Affiliation universitaire", "Idée innovante"],
      es: ["Fundadora", "Afiliación universitaria", "Idea innovadora"],
    },
    link: "https://www.exist.de/",
    tags: ["Gründerinnen", "Wissenschaft", "Frauen"],
    alumni: [],
  },
];

// ─── Matching Algorithm ─────────────────────────────────────────────────────
function matchFoerderungen(profil) {
  const { branche, phase, teamgroesse, artPref } = profil;
  return foerderungen
    .map((f) => {
      let score = 0;
      if (f.phase.includes(phase)) score += 40; else score -= 20;
      if (f.branchen.includes("Alle")) score += 20;
      else if (f.branchen.some((b) => b.toLowerCase() === branche.toLowerCase())) score += 30;
      if (teamgroesse >= f.teamMin && teamgroesse <= f.teamMax) score += 20; else score -= 10;
      if (artPref === "Egal" || f.art === artPref) score += 10;
      return { ...f, score: Math.max(0, score) };
    })
    .filter((f) => f.score > 30)
    .sort((a, b) => b.score - a.score);
}

// ─── Icons ──────────────────────────────────────────────────────────────────
const I = {
  arrow: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>,
  check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  euro: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"/></svg>,
  clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>,
  filter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  target: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  layers: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22.54 12.43-1.96-.89-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9-1.96.89a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/></svg>,
  zap: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  globe: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  play: () => <svg width="64" height="64" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="9.5,7.5 16.5,12 9.5,16.5"/></svg>,
};

// ─── Complexity Bar ─────────────────────────────────────────────────────────
function ComplexityBar({ level, labels }) {
  const colors = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{
            width: 40, height: 8, borderRadius: 4,
            background: i <= level ? colors[level - 1] : "#e5e5e5",
            transition: "background 0.3s",
          }} />
        ))}
        <span style={{ marginLeft: 12, fontSize: 14, fontWeight: 600, color: colors[level - 1] }}>
          {labels[level - 1]}
        </span>
      </div>
    </div>
  );
}

// ─── Language flags ─────────────────────────────────────────────────────────
const flags = { de: "DE", en: "EN", fr: "FR", es: "ES" };

// ─── CSS ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--black:#0a0a0a;--dark:#1a1a1a;--g900:#171717;--g800:#262626;--g700:#404040;--g600:#525252;--g500:#737373;--g400:#a3a3a3;--g300:#d4d4d4;--g200:#e5e5e5;--g100:#f5f5f5;--g50:#fafafa;--white:#fff}
  body{font-family:'Inter',-apple-system,sans-serif;color:var(--dark);background:var(--white);-webkit-font-smoothing:antialiased;line-height:1.6}
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--g200)}
  .nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:72px;display:flex;align-items:center;justify-content:space-between}
  .nav-logo{font-size:20px;font-weight:700;letter-spacing:-.5px;cursor:pointer;color:var(--black);display:flex;align-items:center;gap:8px}
  .nav-logo span{color:var(--g500);font-weight:400}
  .nav-links{display:flex;gap:24px;align-items:center}
  .nav-links a{font-size:14px;font-weight:500;color:var(--g600);text-decoration:none;cursor:pointer;transition:color .2s}
  .nav-links a:hover,.nav-links a.active{color:var(--black)}
  .nav-cta{background:var(--black);color:var(--white)!important;padding:10px 24px;border-radius:8px;font-size:14px!important;font-weight:500!important;transition:opacity .2s}
  .nav-cta:hover{opacity:.8}
  .lang-switcher{display:flex;gap:4px;margin-left:8px;border-left:1px solid var(--g200);padding-left:16px}
  .lang-btn{background:none;border:1.5px solid var(--g200);border-radius:6px;padding:4px 8px;font-size:11px;font-weight:600;cursor:pointer;color:var(--g500);font-family:inherit;transition:all .2s}
  .lang-btn:hover{border-color:var(--g400)}
  .lang-btn.active{background:var(--black);color:var(--white);border-color:var(--black)}
  .mobile-toggle{display:none;background:none;border:none;cursor:pointer;color:var(--black);padding:4px}
  .mobile-nav{display:none;position:fixed;top:72px;left:0;right:0;bottom:0;background:var(--white);z-index:99;padding:24px;flex-direction:column}
  .mobile-nav.open{display:flex}
  .mobile-nav a{font-size:18px;font-weight:500;color:var(--g600);text-decoration:none;padding:16px 0;border-bottom:1px solid var(--g100);cursor:pointer}
  .mobile-lang{display:flex;gap:8px;padding:16px 0}
  @media(max-width:768px){.nav-links{display:none}.mobile-toggle{display:block}}
  .page{padding-top:72px;min-height:100vh}

  /* Hero Video */
  .hero-video-wrap{position:relative;overflow:hidden;padding:0;margin-top:-72px;padding-top:72px}
  .hero-video-bg{position:absolute;top:0;left:0;right:0;bottom:0;z-index:0}
  .hero-video-bg video{width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0}
  .hero-video-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(180deg,rgba(0,0,0,.55)0%,rgba(0,0,0,.7)100%);z-index:1}
  .hero-video-content{position:relative;z-index:2;padding:120px 24px 100px;text-align:center;max-width:820px;margin:0 auto}
  .hero-video-content h1{color:var(--white)}
  .hero-video-content p{color:rgba(255,255,255,.75)}
  .hero-video-content .hero-badge{background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);backdrop-filter:blur(10px)}
  .hero-video-content .hero-badge .dot{background:#22c55e}
  .hero-video-content .btn-secondary{background:transparent;color:var(--white);border-color:rgba(255,255,255,.3)}
  .hero-video-content .btn-secondary:hover{border-color:rgba(255,255,255,.6)}

  /* Fallback animated BG */
  .hero-anim-bg{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#0a1628 0%,#0d2137 25%,#0f2b46 50%,#1a1a2e 75%,#0a0a0a 100%);background-size:400% 400%;animation:gradMove 15s ease infinite;z-index:0}
  @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .hamburg-silhouette{position:absolute;bottom:0;left:0;right:0;z-index:1;height:200px;opacity:.15}
  .hamburg-silhouette svg{width:100%;height:100%}

  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--g100);padding:6px 16px;border-radius:100px;font-size:13px;font-weight:500;color:var(--g600);margin-bottom:32px}
  .hero-badge .dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .hero h1,.hero-video-content h1{font-size:clamp(40px,6vw,64px);font-weight:700;line-height:1.05;letter-spacing:-2px;color:var(--black);margin-bottom:24px}
  .hero p,.hero-video-content p{font-size:18px;line-height:1.7;color:var(--g500);max-width:560px;margin:0 auto 48px}
  .hero-buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--black);color:var(--white);padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;border:none;cursor:pointer;transition:all .2s}
  .btn-primary:hover{opacity:.85;transform:translateY(-1px)}
  .btn-secondary{display:inline-flex;align-items:center;gap:8px;background:var(--white);color:var(--black);padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;border:2px solid var(--g200);cursor:pointer;transition:all .2s}
  .btn-secondary:hover{border-color:var(--g400)}

  .stats{display:grid;grid-template-columns:repeat(3,1fr);max-width:700px;margin:0 auto;padding:0 24px 100px;gap:48px;text-align:center}
  .stat-number{font-size:48px;font-weight:700;color:var(--black);letter-spacing:-2px}
  .stat-label{font-size:14px;color:var(--g500);margin-top:4px}
  @media(max-width:600px){.stats{grid-template-columns:1fr;gap:32px}}

  .section{padding:100px 24px;max-width:1200px;margin:0 auto}
  .section-header{text-align:center;margin-bottom:64px}
  .section-header h2{font-size:clamp(32px,4vw,44px);font-weight:700;letter-spacing:-1.5px;color:var(--black);margin-bottom:16px}
  .section-header p{font-size:17px;color:var(--g500);max-width:500px;margin:0 auto}

  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:48px}
  .step{text-align:center;padding:40px 24px}
  .step-icon{width:80px;height:80px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;border:2px solid var(--g200);border-radius:20px;color:var(--black)}
  .step-num{font-size:12px;font-weight:600;color:var(--g400);text-transform:uppercase;letter-spacing:2px;margin-bottom:12px}
  .step h3{font-size:20px;font-weight:600;margin-bottom:12px;color:var(--black)}
  .step p{font-size:15px;color:var(--g500);line-height:1.7}
  @media(max-width:768px){.steps{grid-template-columns:1fr;gap:24px}}

  .match-section{background:var(--g50);border-radius:24px;padding:64px;max-width:720px;margin:0 auto 100px}
  @media(max-width:768px){.match-section{padding:32px 20px;margin:0 20px 60px}}
  .match-section h2{font-size:28px;font-weight:700;letter-spacing:-1px;margin-bottom:8px;text-align:center}
  .match-section>p{font-size:15px;color:var(--g500);text-align:center;margin-bottom:40px}
  .form-group{margin-bottom:24px}
  .form-group label{display:block;font-size:14px;font-weight:600;margin-bottom:8px;color:var(--dark)}
  .form-group select,.form-group input{width:100%;padding:14px 16px;border:2px solid var(--g200);border-radius:12px;font-size:15px;font-family:inherit;background:var(--white);color:var(--dark);transition:border-color .2s;outline:none;-webkit-appearance:none;appearance:none}
  .form-group select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:44px}
  .form-group select:focus,.form-group input:focus{border-color:var(--black)}

  .results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px}
  .results-count{font-size:14px;color:var(--g500);background:var(--g100);padding:6px 14px;border-radius:100px}
  .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
  @media(max-width:400px){.cards-grid{grid-template-columns:1fr}}
  .card{background:var(--white);border:1px solid var(--g200);border-radius:16px;padding:32px;cursor:pointer;transition:all .25s;display:flex;flex-direction:column}
  .card:hover{border-color:var(--g400);box-shadow:0 8px 30px rgba(0,0,0,.06);transform:translateY(-2px)}
  .card-type{display:inline-flex;align-self:flex-start;font-size:12px;font-weight:600;padding:4px 12px;border-radius:6px;margin-bottom:16px;text-transform:uppercase;letter-spacing:.5px}
  .card-type.zuschuss{background:#dcfce7;color:#166534}
  .card-type.kredit{background:#dbeafe;color:#1e40af}
  .card-type.beteiligung{background:#fef3c7;color:#92400e}
  .card-type.stipendium{background:#f3e8ff;color:#6b21a8}
  .card-type.accelerator{background:#ffe4e6;color:#9f1239}
  .card h3{font-size:20px;font-weight:700;margin-bottom:8px;color:var(--black);letter-spacing:-.3px}
  .card-anbieter{font-size:13px;color:var(--g400);margin-bottom:12px}
  .card-desc{font-size:14px;color:var(--g500);line-height:1.6;flex:1;margin-bottom:20px}
  .card-meta{display:flex;gap:16px;align-items:center;padding-top:20px;border-top:1px solid var(--g100);flex-wrap:wrap}
  .card-meta-item{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--g600)}
  .card-score{margin-left:auto;font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;background:var(--g100);color:var(--g600)}
  .card-score.high{background:#dcfce7;color:#166534}

  .detail{max-width:800px;margin:0 auto;padding:48px 24px 100px}
  .detail-back{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--g500);cursor:pointer;margin-bottom:32px;background:none;border:none;font-family:inherit;transition:color .2s}
  .detail-back:hover{color:var(--black)}
  .detail h1{font-size:clamp(32px,5vw,44px);font-weight:700;letter-spacing:-1.5px;margin-bottom:8px}
  .detail-anbieter{font-size:15px;color:var(--g500);margin-bottom:32px}
  .detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:48px}
  @media(max-width:600px){.detail-grid{grid-template-columns:1fr}}
  .detail-stat{background:var(--g50);padding:24px;border-radius:16px}
  .detail-stat-label{font-size:12px;font-weight:600;color:var(--g400);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
  .detail-stat-value{font-size:18px;font-weight:700;color:var(--black)}
  .detail-section{margin-bottom:40px}
  .detail-section h2{font-size:20px;font-weight:700;margin-bottom:16px;color:var(--black);letter-spacing:-.3px}
  .detail-section p{font-size:16px;color:var(--g600);line-height:1.8}
  .detail-section ul{list-style:none;padding:0}
  .detail-section li{display:flex;align-items:flex-start;gap:12px;padding:10px 0;font-size:15px;color:var(--g600)}
  .detail-section li svg{flex-shrink:0;margin-top:2px;color:#22c55e}
  .detail-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
  .detail-tag{font-size:13px;font-weight:500;padding:6px 14px;border-radius:100px;background:var(--g100);color:var(--g600)}
  .detail-link{display:inline-flex;align-items:center;gap:8px;background:var(--black);color:var(--white);padding:14px 28px;border-radius:12px;font-size:15px;font-weight:600;text-decoration:none;transition:opacity .2s}
  .detail-link:hover{opacity:.85}

  .prozess-steps{display:flex;flex-direction:column;gap:0}
  .prozess-step{display:flex;gap:16px;padding:16px 0}
  .prozess-num{width:32px;height:32px;border-radius:50%;background:var(--black);color:var(--white);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
  .prozess-text{font-size:15px;color:var(--g600);line-height:1.6;padding-top:5px}

  .uebersicht-filters{display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap;align-items:center}
  .filter-btn{padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500;border:1.5px solid var(--g200);background:var(--white);color:var(--g600);cursor:pointer;transition:all .2s;font-family:inherit}
  .filter-btn:hover{border-color:var(--g400)}
  .filter-btn.active{background:var(--black);color:var(--white);border-color:var(--black)}

  .about{max-width:720px;margin:0 auto;padding:80px 24px 100px}
  .about h1{font-size:clamp(36px,5vw,52px);font-weight:700;letter-spacing:-2px;margin-bottom:24px;line-height:1.1}
  .about-lead{font-size:20px;color:var(--g500);line-height:1.7;margin-bottom:48px}
  .about h2{font-size:24px;font-weight:700;margin-bottom:16px;margin-top:48px;letter-spacing:-.5px}
  .about p{font-size:16px;color:var(--g600);line-height:1.8;margin-bottom:16px}

  .footer{border-top:1px solid var(--g200);padding:48px 24px}
  .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
  .footer-text{font-size:13px;color:var(--g400)}
  .footer-links{display:flex;gap:24px}
  .footer-links a{font-size:13px;color:var(--g400);text-decoration:none;cursor:pointer}
  .footer-links a:hover{color:var(--g600)}
  .fade-in{opacity:0;transform:translateY(20px);animation:fadeIn .6s ease forwards}
  @keyframes fadeIn{to{opacity:1;transform:translateY(0)}}
`;

// ─── Hamburg Silhouette SVG ─────────────────────────────────────────────────
const HamburgSilhouette = () => (
  <svg viewBox="0 0 1440 200" preserveAspectRatio="none" fill="white">
    <path d="M0,200 L0,140 L60,140 L60,120 L80,120 L80,100 L100,80 L110,80 L120,60 L130,60 L135,40 L140,40 L145,60 L155,60 L165,80 L180,80 L190,100 L200,100 L210,120 L240,120 L240,100 L260,100 L260,80 L270,70 L275,50 L280,50 L285,70 L290,80 L310,80 L310,100 L340,100 L340,120 L380,120 L380,110 L400,110 L420,90 L430,90 L440,70 L445,40 L450,40 L455,70 L460,90 L480,90 L500,110 L540,110 L540,120 L580,120 L580,130 L620,130 L620,110 L640,110 L660,100 L680,100 L700,90 L720,90 L720,100 L740,100 L760,110 L800,110 L800,120 L840,120 L860,115 L880,115 L900,120 L940,120 L940,110 L960,110 L970,100 L975,80 L980,60 L985,40 L988,30 L991,40 L995,60 L1000,80 L1010,100 L1020,110 L1060,110 L1060,120 L1100,120 L1100,130 L1140,130 L1160,125 L1180,125 L1200,130 L1240,130 L1260,120 L1300,120 L1320,130 L1360,130 L1380,125 L1400,125 L1420,130 L1440,130 L1440,200 Z" />
  </svg>
);

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("de");
  const [page, setPage] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterArt, setFilterArt] = useState("Alle");
  const [formData, setFormData] = useState({ branche: "", phase: "Pre-Seed", teamgroesse: 1, artPref: "Egal" });
  const [results, setResults] = useState(null);
  const [prevPage, setPrevPage] = useState("home");

  const t = translations[lang];
  useEffect(() => { window.scrollTo(0, 0); }, [page, detailId]);

  const nav = (p, id) => { setMobileOpen(false); if (p === "detail") { setPrevPage(page); setDetailId(id); } setPage(p); };
  const handleMatch = () => { setResults(matchFoerderungen(formData)); nav("results"); };

  const txt = (obj) => (typeof obj === "string" ? obj : obj[lang] || obj.de);
  const allArts = [t.uebersicht.all, ...new Set(foerderungen.map((f) => f.art))];
  const filtered = filterArt === t.uebersicht.all || filterArt === "Alle" ? foerderungen : foerderungen.filter((f) => f.art === filterArt);
  const detail = foerderungen.find((f) => f.id === detailId);

  const branchenOptions = ["Digital Tech","Industrial Tech","Life Science","FinTech","InsurTech","LegalTech","PropTech","Medien","Games","KI / AI","Social Impact","E-Commerce","SaaS","CleanTech","FoodTech","EdTech","Sonstiges"];

  // Parse antragsprozess into steps
  const parseSteps = (text) => {
    const raw = txt(text);
    return raw.split(/\d+\.\s+/).filter(Boolean).map(s => s.trim().replace(/\.$/, ""));
  };

  return (
    <>
      <style>{css}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => nav("home")}>Fördermatch<span>.hh</span></div>
          <div className="nav-links">
            <a onClick={() => nav("home")} className={page === "home" ? "active" : ""}>{t.nav.start}</a>
            <a onClick={() => nav("uebersicht")} className={page === "uebersicht" ? "active" : ""}>{t.nav.foerderungen}</a>
            <a onClick={() => nav("about")} className={page === "about" ? "active" : ""}>{t.nav.about}</a>
            <a className="nav-cta" onClick={() => nav("match")}>{t.nav.cta}</a>
            <div className="lang-switcher">
              {Object.keys(flags).map((l) => (
                <button key={l} className={`lang-btn${lang === l ? " active" : ""}`} onClick={() => setLang(l)}>{flags[l]}</button>
              ))}
            </div>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <I.close /> : <I.menu />}
          </button>
        </div>
      </nav>
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <a onClick={() => nav("home")}>{t.nav.start}</a>
        <a onClick={() => nav("uebersicht")}>{t.nav.foerderungen}</a>
        <a onClick={() => nav("about")}>{t.nav.about}</a>
        <a onClick={() => nav("match")}>{t.nav.cta}</a>
        <div className="mobile-lang">
          {Object.keys(flags).map((l) => (
            <button key={l} className={`lang-btn${lang === l ? " active" : ""}`} onClick={() => setLang(l)}>{flags[l]}</button>
          ))}
        </div>
      </div>

      {/* ═══ HOME ═══ */}
      {page === "home" && (
        <div className="page fade-in">
          <div className="hero-video-wrap">
            <div className="hero-video-bg">
              <video autoPlay muted loop playsInline poster="" style={{width:"100%",height:"100%",objectFit:"cover"}}>
                <source src="https://videos.pexels.com/video-files/15751198/15751198-hd_1920_1080_25fps.mp4" type="video/mp4" />
              </video>
              <div className="hero-anim-bg" style={{opacity:0}} />
            </div>
            <div className="hero-video-overlay" />
            <div className="hero-video-content">
              <div className="hero-badge"><span className="dot" />{t.hero.badge}</div>
              <h1>{t.hero.h1}</h1>
              <p>{t.hero.p}</p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => nav("match")}>{t.hero.cta1} <I.arrow /></button>
                <button className="btn-secondary" onClick={() => nav("uebersicht")}>{t.hero.cta2}</button>
              </div>
            </div>
          </div>

          <div className="stats" style={{ paddingTop: 80 }}>
            <div><div className="stat-number">{foerderungen.length}</div><div className="stat-label">{t.stats.programs}</div></div>
            <div><div className="stat-number">1,5M+</div><div className="stat-label">{t.stats.volume}</div></div>
            <div><div className="stat-number">100%</div><div className="stat-label">{t.stats.free}</div></div>
          </div>

          <div className="section">
            <div className="section-header"><h2>{t.how.title}</h2><p>{t.how.sub}</p></div>
            <div className="steps">
              <div className="step"><div className="step-icon"><I.layers /></div><div className="step-num">01</div><h3>{t.how.s1t}</h3><p>{t.how.s1p}</p></div>
              <div className="step"><div className="step-icon"><I.target /></div><div className="step-num">02</div><h3>{t.how.s2t}</h3><p>{t.how.s2p}</p></div>
              <div className="step"><div className="step-icon"><I.zap /></div><div className="step-num">03</div><h3>{t.how.s3t}</h3><p>{t.how.s3p}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MATCH ═══ */}
      {page === "match" && (
        <div className="page fade-in">
          <div className="match-section" style={{ marginTop: 48 }}>
            <h2>{t.form.title}</h2>
            <p>{t.form.sub}</p>
            <div className="form-group"><label>{t.form.branche}</label>
              <select value={formData.branche} onChange={(e) => setFormData({ ...formData, branche: e.target.value })}>
                <option value="">{t.form.branchePlaceholder}</option>
                {branchenOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select></div>
            <div className="form-group"><label>{t.form.phase}</label>
              <select value={formData.phase} onChange={(e) => setFormData({ ...formData, phase: e.target.value })}>
                <option value="Pre-Seed">{t.form.preSeed}</option>
                <option value="Seed">{t.form.seed}</option>
              </select></div>
            <div className="form-group"><label>{t.form.team}</label>
              <input type="number" min="1" max="50" value={formData.teamgroesse} onChange={(e) => setFormData({ ...formData, teamgroesse: parseInt(e.target.value) || 1 })} /></div>
            <div className="form-group"><label>{t.form.art}</label>
              <select value={formData.artPref} onChange={(e) => setFormData({ ...formData, artPref: e.target.value })}>
                <option value="Egal">{t.form.artAll}</option>
                <option value="Zuschuss">{t.form.zuschuss}</option>
                <option value="Stipendium">{t.form.stipendium}</option>
                <option value="Kredit">{t.form.kredit}</option>
                <option value="Beteiligung">{t.form.beteiligung}</option>
                <option value="Accelerator">{t.form.accelerator}</option>
              </select></div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleMatch}>{t.form.submit} <I.arrow /></button>
          </div>
        </div>
      )}

      {/* ═══ RESULTS ═══ */}
      {page === "results" && results && (
        <div className="page fade-in"><div className="section">
          <div className="results-header">
            <div><h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-1px" }}>{t.results.title}</h2><p style={{ color: "var(--g500)", fontSize: 15, marginTop: 4 }}>{t.results.sub}</p></div>
            <div style={{ display: "flex", gap: 12 }}>
              <span className="results-count">{results.length} {t.results.hits}</span>
              <button className="btn-secondary" style={{ padding: "8px 20px", fontSize: 14 }} onClick={() => nav("match")}>{t.results.adjust}</button>
            </div>
          </div>
          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}><p style={{ fontSize: 18, color: "var(--g500)", marginBottom: 24 }}>{t.results.noResults}</p><button className="btn-primary" onClick={() => nav("match")}>{t.results.adjustProfile}</button></div>
          ) : (
            <div className="cards-grid">{results.map((f) => (
              <div key={f.id} className="card" onClick={() => nav("detail", f.id)}>
                <span className={`card-type ${f.art.toLowerCase()}`}>{f.art}</span>
                <h3>{f.name}</h3><div className="card-anbieter">{f.anbieter}</div>
                <div className="card-desc">{txt(f.kurz)}</div>
                <div className="card-meta">
                  <span className="card-meta-item"><I.euro /> {f.betrag}</span>
                  <span className={`card-score${f.score >= 70 ? " high" : ""}`}>{f.score}% {t.results.match}</span>
                </div>
              </div>
            ))}</div>
          )}
        </div></div>
      )}

      {/* ═══ ÜBERSICHT ═══ */}
      {page === "uebersicht" && (
        <div className="page fade-in"><div className="section">
          <div className="section-header"><h2>{t.uebersicht.title}</h2><p>{foerderungen.length} {t.uebersicht.sub}</p></div>
          <div className="uebersicht-filters">
            <I.filter />
            {allArts.map((a) => (
              <button key={a} className={`filter-btn${filterArt === a ? " active" : ""}`} onClick={() => setFilterArt(a)}>{a}</button>
            ))}
          </div>
          <div className="cards-grid">{filtered.map((f) => (
            <div key={f.id} className="card" onClick={() => nav("detail", f.id)}>
              <span className={`card-type ${f.art.toLowerCase()}`}>{f.art}</span>
              <h3>{f.name}</h3><div className="card-anbieter">{f.anbieter}</div>
              <div className="card-desc">{txt(f.kurz)}</div>
              <div className="card-meta">
                <span className="card-meta-item"><I.euro /> {f.betrag}</span>
                <span className="card-meta-item"><I.clock /> {f.laufzeit}</span>
              </div>
            </div>
          ))}</div>
        </div></div>
      )}

      {/* ═══ DETAIL ═══ */}
      {page === "detail" && detail && (
        <div className="page fade-in"><div className="detail">
          <button className="detail-back" onClick={() => nav(prevPage)}><I.back /> {t.detail.back}</button>
          <span className={`card-type ${detail.art.toLowerCase()}`} style={{ marginBottom: 16, display: "inline-flex" }}>{detail.art}</span>
          <h1>{detail.name}</h1>
          <div className="detail-anbieter">{detail.anbieter}</div>
          <div className="detail-tags">{detail.tags.map((tag) => <span key={tag} className="detail-tag">{tag}</span>)}</div>

          <div className="detail-grid">
            <div className="detail-stat"><div className="detail-stat-label">{t.detail.betrag}</div><div className="detail-stat-value">{detail.betrag}</div></div>
            <div className="detail-stat"><div className="detail-stat-label">{t.detail.laufzeit}</div><div className="detail-stat-value">{detail.laufzeit}</div></div>
            <div className="detail-stat"><div className="detail-stat-label">{t.detail.phase}</div><div className="detail-stat-value">{detail.phase.join(", ")}</div></div>
          </div>

          {/* Complexity */}
          <div className="detail-section">
            <h2>{t.detail.komplexitaet}</h2>
            <ComplexityBar level={detail.komplexitaet} labels={t.detail.komplexStufen} />
          </div>

          <div className="detail-section"><h2>{t.detail.beschreibung}</h2><p>{txt(detail.beschreibung)}</p></div>

          {/* Application Process */}
          <div className="detail-section">
            <h2>{t.detail.antragsprozess}</h2>
            <div className="prozess-steps">
              {parseSteps(detail.antragsprozess).map((step, i) => (
                <div key={i} className="prozess-step">
                  <div className="prozess-num">{i + 1}</div>
                  <div className="prozess-text">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section"><h2>{t.detail.voraussetzungen}</h2>
            <ul>{(txt(detail.voraussetzungen) || []).map((v, i) => <li key={i}><I.check /> {v}</li>)}</ul></div>
          <div className="detail-section"><h2>{t.detail.branchen}</h2>
            <div className="detail-tags">{detail.branchen.map((b) => <span key={b} className="detail-tag">{b}</span>)}</div></div>

          {/* Alumni Section */}
          {detail.alumni && detail.alumni.length > 0 && (
            <div className="detail-section">
              <h2>{t.detail.alumni}</h2>
              <p style={{ fontSize: 14, color: "var(--g500)", marginBottom: 20, lineHeight: 1.7 }}>{t.detail.alumniSub}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {detail.alumni.map((name) => (
                  <div key={name} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 18px", borderRadius: 12,
                    border: "1.5px solid var(--g200)", background: "var(--white)",
                    fontSize: 14, fontWeight: 600, color: "var(--black)",
                    transition: "all 0.2s", cursor: "default",
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <a className="detail-link" href={detail.link} target="_blank" rel="noopener noreferrer">{t.detail.zurFoerderung} <I.link /></a>
        </div></div>
      )}

      {/* ═══ ABOUT ═══ */}
      {page === "about" && (
        <div className="page fade-in"><div className="about">
          <h1>{t.about.h1}</h1>
          <p className="about-lead">{t.about.lead}</p>
          <h2>{t.about.why}</h2><p>{t.about.whyP}</p>
          <h2>{t.about.howTitle}</h2><p>{t.about.howP}</p>
          <h2>{t.about.freeTitle}</h2><p>{t.about.freeP}</p>
          <h2>{t.about.dataTitle}</h2><p>{t.about.dataP.replace("{count}", foerderungen.length)}</p>
        </div></div>
      )}

      <footer className="footer"><div className="footer-inner">
        <div className="footer-text">Fördermatch.hh — {t.footer}</div>
        <div className="footer-links">
          <a onClick={() => nav("uebersicht")}>{t.nav.foerderungen}</a>
          <a onClick={() => nav("about")}>{t.nav.about}</a>
        </div>
      </div></footer>
    </>
  );
}
