/**
 * Kampanje Stillingsdata
 * Informasjon om offshore-stillinger for kampanjeskjemaer
 */

export interface StillingsKrav {
  sertifikater: string[];
  lover: string[];
}

export interface StillingsKvalifikasjoner {
  onsket: string[];
  fordel: string[];
}

export interface StillingsInfo {
  tittel: string;
  kortNavn: string;
  beskrivelse: string;
  segment: string;
  lonnRange: string;
  turnus: string;
  krav: StillingsKrav;
  kvalifikasjoner: StillingsKvalifikasjoner;
  arbeidsoppgaver: string[];
}

export const OFFSHORE_STILLINGER: Record<string, StillingsInfo> = {
  riggere: {
    tittel: "Rigger / Lifting & Rigging Technician",
    kortNavn: "Riggere",
    beskrivelse: "Som rigger er du ansvarlig for sikker løfting og flytting av tung last offshore. Du arbeider tett med kranførere og dekksmannskap for å planlegge og gjennomføre løfteoperasjoner.",
    segment: "offshore",
    lonnRange: "550 000 - 850 000 kr/år",
    turnus: "2/4 rotasjon",
    krav: {
      sertifikater: [
        "G11 Anhuker/Signalgiver",
        "G4 Bro- og Traverskran (fordel)",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "Helseerklæring for arbeid offshore",
      ],
      lover: [
        "Arbeidsmiljøloven § 10",
        "Forskrift om utførelse av arbeid § 10-1 til 10-4",
        "NORSOK R-003 Løfteoperasjoner",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring fra rigging og løfteoperasjoner",
        "Kjennskap til NORSOK-standarder",
        "Norsk- eller skandinavisk-talende",
        "Fagbrev som industrimekaniker eller lignende",
      ],
      fordel: [
        "Erfaring fra subsea-løft",
        "LEEA-sertifisering",
        "Erfaring med tunge løft >100 tonn",
      ],
    },
    arbeidsoppgaver: [
      "Planlegge og gjennomføre løfteoperasjoner",
      "Inspisere løfteutstyr (stropper, sjakler, kjettinger)",
      "Signalgiving til kranfører",
      "Dokumentere løfteoperasjoner",
      "Vedlikehold av løfteutstyr",
    ],
  },

  elektriker: {
    tittel: "Elektriker Offshore / Elektro Fagarbeider",
    kortNavn: "Elektriker",
    beskrivelse: "Som elektriker offshore utfører du installasjon, vedlikehold og feilsøking på elektriske anlegg og utstyr. Du jobber med alt fra kraftforsyning til instrumentering.",
    segment: "offshore",
    lonnRange: "600 000 - 950 000 kr/år",
    turnus: "2/4 rotasjon",
    krav: {
      sertifikater: [
        "Fagbrev som elektriker eller elektromontør",
        "FSE (Forskrift om Sikkerhet ved Elektrisk arbeid)",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "Helseerklæring for arbeid offshore",
      ],
      lover: [
        "Forskrift om elektriske lavspenningsanlegg (FEL)",
        "Forskrift om sikkerhet ved arbeid i og drift av elektriske anlegg (FSE)",
        "Petroleumstilsynets regelverk",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring fra offshore eller industri",
        "Norsk- eller skandinavisk-talende",
        "Kjennskap til Ex-utstyr og ATEX",
        "Instrumenteringskompetanse",
      ],
      fordel: [
        "Erfaring med ABB/Siemens PLS-systemer",
        "Fiberoptikk-sertifisering",
        "Erfaring med subsea-utstyr",
      ],
    },
    arbeidsoppgaver: [
      "Installasjon av elektrisk utstyr",
      "Forebyggende vedlikehold",
      "Feilsøking og reparasjoner",
      "Dokumentasjon og samsvarserklæringer",
      "Delta i arbeidstillatelser (AT/PT)",
    ],
  },

  sveiser: {
    tittel: "Sveiser Offshore / Industrirørlegger",
    kortNavn: "Sveiser",
    beskrivelse: "Som sveiser offshore utfører du sveisearbeid på prosessrør, strukturer og utstyr. Du arbeider etter strenge krav til kvalitet og dokumentasjon.",
    segment: "offshore",
    lonnRange: "600 000 - 900 000 kr/år",
    turnus: "2/4 rotasjon",
    krav: {
      sertifikater: [
        "Fagbrev som sveiser eller platearbeider",
        "Gyldig sveisesertifikat (ISO 9606 / EN 287)",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "Helseerklæring for arbeid offshore",
      ],
      lover: [
        "NORSOK M-101 Structural steel fabrication",
        "NORSOK M-601 Welding and inspection of piping",
        "Petroleumstilsynets regelverk",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring fra offshore eller verftsindustri",
        "Norsk- eller skandinavisk-talende",
        "TIG/MIG/MAG-sertifiseringer",
        "Erfaring med rustfritt og duplex",
      ],
      fordel: [
        "NDT-godkjenning (VT, MT, PT)",
        "Erfaring med subsea-sveising",
        "Orbitalsveisingskompetanse",
      ],
    },
    arbeidsoppgaver: [
      "Sveisearbeid på rør og strukturer",
      "Forberedelse av sveisefuger",
      "Kvalitetskontroll av egne sveiser",
      "Dokumentasjon iht. WPS/PQR",
      "Vedlikehold av sveiseutstyr",
    ],
  },

  mekaniker: {
    tittel: "Mekaniker Offshore / Industrimekaniker",
    kortNavn: "Mekaniker",
    beskrivelse: "Som mekaniker offshore utfører du vedlikehold og reparasjoner på prosessutstyr, pumper, kompressorer og annet mekanisk utstyr.",
    segment: "offshore",
    lonnRange: "550 000 - 850 000 kr/år",
    turnus: "2/4 rotasjon",
    krav: {
      sertifikater: [
        "Fagbrev som industrimekaniker eller lignende",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "Helseerklæring for arbeid offshore",
      ],
      lover: [
        "Arbeidsmiljøloven kapittel 4",
        "Forskrift om utførelse av arbeid",
        "Petroleumstilsynets regelverk",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring fra offshore eller prosessindustri",
        "Norsk- eller skandinavisk-talende",
        "Hydraulikk- og pneumatikk-kompetanse",
        "Kjennskap til rotererende utstyr",
      ],
      fordel: [
        "Erfaring med Bornemann/Sulzer pumper",
        "Kompressorkompetanse",
        "Erfaring med subsea-utstyr",
      ],
    },
    arbeidsoppgaver: [
      "Forebyggende og korrigerende vedlikehold",
      "Feilsøking på mekanisk utstyr",
      "Demontering og montering",
      "Alignment og balansering",
      "Dokumentasjon i vedlikeholdssystem (SAP/Maximo)",
    ],
  },

  rov: {
    tittel: "ROV-operatør / Pilot-Technician",
    kortNavn: "ROV",
    beskrivelse: "Som ROV-operatør styrer du undervannsroboter for inspeksjon, vedlikehold og reparasjoner på undervannsinstallasjoner.",
    segment: "offshore",
    lonnRange: "700 000 - 1 200 000 kr/år",
    turnus: "2/4 eller prosjektbasert",
    krav: {
      sertifikater: [
        "ROV Pilot/Tech-sertifisering (IMCA eller tilsvarende)",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "Helseerklæring for arbeid offshore",
      ],
      lover: [
        "IMCA R 004 Competence for ROV Personnel",
        "Petroleumstilsynets regelverk",
        "DNV-GL standarder for ROV-operasjoner",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring med Schilling, Oceaneering eller Forum ROV",
        "Norsk- eller skandinavisk-talende",
        "Elektromekanisk bakgrunn",
        "Subsea-erfaring",
      ],
      fordel: [
        "Hydraulikksertifikat",
        "Elektro-kompetanse",
        "Erfaring med IMR-operasjoner",
      ],
    },
    arbeidsoppgaver: [
      "Operere ROV under subsea-operasjoner",
      "Vedlikehold av ROV-system",
      "Dokumentere undervannsinspeksjoner",
      "Verktøyoperasjoner (kutting, torqueing)",
      "Assistere ved løft og installasjon",
    ],
  },

  eto: {
    tittel: "Elektro Teknisk Offiser (ETO)",
    kortNavn: "ETO",
    beskrivelse: "Som ETO er du ansvarlig for drift og vedlikehold av alle elektriske og elektroniske systemer om bord på skip eller flytende enheter.",
    segment: "offshore",
    lonnRange: "800 000 - 1 100 000 kr/år",
    turnus: "2/4 eller prosjektbasert",
    krav: {
      sertifikater: [
        "ETO-sertifikat (STCW Regulation III/6)",
        "Gyldig helseerklæring for sjøfolk",
        "Grunnleggende sikkerhets- og beredskapskurs (GSK/BOSIET)",
        "GMDSS-sertifikat",
      ],
      lover: [
        "STCW-konvensjonen",
        "ISM-koden",
        "Sjøfartsdirektoratets forskrifter",
      ],
    },
    kvalifikasjoner: {
      onsket: [
        "Erfaring fra offshore-fartøy eller rigger",
        "Norsk- eller skandinavisk-talende",
        "Automations-/PLS-kompetanse",
        "DP-systemkunnskap",
      ],
      fordel: [
        "Erfaring med Kongsberg Maritime",
        "Nødkraftsystemer",
        "Erfaring med DP2/DP3-fartøy",
      ],
    },
    arbeidsoppgaver: [
      "Drift av elektriske anlegg",
      "Vedlikehold av navigasjons- og kommunikasjonsutstyr",
      "Feilsøking på automasjonssystemer",
      "Dokumentasjon og samsvar",
      "Bestilling av reservedeler",
    ],
  },
};

export function getStillingsInfo(stilling: string): StillingsInfo | null {
  return OFFSHORE_STILLINGER[stilling] || null;
}
