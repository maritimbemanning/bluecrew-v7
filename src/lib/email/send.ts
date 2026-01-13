import { resend, FROM_EMAIL, TO_EMAILS } from "./resend";
import { createClient } from "@supabase/supabase-js";
import type {
  ContactFormData,
  InterestLeadFormData,
  StaffingNeedsFormData,
} from "../validations";

// Supabase admin client for generating signed URLs
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Logo and branding for email templates - using the full logo
const LOGO_URL = "https://bluecrew.no/images/logo-email.jpg";

// Simplified logo for inline use in email headers
const LOGO_HTML = `<img src="${LOGO_URL}" alt="Bluecrew" style="height: 48px; width: auto;" />`;

interface EmailResult {
  success: boolean;
  error?: string;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

/**
 * Generic email sending function for simple HTML emails
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  try {
    await resend.emails.send({
      from: options.from || FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendContactNotification(
  data: ContactFormData
): Promise<EmailResult> {
  try {
    const timestamp = new Date().toLocaleString("no-NO", {
      dateStyle: "long",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject: `📩 Ny henvendelse fra ${data.navn}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0b1f3a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Ny henvendelse fra kontaktskjema</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 20px;">
              <span style="font-weight: 500; color: #0b1f3a; display: block; margin-bottom: 5px;">Navn:</span>
              <span style="color: #334155;">${data.navn}</span>
            </div>
            <div style="margin-bottom: 20px;">
              <span style="font-weight: 500; color: #0b1f3a; display: block; margin-bottom: 5px;">E-post:</span>
              <a href="mailto:${data.epost}" style="color: #0ea5e9;">${data.epost}</a>
            </div>
            ${data.telefon ? `
            <div style="margin-bottom: 20px;">
              <span style="font-weight: 500; color: #0b1f3a; display: block; margin-bottom: 5px;">Telefon:</span>
              <a href="tel:${data.telefon}" style="color: #0ea5e9;">${data.telefon}</a>
            </div>
            ` : ''}
            <div style="margin-bottom: 20px;">
              <span style="font-weight: 500; color: #0b1f3a; display: block; margin-bottom: 5px;">Melding:</span>
              <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9; margin-top: 10px; white-space: pre-wrap;">${data.melding}</div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
              <p>Mottatt: ${timestamp}</p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendInterestLeadNotification(
  data: InterestLeadFormData
): Promise<EmailResult> {
  try {
    const timestamp = new Date().toLocaleString("no-NO", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const typeLabels: Record<string, string> = {
      sjomann: "Sjømann",
      rederi: "Rederi",
      annet: "Annet",
    };

    // Build subject line with stilling if available
    const stillingPart = data.stilling ? ` - ${data.stilling}` : '';
    const subject = `🆕 Ny interessemelding (${typeLabels[data.type]})${stillingPart} - ${data.navn}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><img src="${LOGO_URL}" alt="Bluecrew" width="120" style="display: block;" /></td>
                <td align="right"><span style="background: #10b981; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: white;">NY INTERESSE</span></td>
              </tr>
            </table>
            <h1 style="margin: 15px 0 0 0; font-size: 22px;">${typeLabels[data.type]}</h1>
          </div>
          
          <div style="background: #0ea5e9; padding: 12px 25px;">
            <a href="mailto:${data.epost}" style="color: white; text-decoration: none; font-weight: 500; margin-right: 20px;">📧 ${data.epost}</a>
            ${data.telefon ? `<a href="tel:${data.telefon}" style="color: white; text-decoration: none; font-weight: 500;">📞 ${data.telefon}</a>` : ''}
          </div>
          
          <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;">Navn</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #0b1f3a;">${data.navn}</td>
              </tr>
              ${data.stilling ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Stilling</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #0b1f3a;">${data.stilling}</td>
              </tr>
              ` : ''}
              ${data.region ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Lokasjon</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.region}</td>
              </tr>
              ` : ''}
              ${data.erfaring ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Erfaring</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.erfaring}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; color: #64748b;">Markedsføring</td>
                <td style="padding: 10px 0; color: #0b1f3a;">${data.markedsforing ? '✅ Ja' : '❌ Nei'}</td>
              </tr>
            </table>
          </div>
          
          ${data.melding ? `
          <div style="padding: 25px; background: #fafafa; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">✉️ Melding</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-left: 4px solid #0ea5e9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${data.melding}</div>
          </div>
          ` : ''}
          
          <div style="padding: 15px 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <span style="color: #64748b; font-size: 13px;">Mottatt: ${timestamp}</span>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to person who submitted interest form
 */
export async function sendInterestLeadConfirmation(
  data: InterestLeadFormData
): Promise<EmailResult> {
  try {
    const firstName = data.navn.split(' ')[0];
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.epost,
      subject: '✅ Takk for din interesse - Bluecrew',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            ${LOGO_HTML}
            <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
            <h2 style="margin: 10px 0 0 0; font-size: 22px;">Takk for din interesse!</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #0b1f3a; margin-top: 0;">Hei ${firstName}! 👋</p>
            
            <p style="color: #475569; line-height: 1.6;">
              Vi har mottatt informasjonen din og vil kontakte deg så snart som mulig for å høre mer om din bakgrunn og hva du ser etter.
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="font-weight: 500; color: #166534; margin: 0 0 10px 0;">📋 Hva skjer nå?</p>
              <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Vi gjennomgår din henvendelse</li>
                <li>Ved relevante stillinger tar vi kontakt</li>
                <li>Du ligger i vår database for fremtidige oppdrag</li>
              </ul>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              I mellomtiden kan du sjekke ut våre ledige stillinger eller lese mer om hva vi tilbyr.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bluecrew.no/stillinger" style="display: inline-block; background: #0ea5e9; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-right: 10px;">Se ledige stillinger</a>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ✅ Godkjent bemanningsforetak · 🔒 BankID-verifisert
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Har du spørsmål? Svar på denne e-posten eller ring +47 77 02 90 00
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendStaffingNeedsNotification(
  data: StaffingNeedsFormData
): Promise<EmailResult> {
  try {
    const timestamp = new Date().toLocaleString("no-NO", {
      dateStyle: "long",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject: `🚢 Nytt bemanningsbehov: ${data.fartoytype} - ${data.antall} personer`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><img src="${LOGO_URL}" alt="Bluecrew" width="120" style="display: block;" /></td>
                <td align="right"><span style="background: #f59e0b; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: white;">NYTT BEHOV</span></td>
              </tr>
            </table>
            <h1 style="margin: 15px 0 5px 0; font-size: 22px;">${data.fartoytype}</h1>
            <p style="opacity: 0.8; margin: 0;">${data.antall} person${data.antall > 1 ? 'er' : ''} søkes</p>
          </div>

          <div style="background: #0ea5e9; padding: 12px 25px;">
            <a href="mailto:${data.kontakt_epost}" style="color: white; text-decoration: none; font-weight: 500; margin-right: 20px;">📧 ${data.kontakt_epost}</a>
            ${data.kontakt_telefon ? `<a href="tel:${data.kontakt_telefon}" style="color: white; text-decoration: none; font-weight: 500;">📞 ${data.kontakt_telefon}</a>` : ''}
          </div>

          <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 130px;">Kontaktperson</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #0b1f3a;">${data.kontakt_navn}</td>
              </tr>
              ${data.bedrift ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Bedrift</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.bedrift}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Stillinger</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${Array.isArray(data.stillinger) ? data.stillinger.join(', ') : data.stillinger}</td>
              </tr>
              ${data.oppstart ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Oppstart</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.oppstart}</td>
              </tr>
              ` : ''}
              ${data.rotasjon ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b;">Rotasjon</td>
                <td style="padding: 10px 0; color: #0b1f3a;">${data.rotasjon}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${data.merknad ? `
          <div style="padding: 25px; background: #fafafa; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">📝 Merknad</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${data.merknad}</div>
          </div>
          ` : ''}

          <div style="padding: 15px 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <span style="color: #64748b; font-size: 13px;">Mottatt: ${timestamp}</span>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Registration notification data type
 */
export interface RegistrationData {
  candidateId: string;
  name: string;
  email: string;
  phone?: string;
  rolle: string;
  erfaring: string;
  cvPath?: string | null;
  certsPath?: string | null;
  melding?: string;
  shortId?: string | null;
}

/**
 * Send notification to team when a candidate completes their registration
 */
export async function sendRegistrationNotification(
  data: RegistrationData
): Promise<EmailResult> {
  try {
    const timestamp = new Date().toLocaleString("no-NO", {
      dateStyle: "long",
      timeStyle: "short",
    });

    // Generate signed URLs for CV and certs (valid for 1 year)
    let cvUrl: string | null = null;
    let certsUrl: string | null = null;

    if (data.cvPath) {
      const { data: signedData } = await supabaseAdmin.storage
        .from('candidate-cvs')
        .createSignedUrl(data.cvPath, 60 * 60 * 24 * 365); // 1 year
      cvUrl = signedData?.signedUrl || null;
    }

    if (data.certsPath) {
      const { data: signedData } = await supabaseAdmin.storage
        .from('candidate-certificates')
        .createSignedUrl(data.certsPath, 60 * 60 * 24 * 365); // 1 year
      certsUrl = signedData?.signedUrl || null;
    }

    // Build CV download link if available
    const cvSection = cvUrl
      ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">CV</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="${cvUrl}" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">Last ned CV</a></td>
        </tr>`
      : '';

    const certsSection = certsUrl
      ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Sertifikater</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="${certsUrl}" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">Last ned sertifikater</a></td>
        </tr>`
      : '';

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject: `🎉 Ny fullført profil: ${data.name} - ${data.rolle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><img src="${LOGO_URL}" alt="Bluecrew" width="120" style="display: block;" /></td>
                <td align="right"><span style="background: #10b981; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: white;">NY KANDIDAT</span></td>
              </tr>
            </table>
            <h1 style="margin: 15px 0 5px 0; font-size: 22px;">${data.name}</h1>
            <p style="opacity: 0.8; margin: 0;">✅ Vipps-verifisert profil fullført</p>
          </div>

          <div style="background: #0ea5e9; padding: 12px 25px;">
            <a href="mailto:${data.email}" style="color: white; text-decoration: none; font-weight: 500; margin-right: 20px;">📧 ${data.email}</a>
            ${data.phone ? `<a href="tel:${data.phone}" style="color: white; text-decoration: none; font-weight: 500;">📞 ${data.phone}</a>` : ''}
          </div>

          <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 130px;">Stilling</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #0b1f3a;">${data.rolle}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Erfaring</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.erfaring}</td>
              </tr>
              ${cvSection}
              ${certsSection}
            </table>
          </div>

          ${data.melding ? `
          <div style="padding: 25px; background: #fafafa; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 12px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">✉️ Melding fra kandidaten</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${data.melding}</div>
          </div>
          ` : ''}

          <div style="padding: 15px 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <span style="color: #64748b; font-size: 13px;">Registrert: ${timestamp}</span>
            <span style="color: #94a3b8; font-size: 11px; float: right;">${data.shortId ? `Ref: ${data.shortId}` : `ID: ${data.candidateId.substring(0, 8)}`}</span>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to candidate after completing registration
 */
export async function sendRegistrationConfirmation(
  data: { name: string; email: string; rolle: string; shortId?: string | null }
): Promise<EmailResult> {
  try {
    const firstName = data.name.split(' ')[0];

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Velkommen til Bluecrew! Din profil er fullført',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            ${LOGO_HTML}
            <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
            <h2 style="margin: 10px 0 0 0; font-size: 22px;">Velkommen til Bluecrew!</h2>
          </div>

          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #0b1f3a; margin-top: 0;">Hei ${firstName}! 👋</p>

            <p style="color: #475569; line-height: 1.6;">
              Din profil er nå fullført og vi har mottatt CV-en din. Du er registrert som <strong>${data.rolle}</strong> i vår database.
            </p>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="font-weight: 500; color: #166534; margin: 0 0 10px 0;">📋 Hva skjer nå?</p>
              <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Vi matcher deg med relevante oppdrag</li>
                <li>Du blir kontaktet når vi har noe som passer</li>
                <li>Du kan når som helst oppdatere profilen din</li>
              </ul>
            </div>

            <p style="color: #475569; line-height: 1.6;">
              I mellomtiden kan du sjekke ut våre ledige stillinger eller oppdatere profilen din.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bluecrew.no/stillinger" style="display: inline-block; background: #0ea5e9; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-right: 10px;">Se ledige stillinger</a>
              <a href="https://bluecrew.no/profil" style="display: inline-block; background: #0b1f3a; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">Min profil</a>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ✅ Godkjent bemanningsforetak · 🔒 Vipps-verifisert
              </p>
              ${data.shortId ? `<p style="color: #94a3b8; font-size: 11px; margin: 8px 0 0 0;">Din referanse: ${data.shortId}</p>` : ''}
            </div>
          </div>

          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Har du spørsmål? Svar på denne e-posten eller ring +47 77 02 90 00
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to person who submitted contact form
 */
export async function sendContactConfirmation(
  data: ContactFormData
): Promise<EmailResult> {
  try {
    const firstName = data.navn.split(' ')[0];
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.epost,
      subject: '✅ Takk for din henvendelse - Bluecrew',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            ${LOGO_HTML}
            <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
            <h2 style="margin: 10px 0 0 0; font-size: 22px;">Vi har mottatt meldingen din!</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #0b1f3a; margin-top: 0;">Hei ${firstName}! 👋</p>
            
            <p style="color: #475569; line-height: 1.6;">
              Takk for at du tok kontakt med oss. Vi har mottatt din henvendelse og vil svare deg så snart som mulig, vanligvis innen 1-2 virkedager.
            </p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0ea5e9;">
              <p style="font-weight: 500; color: #0369a1; margin: 0 0 10px 0;">📨 Din melding:</p>
              <p style="color: #0369a1; margin: 0; white-space: pre-wrap; font-style: italic;">"${data.melding.substring(0, 200)}${data.melding.length > 200 ? '...' : ''}"</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              Har du en hastesak? Ring oss direkte på <strong>+47 77 02 90 00</strong>.
            </p>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ✅ Godkjent bemanningsforetak · 🔒 BankID-verifisert
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to customer who submitted staffing needs form
 */
export async function sendStaffingNeedsConfirmation(
  data: StaffingNeedsFormData
): Promise<EmailResult> {
  try {
    const firstName = data.kontakt_navn.split(' ')[0];
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.kontakt_epost,
      subject: '✅ Bemanningsforespørsel mottatt - Bluecrew',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            ${LOGO_HTML}
            <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
            <h2 style="margin: 10px 0 0 0; font-size: 22px;">Forespørselen er mottatt!</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #0b1f3a; margin-top: 0;">Hei ${firstName}! 👋</p>
            
            <p style="color: #475569; line-height: 1.6;">
              Takk for at du kontaktet Bluecrew angående bemanningsbehov. Vi har mottatt forespørselen din og vil ta kontakt innen 24 timer.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <p style="font-weight: 500; color: #0b1f3a; margin: 0 0 15px 0;">📋 Ditt behov:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; color: #64748b;">Fartøytype</td>
                  <td style="padding: 8px 0; color: #0b1f3a; font-weight: 500;">${data.fartoytype}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; color: #64748b;">Stillinger</td>
                  <td style="padding: 8px 0; color: #0b1f3a; font-weight: 500;">${Array.isArray(data.stillinger) ? data.stillinger.join(', ') : data.stillinger}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; color: #64748b;">Antall</td>
                  <td style="padding: 8px 0; color: #0b1f3a; font-weight: 500;">${data.antall} ${data.antall === 1 ? 'person' : 'personer'}</td>
                </tr>
                ${data.oppstart ? `
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Oppstart</td>
                  <td style="padding: 8px 0; color: #0b1f3a; font-weight: 500;">${data.oppstart}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="font-weight: 500; color: #166534; margin: 0 0 10px 0;">🚀 Hva skjer nå?</p>
              <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Vi gjennomgår behovet ditt</li>
                <li>Matcher med kvalifiserte kandidater i vår database</li>
                <li>Tar kontakt for å diskutere løsninger</li>
              </ul>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              Trenger du raskere respons? Ring oss på <strong>+47 77 02 90 00</strong>.
            </p>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ✅ Godkjent bemanningsforetak · 🔒 DNV-sertifisert rekrutterer
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================================================
// CAMPAIGN EMAIL FUNCTIONS
// ============================================================================

export interface CampaignApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  segment: string;
  applicationId: string;
}

// NOTE: sendCampaignNotification removed - we only send ONE email when application is complete
// This prevents duplicate emails and ensures we have all data (CV, profile, etc.)

/**
 * Extended data for campaign complete notification
 */
interface CampaignCompleteData extends CampaignApplicationData {
  cvUrl?: string;
  erfaring?: string;
  offshoreErfaring?: string;
  rovRolle?: string;
  sertifikater?: string;
  fagomrade?: string;
  coverLetter?: string;
  extraDocumentFilename?: string;
  sourceUrl?: string;
}

/**
 * Send notification to team when a campaign application is completed (Vipps verified)
 * This is the ONLY team email for campaigns - sent after full verification
 */
export async function sendCampaignCompleteNotification(
  data: CampaignCompleteData
): Promise<EmailResult> {
  try {
    const timestamp = new Date().toLocaleString("no-NO", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const segmentLabels: Record<string, string> = {
      offshore: "Offshore",
      havbruk: "Havbruk/Akvakultur",
      shipping: "Shipping/Rederi",
    };

    const erfaringLabels: Record<string, string> = {
      "0-2": "0-2 år",
      "3-5": "3-5 år",
      "6-10": "6-10 år",
      "10+": "10+ år",
    };

    const offshoreLabels: Record<string, string> = {
      ja: "Ja, har offshore-erfaring",
      noe: "Noe erfaring",
      nei: "Nei, men ønsker det",
    };

    // Build dynamic rows for form data
    let formDataRows = "";
    
    if (data.erfaring) {
      formDataRows += `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Erfaring</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${erfaringLabels[data.erfaring] || data.erfaring}</td>
        </tr>`;
    }
    
    if (data.offshoreErfaring) {
      formDataRows += `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Offshore-erfaring</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${offshoreLabels[data.offshoreErfaring] || data.offshoreErfaring}</td>
        </tr>`;
    }

    if (data.rovRolle) {
      formDataRows += `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">ROV-rolle</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.rovRolle}</td>
        </tr>`;
    }

    if (data.sertifikater) {
      formDataRows += `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Sertifikater</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.sertifikater}</td>
        </tr>`;
    }

    if (data.fagomrade) {
      formDataRows += `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Fagområde</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${data.fagomrade}</td>
        </tr>`;
    }

    const cvSection = data.cvUrl
      ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">CV</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #10b981; font-weight: 500;">✅ Fra Bluecrew-profil</span></td>
        </tr>`
      : "";

    const extraDocSection = data.extraDocumentFilename
      ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Ekstra dokument</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">📎 ${data.extraDocumentFilename}</td>
        </tr>`
      : "";

    const coverLetterSection = data.coverLetter
      ? `<div style="padding: 20px 25px; border: 1px solid #e2e8f0; border-top: none; background: #fefce8;">
          <p style="margin: 0 0 10px 0; font-weight: 500; color: #854d0e;">📝 Søknadstekst:</p>
          <p style="margin: 0; color: #713f12; white-space: pre-wrap; line-height: 1.6;">${data.coverLetter}</p>
        </div>`
      : "";

    const sourceSection = data.sourceUrl
      ? `<span style="margin-left: 15px;">📍 Fra: ${data.sourceUrl.replace("https://bluecrew.no", "")}</span>`
      : "";

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      subject: `✅ Ny kampanjesøknad: ${data.position} - ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><img src="${LOGO_URL}" alt="Bluecrew" width="120" style="display: block;" /></td>
                <td align="right"><span style="background: #10b981; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: white;">KAMPANJE 2026</span></td>
              </tr>
            </table>
            <h1 style="margin: 15px 0 5px 0; font-size: 22px;">${data.name}</h1>
            <p style="opacity: 0.8; margin: 0;">✅ Vipps-verifisert · ${data.position} · ${segmentLabels[data.segment] || data.segment}</p>
          </div>

          <div style="background: #10b981; padding: 12px 25px;">
            <a href="mailto:${data.email}" style="color: white; text-decoration: none; font-weight: 500; margin-right: 20px;">📧 ${data.email}</a>
            <a href="tel:${data.phone}" style="color: white; text-decoration: none; font-weight: 500;">📞 ${data.phone}</a>
          </div>

          <div style="padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Stilling</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #0b1f3a;">${data.position}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Segment</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0b1f3a;">${segmentLabels[data.segment] || data.segment}</td>
              </tr>
              ${formDataRows}
              ${cvSection}
              ${extraDocSection}
              <tr>
                <td style="padding: 10px 0; color: #64748b;">Status</td>
                <td style="padding: 10px 0; color: #10b981; font-weight: 500;">✅ Klar for vurdering</td>
              </tr>
            </table>
          </div>

          ${coverLetterSection}

          <div style="padding: 15px 25px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <span style="color: #64748b; font-size: 13px;">Mottatt: ${timestamp}</span>
            ${sourceSection}
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send confirmation email to candidate after completing campaign application
 */
export async function sendCampaignConfirmation(
  data: { name: string; email: string; position: string }
): Promise<EmailResult> {
  try {
    const firstName = data.name.split(" ")[0];

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "✅ Søknaden din er mottatt - Bluecrew",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            ${LOGO_HTML}
            <div style="width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
            <h2 style="margin: 10px 0 0 0; font-size: 22px;">Søknaden din er mottatt!</h2>
          </div>

          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #0b1f3a; margin-top: 0;">Hei ${firstName}! 👋</p>

            <p style="color: #475569; line-height: 1.6;">
              Takk for at du søkte på <strong>${data.position}</strong> hos Bluecrew. Vi har mottatt søknaden din og vil gjennomgå den så snart som mulig.
            </p>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="font-weight: 500; color: #166534; margin: 0 0 10px 0;">📋 Hva skjer nå?</p>
              <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Vi vurderer søknaden din opp mot våre behov</li>
                <li>Ved match tar vi kontakt for en samtale</li>
                <li>Du får alltid tilbakemelding uansett utfall</li>
              </ul>
            </div>

            <p style="color: #475569; line-height: 1.6;">
              I mellomtiden kan du oppdatere profilen din eller se andre ledige stillinger.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bluecrew.no/profil" style="display: inline-block; background: #0ea5e9; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-right: 10px;">Min profil</a>
              <a href="https://bluecrew.no/stillinger" style="display: inline-block; background: #0b1f3a; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">Se stillinger</a>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 30px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ✅ Godkjent bemanningsforetak · 🔒 Vipps-verifisert
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Har du spørsmål? Svar på denne e-posten eller ring +47 77 02 90 00
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
