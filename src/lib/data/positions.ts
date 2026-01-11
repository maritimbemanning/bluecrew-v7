import type { Position, PositionData } from '@/types/positions';

/**
 * Comprehensive database of maritime positions
 *
 * Data sources:
 * - SSB (Statistics Norway) salary data
 * - NHO Sjøfart industry standards
 * - STCW certification requirements
 * - Industry interviews and research
 */
export const POSITIONS: Record<Position, PositionData> = {
  kaptein: {
    id: 'kaptein',
    name: 'Kaptein',
    nameDefinite: 'kapteinen',
    slug: 'kaptein',
    salaryRange: {
      min: 600000,
      max: 1200000,
      typical: 850000,
    },
    education: [
      'Nautisk fagskole (3 år)',
      'Bachelor i nautikk (anbefalt)',
      'Sjøkapteinutdanning',
    ],
    certifications: [
      'STCW II/2 - Kaptein',
      'GOC (General Operator Certificate)',
      'Basic Safety Training',
      'Advanced Fire Fighting',
      'Medical Care',
      'Ship Security Officer (SSO)',
    ],
    experienceYears: {
      min: 10,
      typical: 15,
    },
    responsibilities: [
      'Overordnet ansvar for skip, mannskap og last',
      'Navigasjon og sikker seilas',
      'Compliance med maritime regelverk',
      'Økonomisk drift av skipet',
      'Personalledelse og HMS-ansvar',
      'Kommunikasjon med rederi og myndigheter',
    ],
    dailyTasks: [
      'Planlegge seilingsrute og overvåke navigasjon',
      'Lede brovakt og delegere oppgaver',
      'Gjennomføre sikkerhetsinspeksjoner',
      'Administrere dokumentasjon og rapportering',
      'Holde møter med offiserer',
      'Kontakt med havnemyndigheter og loser',
    ],
    workEnvironment: 'Bro/kommando, offshore/cruise/lasteskip',
    careerPath: {
      entry: 'Matros',
      progression: [
        'Matros',
        'Lettmatros',
        '3. Styrmann',
        '2. Styrmann',
        '1. Styrmann',
        'Kaptein',
      ],
      specializations: [
        'Offshore kaptein',
        'Cruise kaptein',
        'Tankskip kaptein',
        'Havbruk fartøysjef',
      ],
    },
    keywords: {
      primary: ['kaptein lønn', 'skipsfører lønn', 'kaptein', 'skipsfører'],
      secondary: ['kaptein utdanning', 'bli kaptein', 'sjøkaptein', 'nautikk'],
      longtail: [
        'hva tjener en kaptein i Norge',
        'kaptein lønn offshore',
        'utdanning for å bli kaptein',
        'kaptein karriere',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Lønnsforskjeller mellom offshore, cruise og last',
        'Erfaring påvirker lønn betydelig (10+ år)',
        'Rotasjonsordning og bonuser',
        'Ansvar for skip påvirker lønn',
      ],
      karriereFocus: [
        'Lang karrierevei (10-15 år fra matros)',
        'Krevende utdanning og sertifiseringer',
        'Stor ansvar for liv, miljø og verdier',
        'Ledelseserfaring viktig',
      ],
      faqTopics: [
        'Hvor mye tjener en kaptein?',
        'Hvor lang tid tar det å bli kaptein?',
        'Hvilke sertifikater trenger en kaptein?',
        'Hva er forskjellen på offshore og cruise kaptein?',
        'Kan man bli kaptein uten nautisk fagskole?',
      ],
    },
  },

  styrmann: {
    id: 'styrmann',
    name: 'Styrmann',
    nameDefinite: 'styrmannen',
    slug: 'styrmann',
    salaryRange: {
      min: 450000,
      max: 850000,
      typical: 620000,
    },
    education: [
      'Nautisk fagskole (3 år)',
      'Bachelor i nautikk',
      'Styrmannsutdanning (1., 2., eller 3. styrmann)',
    ],
    certifications: [
      'STCW II/1 - Styrmann (Chief Mate)',
      'STCW II/2 - Vakthavende styrmann (Officer of the Watch)',
      'GOC (General Operator Certificate)',
      'Basic Safety Training',
      'Advanced Fire Fighting',
    ],
    experienceYears: {
      min: 5,
      typical: 8,
    },
    responsibilities: [
      'Navigasjon og brovakt',
      'Lastoperasjoner og lossing/lasting',
      'Vedlikehold av dekk og utstyr',
      'Sikkerhetsutstyr og HMS-rapportering',
      'Assistere kapteinen i daglig drift',
      'Ansvarsområder etter rang (1., 2., 3. styrmann)',
    ],
    dailyTasks: [
      'Stå brovakt og navigere skipet',
      'Planlegge og overvåke lastoperasjoner',
      'Inspisere dekk og sikkerhetsutstyr',
      'Oppdatere kart og navigasjonsutstyr',
      'Lede dekksmannskap',
      'Rapportere til kaptein',
    ],
    workEnvironment: 'Bro/dekk, offshore/cruise/lasteskip',
    careerPath: {
      entry: 'Lettmatros',
      progression: [
        'Lettmatros',
        'Matros',
        '3. Styrmann',
        '2. Styrmann',
        '1. Styrmann',
        'Kaptein',
      ],
      specializations: [
        'Offshore styrmann',
        'Tankskip styrmann',
        'Cruise styrmann',
        'Lasteskip styrmann',
      ],
    },
    keywords: {
      primary: ['styrmann lønn', 'styrmann', 'mate lønn', 'navigatør'],
      secondary: [
        'styrmann utdanning',
        'bli styrmann',
        'nautisk fagskole',
        'dekksoffiser',
      ],
      longtail: [
        'hva tjener en styrmann i Norge',
        'styrmann lønn offshore',
        'utdanning for å bli styrmann',
        'styrmann karriere',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Lønnsforskjell mellom 1., 2. og 3. styrmann',
        'Offshore styrmann tjener mer enn cruise',
        'Erfaring påvirker lønn (5-10 år)',
        'Rotasjon og overtidstillegg',
      ],
      karriereFocus: [
        'Naturlig steget mot kaptein',
        'Viktig læreposisjon med mye ansvar',
        '5-8 år erfaring kreves',
        'Bred kompetanse innen navigasjon og last',
      ],
      faqTopics: [
        'Hvor mye tjener en styrmann?',
        'Hva er forskjellen på 1., 2. og 3. styrmann?',
        'Hvor lang tid tar det å bli styrmann?',
        'Hvilke sertifikater trenger en styrmann?',
        'Kan man hoppe over styrmann og bli kaptein?',
      ],
    },
  },

  maskinist: {
    id: 'maskinist',
    name: 'Maskinist',
    nameDefinite: 'maskinisten',
    slug: 'maskinist',
    salaryRange: {
      min: 500000,
      max: 950000,
      typical: 680000,
    },
    education: [
      'Teknisk fagskole maritim (3 år)',
      'Bachelor i maskinteknologi maritim',
      'Maskinist utdanning (1., 2., eller 3. maskinist)',
    ],
    certifications: [
      'STCW III/2 - Maskinist (Chief Engineer)',
      'STCW III/1 - Vakthavende maskinist',
      'Basic Safety Training',
      'Advanced Fire Fighting',
      'High Voltage Operations (på moderne skip)',
    ],
    experienceYears: {
      min: 6,
      typical: 10,
    },
    responsibilities: [
      'Drift og vedlikehold av maskineri',
      'Overvåke hovedmotor og hjelpemaskiner',
      'Planlegge vedlikehold og reparasjoner',
      'HMS-ansvar for maskinrom',
      'Lede maskinpersonell',
      'Compliance med miljøregelverk (utslipp, drivstoff)',
    ],
    dailyTasks: [
      'Stå maskinkontrollvakt',
      'Inspisere maskiner og systemer',
      'Utføre vedlikehold og reparasjoner',
      'Overvåke drivstofforbruk og utslipp',
      'Rapportere tekniske avvik',
      'Bestille reservedeler og utstyr',
    ],
    workEnvironment: 'Maskinrom/verksted, offshore/cruise/lasteskip',
    careerPath: {
      entry: 'Maskinlærling',
      progression: [
        'Maskinlærling',
        'Motormann',
        '3. Maskinist',
        '2. Maskinist',
        '1. Maskinist',
        'Maskinssjef',
      ],
      specializations: [
        'Offshore maskinist',
        'Cruise maskinist',
        'Tankskip maskinist',
        'Dieselmotor spesialist',
        'Miljø- og bærekraftsansvarlig',
      ],
    },
    keywords: {
      primary: [
        'maskinist lønn',
        'maskinist',
        'skipsmaskinist',
        'maskinoffiser',
      ],
      secondary: [
        'maskinist utdanning',
        'bli maskinist',
        'maritim teknisk fagskole',
        'motormann',
      ],
      longtail: [
        'hva tjener en maskinist i Norge',
        'maskinist lønn offshore',
        'utdanning for å bli maskinist',
        'maskinist karriere',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Lønnsforskjell mellom 1., 2. og 3. maskinist',
        'Teknisk kompetanse påvirker lønn',
        'Offshore og spesialiserte skip gir høyere lønn',
        'Erfaring med moderne systemer øker verdi',
      ],
      karriereFocus: [
        'Krevende teknisk utdanning',
        'Høyt ansvar for skipets drift',
        '6-10 års erfaring kreves for toppstillinger',
        'Kombinasjon av mekanikk, elektronikk og miljø',
      ],
      faqTopics: [
        'Hvor mye tjener en maskinist?',
        'Hva er forskjellen på maskinist og ETO?',
        'Hvor lang tid tar det å bli maskinist?',
        'Hvilke sertifikater trenger en maskinist?',
        'Kan man bli maskinist uten teknisk fagskole?',
      ],
    },
  },

  eto: {
    id: 'eto',
    name: 'ETO',
    nameDefinite: 'ETOen',
    slug: 'eto',
    salaryRange: {
      min: 550000,
      max: 950000,
      typical: 720000,
    },
    education: [
      'Elektrofagutdanning (4 år)',
      'Høyskole/Bachelor i elektroteknikk eller automatisering',
      'STCW ETO-kurs og sertifisering',
    ],
    certifications: [
      'STCW III/6 - Electro-Technical Officer',
      'Basic Safety Training',
      'Advanced Fire Fighting',
      'High Voltage Operations',
      'Autorisasjon elektriker (anbefalt)',
    ],
    experienceYears: {
      min: 4,
      typical: 7,
    },
    responsibilities: [
      'Drift og vedlikehold av elektriske systemer',
      'Navigasjons- og kommunikasjonsutstyr',
      'Automatisering og kontrollsystemer',
      'Vedlikehold av IT-nettverk ombord',
      'HMS for elektriske installasjoner',
      'Samarbeid med maskinist og dekksoffiserer',
    ],
    dailyTasks: [
      'Inspisere elektriske systemer',
      'Feilsøke og reparere elektronikk',
      'Vedlikeholde navigasjonsutstyr (radar, GPS, AIS)',
      'Oppdatere software og systemer',
      'Rapportere tekniske avvik',
      'Koordinere med leverandører og tekniske partnere',
    ],
    workEnvironment: 'Maskinrom/kontrollrom, moderne offshore/cruise',
    careerPath: {
      entry: 'Elektriker (fagbrev)',
      progression: [
        'Elektriker (fagbrev)',
        'Elektroingeniør/bachelor',
        'ETO offshore',
        'Senior ETO',
        'Fleet ETO / teknisk leder',
      ],
      specializations: [
        'Offshore ETO',
        'Cruise ship ETO',
        'DP (Dynamic Positioning) spesialist',
        'Automasjonsansvarlig',
        'IT/nettverk ombord',
      ],
    },
    keywords: {
      primary: ['ETO lønn', 'ETO', 'Electro-Technical Officer', 'elektrooffiser'],
      secondary: [
        'ETO utdanning',
        'bli ETO',
        'elektriker offshore',
        'maritime elektrosystemer',
      ],
      longtail: [
        'hva tjener en ETO i Norge',
        'ETO lønn offshore',
        'utdanning for å bli ETO',
        'ETO karriere',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Ny og høyt etterspurt stilling',
        'Moderne skip krever ETO',
        'Høyere lønn på komplekse offshorerigger',
        'Erfaring med automasjon gir høyere lønn',
      ],
      karriereFocus: [
        'Relativt ny stilling (STCW Manila 2010)',
        'Høy etterspørsel, lavt tilbud av kvalifiserte',
        'Kombinerer elektro, elektronikk og IT',
        'Kritisk for moderne skipsdrift',
      ],
      faqTopics: [
        'Hva er en ETO?',
        'Hvor mye tjener en ETO?',
        'Hva er forskjellen på ETO og maskinist?',
        'Kan elektriker bli ETO?',
        'Hvilke skip trenger ETO?',
      ],
    },
  },

  matros: {
    id: 'matros',
    name: 'Matros',
    nameDefinite: 'matrosen',
    slug: 'matros',
    salaryRange: {
      min: 420000,
      max: 650000,
      typical: 520000,
    },
    education: [
      'Videregående maritim skole (3 år)',
      'Matrosutdanning (fagbrev)',
      'Læretid ombord (praktisk)',
    ],
    certifications: [
      'STCW II/4 - Matros',
      'Basic Safety Training',
      'ROC (Restricted Operator Certificate)',
      'Truck/kran sertifikat (avhengig av skip)',
    ],
    experienceYears: {
      min: 0,
      typical: 3,
    },
    responsibilities: [
      'Dekksarbeid og vedlikehold',
      'Fortøyning og ankring',
      'Vakthold og utkikk',
      'Lastehåndtering',
      'Assistere styrmenn',
      'Sikkerhetsberedskap',
    ],
    dailyTasks: [
      'Stå vakt på broen',
      'Vedlikeholde dekk (maling, reparasjoner)',
      'Fortøye ved kai og håndtere ankring',
      'Assistere ved lasting/lossing',
      'Inspisere sikkerhetsutstyr',
      'Delta i brann- og evakueringsøvelser',
    ],
    workEnvironment: 'Dekk/utendørs, alle typer skip',
    careerPath: {
      entry: 'Lettmatros',
      progression: [
        'Lettmatros',
        'Matros',
        'Båtsmann',
        '3. Styrmann',
        '2. Styrmann',
        '1. Styrmann',
        'Kaptein',
      ],
      specializations: [
        'Offshore matros',
        'ROV matros',
        'Kran operatør',
        'Havbruk matros',
        'Tankskip matros',
      ],
    },
    keywords: {
      primary: ['matros lønn', 'matros', 'sjømann lønn', 'dekksmann'],
      secondary: [
        'matros utdanning',
        'bli matros',
        'matros skole',
        'maritime videregående',
      ],
      longtail: [
        'hva tjener en matros i Norge',
        'matros lønn offshore',
        'utdanning for å bli matros',
        'matros karriere',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Variert lønn basert på sektor (offshore høyest)',
        'Erfaring og spesialkompetanse (kran, ROV) øker lønn',
        'Rotasjon offshore gir gode tillegg',
        'Inngangsstilling med god karrierevei',
      ],
      karriereFocus: [
        'Starten på nautisk karriere',
        'Viktig praktisk erfaring',
        'Mulighet for videreutdanning til styrmann',
        'Bred erfaringsbase på forskjellige skip',
      ],
      faqTopics: [
        'Hvor mye tjener en matros?',
        'Hvordan bli matros?',
        'Hva gjør en matros?',
        'Kan man bli styrmann uten å være matros først?',
        'Hvor lang tid tar matrosutdanning?',
      ],
    },
  },

  kokk: {
    id: 'kokk',
    name: 'Kokk',
    nameDefinite: 'kokken',
    slug: 'kokk',
    salaryRange: {
      min: 400000,
      max: 650000,
      typical: 500000,
    },
    education: [
      'Fagbrev kokk',
      'Hotell- og restaurantfag (videregående)',
      'Hygienekurs (obligatorisk)',
    ],
    certifications: [
      'Fagbrev kokk',
      'Hygienekurs (Basic Food Hygiene)',
      'Basic Safety Training',
      'HACCP-kurs',
    ],
    experienceYears: {
      min: 2,
      typical: 5,
    },
    responsibilities: [
      'Planlegge og tilberede måltider',
      'Matinnkjøp og lagerhold',
      'Kostnadskontroll og menyplanlegging',
      'Hygiene og mattrygghet',
      'Diettbehov og allergihåndtering',
      'Avfallshåndtering ombord',
    ],
    dailyTasks: [
      'Tilberede frokost, lunsj og middag',
      'Lage mellommåltider og nattmat',
      'Planlegge menyer og bestille proviant',
      'Holde renhold i bysse/kombys',
      'Håndtere spesielle dietter',
      'Lagerrotasjon (FIFO)',
    ],
    workEnvironment: 'Bysse/kombys, alle typer skip',
    careerPath: {
      entry: 'Kokkelærling',
      progression: [
        'Kokkelærling',
        'Kokk offshore/skip',
        'Hovmester',
        'Kjøkkensjef cruise',
        'Food manager flåte',
      ],
      specializations: [
        'Cruise kokk',
        'Offshore kokk',
        'Havbruk kokk',
        'Hovmester',
        'Cateringansvarlig',
      ],
    },
    keywords: {
      primary: ['kokk lønn', 'skip kokk', 'offshore kokk', 'skipskokk'],
      secondary: [
        'kokk offshore utdanning',
        'bli kokk til sjøs',
        'maritime kokk',
        'bysse kokk',
      ],
      longtail: [
        'hva tjener en kokk offshore',
        'kokk lønn skip Norge',
        'utdanning for å bli skipskokk',
        'kokk karriere maritim',
      ],
    },
    contentHints: {
      lonnFocus: [
        'Offshore kokk tjener best',
        'Cruise kokk har lavere lønn men mer erfaring',
        'Små besetninger (6-12 personer) vs store skip',
        'Rotasjon og tillegg påvirker totallønn',
      ],
      karriereFocus: [
        'Annerledes arbeidsmiljø enn land',
        'Viktig rolle for mannskapets trivsel',
        'Begrensede råvarer og lagerplass',
        'Kreativitet innenfor rammer',
      ],
      faqTopics: [
        'Hvor mye tjener en skipskokk?',
        'Hvordan bli kokk offshore?',
        'Hva er forskjellen på kokk på land og til sjøs?',
        'Trenger man fagbrev for å jobbe som kokk til sjøs?',
        'Hvor mange måltider lager en skipskokk per dag?',
      ],
    },
  },
};

/**
 * Helper to get position by ID
 */
export function getPosition(id: Position): PositionData {
  const position = POSITIONS[id];
  if (!position) {
    throw new Error(`Position not found: ${id}`);
  }
  return position;
}

/**
 * Helper to get all positions as array
 */
export function getAllPositions(): PositionData[] {
  return Object.values(POSITIONS);
}

/**
 * Helper to get position by slug
 */
export function getPositionBySlug(slug: string): PositionData | undefined {
  return getAllPositions().find((pos) => pos.slug === slug);
}
