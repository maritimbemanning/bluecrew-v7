-- Seed data: 13 realistic job postings for Bluecrew AS
-- All positions are "løpende rekruttering" (ongoing recruitment)
-- Bluecrew AS is the employer (company_name = NULL shows "Bluecrew AS")

INSERT INTO public.job_postings (
  title, slug, description, short_description, job_type, category, status, location,
  fylke, kommune, region, company_name, vessel_name, salary_min, salary_max, salary_text,
  start_date, application_deadline, published_at, contact_email, contact_phone, meta_title, meta_description
) VALUES

-- DEKK POSITIONS
('Matros - Servicefartøy', 'matros-servicefartoy', 'Bluecrew rekrutterer løpende matroser til servicefartøy for våre kunder innen havbruk og maritim sektor.

Vi ser etter deg med:
- Gyldig STCW-sertifikater
- D5/D6 sertifikat (ønskelig)
- Erfaring fra servicefartøy eller havbruk
- Gode samarbeidsevner

Vi tilbyr:
- Konkurransedyktig lønn
- Varierte oppdrag langs kysten
- Fleksible rotasjonsordninger
- Fast kontaktperson i Bluecrew

Dette er løpende rekruttering - vi kontakter deg når relevante oppdrag dukker opp.', 'Løpende rekruttering av matroser til servicefartøy. Registrer deg i vår database.', 'Fast', 'Dekk', 'active', 'Vestland / Trøndelag', 'Vestland', 'Bergen', 'Vestlandet', NULL, NULL, 620000, 750000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Matros Servicefartøy | Bluecrew', 'Søk stilling som matros på servicefartøy. Løpende rekruttering til havbruk og maritim sektor.'),

('Matros - Subsea/Offshore', 'matros-subsea-offshore', 'Bluecrew søker kontinuerlig etter matroser til subsea- og offshore-operasjoner for våre kunder.

Krav:
- Gyldig STCW-sertifikater
- Offshore sikkerhetskurs (BOSIET/HUET)
- Minimum 1 års erfaring fra offshore
- God fysikk og helse

Vi tilbyr:
- Konkurransedyktig lønn
- 2-2-2-4 eller lignende turnus
- Oppdrag for ledende offshore-rederier
- Karrieremuligheter

Løpende rekruttering - registrer deg for å bli vurdert til fremtidige oppdrag.', 'Løpende rekruttering av matroser til subsea og offshore. Registrer deg hos Bluecrew.', 'Fast', 'Dekk', 'active', 'Stavanger / Bergen', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 700000, 850000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Matros Subsea Offshore | Bluecrew', 'Søk stilling som matros innen subsea og offshore. Konkurransedyktig lønn og gode rotasjoner.'),

('Styrmann - Kystfart', 'styrmann-kystfart', 'Vi rekrutterer løpende styrmann til kystfart og servicefartøy for våre samarbeidspartnere.

Kvalifikasjoner:
- D4 eller D5 sertifikat
- GOC (General Operator Certificate)
- Erfaring fra servicefartøy eller kystfart
- Gode navigasjonsferdigheter

Vi tilbyr:
- Attraktiv lønn
- Varierte oppdrag langs norskekysten
- Mulighet for fast turnus
- Profesjonell oppfølging

Registrer deg for løpende vurdering til våre oppdrag.', 'Løpende rekruttering av styrmann til kystfart. Attraktiv lønn og gode vilkår.', 'Fast', 'Dekk', 'active', 'Hele kysten', 'Vestland', 'Bergen', 'Vestlandet', NULL, NULL, 750000, 900000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Styrmann Kystfart | Bluecrew', 'Søk stilling som styrmann i kystfart. Løpende rekruttering med konkurransedyktig lønn.'),

('Overstyrmann - Offshore', 'overstyrmann-offshore', 'Bluecrew søker erfarne overstyrmenn til offshore-operasjoner for våre kunder innen supply og konstruksjon.

Krav:
- D3 sertifikat eller høyere
- DP sertifikat (Unlimited foretrukket)
- Offshore sikkerhetssertifikater
- Erfaring fra PSV, AHTS eller CSV

Vi tilbyr:
- Høy lønn
- Attraktive rotasjonsordninger
- Oppdrag for anerkjente rederier
- Langsiktige muligheter

Løpende rekruttering til fremtidige oppdrag.', 'Overstyrmann søkes til offshore. DP-erfaring og konkurransedyktig lønn.', 'Fast', 'Dekk', 'active', 'Stavanger / Bergen', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 850000, 1050000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Overstyrmann Offshore | Bluecrew', 'Søk stilling som overstyrmann offshore. DP-erfaring, høy lønn.'),

('Skipsfører D6 - Havbruk', 'skipsforer-d6-havbruk', 'Vi søker kontinuerlig etter skipsførere med D6 til oppdrag innen havbruksnæringen.

Kvalifikasjoner:
- D6 sertifikat
- Lokalkjennskap til kystfarvann
- Erfaring fra havbruk/servicefartøy
- Lederegenskaper

Vi tilbyr:
- Svært konkurransedyktig lønn
- Fleksible turnusordninger
- Oppdrag i Nord-Norge og Trøndelag
- Fast kontaktperson

Registrer deg for å bli kontaktet ved relevante oppdrag.', 'Skipsfører D6 søkes til havbruk. Høy lønn og gode turnusordninger.', 'Fast', 'Dekk', 'active', 'Nord-Norge / Trøndelag', 'Troms og Finnmark', 'Tromsø', 'Nord-Norge', NULL, NULL, 900000, 1150000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Skipsfører D6 Havbruk | Bluecrew', 'Søk stilling som skipsfører D6 i havbruk. Konkurransedyktig lønn og fleksibel turnus.'),

-- MASKIN POSITIONS
('Maskinist M3/M4', 'maskinist-m3-m4', 'Bluecrew rekrutterer løpende maskinister med M3 eller M4 sertifikat til våre kunder.

Krav:
- M3 eller M4 maskinistbevis
- Erfaring fra mindre/mellomstore fartøy
- Teknisk forståelse og vedlikeholdserfaring
- STCW-sertifikater

Vi tilbyr:
- God lønn
- Varierte oppdrag
- Kystfart og havbruk
- Profesjonell oppfølging

Løpende rekruttering - vi matcher deg med riktige oppdrag.', 'Maskinist M3/M4 søkes. Løpende rekruttering til kystfart og havbruk.', 'Fast', 'Maskin', 'active', 'Hele kysten', 'Vestland', 'Bergen', 'Vestlandet', NULL, NULL, 750000, 900000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Maskinist M3 M4 | Bluecrew', 'Søk stilling som maskinist M3/M4. Løpende rekruttering med god lønn.'),

('Maskinsjef - Offshore', 'maskinsjef-offshore', 'Vi søker erfarne maskinsjefer til offshore-operasjoner for våre samarbeidspartnere.

Kvalifikasjoner:
- M1 eller M2 maskinsjefbevis
- DP-erfaring
- Offshore sikkerhetssertifikater
- Ledererfaring

Vi tilbyr:
- Svært høy lønn
- Attraktiv turnus (2-2-2-4 eller lignende)
- Moderne fartøy
- Langsiktige oppdrag

Registrer deg for fremtidige muligheter.', 'Maskinsjef søkes til offshore. Høy lønn og moderne fartøy.', 'Fast', 'Maskin', 'active', 'Stavanger / Bergen', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 1000000, 1350000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Maskinsjef Offshore | Bluecrew', 'Søk stilling som maskinsjef offshore. Svært konkurransedyktig lønn.'),

-- TEKNISK POSITIONS
('ETO - Fremtidige oppdrag', 'eto-fremtidige-oppdrag', 'Bluecrew bygger database over kvalifiserte ETOer for kommende oppdrag innen offshore og cruise.

Krav:
- ETO-sertifikat
- DP-erfaring (ønskelig)
- Erfaring med automasjon og elektronikk
- Offshore sikkerhetskurs

Vi tilbyr:
- Konkurransedyktig lønn når oppdrag tildeles
- Moderne skip med avanserte systemer
- Varierte oppdrag
- Profesjonell oppfølging

Registrer deg nå for å bli vurdert til fremtidige oppdrag.', 'ETO søkes til fremtidige oppdrag. Registrer deg i vår database.', 'Fast', 'Teknisk', 'active', 'Hele Norge', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 800000, 1000000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'ETO Stilling | Bluecrew', 'Registrer deg som ETO hos Bluecrew. Fremtidige oppdrag med konkurransedyktig lønn.'),

('ROV-Pilot - Fremtidige oppdrag', 'rov-pilot-fremtidige-oppdrag', 'Vi bygger nettverk av kvalifiserte ROV-piloter for kommende subsea-oppdrag.

Krav:
- ROV Pilot sertifikat
- Erfaring fra offshore/subsea operasjoner
- Offshore sikkerhetssertifikater
- Teknisk forståelse

Vi tilbyr:
- Høy lønn når oppdrag tildeles
- Spennende subsea-prosjekter
- Internasjonale muligheter
- Fast kontaktperson

Meld din interesse for fremtidige oppdrag.', 'ROV-Pilot søkes til fremtidige subsea-oppdrag. Registrer deg hos Bluecrew.', 'Fast', 'Teknisk', 'active', 'Stavanger / Bergen', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 950000, 1250000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'ROV Pilot | Bluecrew', 'Registrer deg som ROV-pilot hos Bluecrew. Høy lønn og spennende oppdrag.'),

-- HAVBRUK / OPPDRETT POSITIONS
('Driftsoperatør - Oppdrett', 'driftsoperator-oppdrett', 'Bluecrew søker kontinuerlig etter driftsoperatører til oppdrettsnæringen.

Krav:
- Båtførerbevis
- Erfaring fra oppdrett (ønskelig)
- Praktisk anlagt
- Villig til å jobbe utendørs

Vi tilbyr:
- God lønn
- Oppdrag i Nord-Norge og Trøndelag
- Gode turnusordninger
- Mulighet for fast ansettelse hos kunde

Løpende rekruttering til våre kunder i havbruk.', 'Driftsoperatør søkes til oppdrett. Løpende rekruttering med god lønn.', 'Fast', 'Dekk', 'active', 'Nord-Norge / Trøndelag', 'Troms og Finnmark', 'Tromsø', 'Nord-Norge', NULL, NULL, 700000, 850000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Driftsoperatør Oppdrett | Bluecrew', 'Søk stilling som driftsoperatør i oppdrett. God lønn og gode vilkår.'),

('Driftsoperatør m/D6 - Havbruk', 'driftsoperator-d6-havbruk', 'Vi søker driftsoperatører med D6 sertifikat til havbruksnæringen.

Krav:
- D6 sertifikat
- Kranførerbevis (ønskelig)
- Erfaring fra oppdrett/havbruk
- Selvstendig og ansvarsbevisst

Vi tilbyr:
- Svært god lønn
- Varierte arbeidsoppgaver
- Oppdrag langs hele kysten
- Profesjonell oppfølging

Registrer deg for løpende vurdering.', 'Driftsoperatør med D6 søkes til havbruk. Høy lønn og varierte oppdrag.', 'Fast', 'Dekk', 'active', 'Vestland / Trøndelag', 'Vestland', 'Bergen', 'Vestlandet', NULL, NULL, 800000, 950000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Driftsoperatør D6 Havbruk | Bluecrew', 'Søk stilling som driftsoperatør med D6 i havbruk. Konkurransedyktig lønn.'),

-- FORPLEINING POSITIONS
('Forpleiningsassistent - Offshore/Kyst', 'forpleiningsassistent-offshore', 'Bluecrew rekrutterer løpende forpleiningsassistenter til offshore og kystfart.

Krav:
- Hygienesertifikat
- STCW grunnkurs
- Erfaring fra storkjøkken (ønskelig)
- Serviceinnstilt

Vi tilbyr:
- God lønn
- Kost og losji på oppdrag
- Varierte oppdrag offshore og kyst
- Mulighet for karriereutvikling

Løpende rekruttering til våre kunder.', 'Forpleiningsassistent søkes til offshore og kyst. Løpende rekruttering.', 'Fast', 'Catering', 'active', 'Hele kysten', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 550000, 680000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Forpleiningsassistent | Bluecrew', 'Søk stilling som forpleiningsassistent offshore/kyst. God lønn.'),

('Forpleiningssjef - Offshore', 'forpleiningssjef-offshore', 'Vi søker erfarne forpleiningssjefer til offshore-plattformer og fartøy.

Kvalifikasjoner:
- Fagbrev kokk
- Ledererfaring fra storkjøkken
- Offshore sikkerhetskurs
- Gode norsk- og engelskkunnskaper

Vi tilbyr:
- Høy lønn
- Attraktive rotasjonsordninger
- Anerkjente offshore-selskaper
- Fast kontaktperson

Registrer deg for fremtidige oppdrag.', 'Forpleiningssjef søkes til offshore. Høy lønn og gode rotasjoner.', 'Fast', 'Catering', 'active', 'Stavanger / Bergen', 'Rogaland', 'Stavanger', 'Sørlandet', NULL, NULL, 750000, 920000, 'Konkurransedyktig lønn', NULL, '2026-12-31', NOW(), 'post@bluecrew.no', '+47 77 02 90 00', 'Forpleiningssjef Offshore | Bluecrew', 'Søk stilling som forpleiningssjef offshore. Konkurransedyktig lønn.');
