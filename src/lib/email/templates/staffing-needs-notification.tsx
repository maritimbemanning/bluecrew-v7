/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface StaffingNeedsNotificationProps {
  fartoytype: string;
  stillinger: string[];
  antall: number;
  oppstart?: string;
  rotasjon?: string;
  kontakt_navn: string;
  kontakt_epost: string;
  kontakt_telefon?: string;
  bedrift?: string;
  merknad?: string;
  timestamp: string;
}

export function StaffingNeedsNotificationEmail({
  fartoytype,
  stillinger,
  antall,
  oppstart,
  rotasjon,
  kontakt_navn,
  kontakt_epost,
  kontakt_telefon,
  bedrift,
  merknad,
  timestamp,
}: StaffingNeedsNotificationProps) {
  return (
    <html>
      <head>
        <style>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #0b1f3a;
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e2e8f0;
            }
            .section:last-of-type {
              border-bottom: none;
            }
            .section-title {
              font-size: 18px;
              font-weight: 500;
              color: #0b1f3a;
              margin-bottom: 15px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: 500;
              color: #0b1f3a;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #334155;
            }
            .positions-list {
              background: white;
              padding: 15px;
              border-radius: 6px;
              margin-top: 10px;
            }
            .positions-list li {
              padding: 8px 0;
              border-bottom: 1px solid #f1f5f9;
            }
            .positions-list li:last-child {
              border-bottom: none;
            }
            .highlight {
              background: #0ea5e9;
              color: white;
              padding: 8px 12px;
              border-radius: 4px;
              font-weight: 500;
              display: inline-block;
            }
            .message-box {
              background: white;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #0ea5e9;
              margin-top: 10px;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              font-size: 14px;
              color: #64748b;
            }
          `}
        </style>
      </head>
      <body>
        <div className="header">
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            Nytt bemanningsbehov fra rederi
          </h1>
        </div>
        <div className="content">
          {/* Vessel Information */}
          <div className="section">
            <h2 className="section-title">Fartøyinformasjon</h2>
            <div className="field">
              <span className="label">Fartøytype:</span>
              <span className="value">{fartoytype}</span>
            </div>
            {bedrift && (
              <div className="field">
                <span className="label">Bedrift:</span>
                <span className="value">{bedrift}</span>
              </div>
            )}
          </div>

          {/* Staffing Requirements */}
          <div className="section">
            <h2 className="section-title">Bemanningsbehov</h2>
            <div className="field">
              <span className="label">Antall personer:</span>
              <span className="highlight">{antall}</span>
            </div>
            <div className="field">
              <span className="label">Stillinger ({stillinger.length}):</span>
              <div className="positions-list">
                <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                  {stillinger.map((stilling, index) => (
                    <li key={index}>{stilling}</li>
                  ))}
                </ul>
              </div>
            </div>
            {oppstart && (
              <div className="field">
                <span className="label">Ønsket oppstart:</span>
                <span className="value">{oppstart}</span>
              </div>
            )}
            {rotasjon && (
              <div className="field">
                <span className="label">Rotasjon:</span>
                <span className="value">{rotasjon}</span>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="section">
            <h2 className="section-title">Kontaktinformasjon</h2>
            <div className="field">
              <span className="label">Navn:</span>
              <span className="value">{kontakt_navn}</span>
            </div>
            <div className="field">
              <span className="label">E-post:</span>
              <span className="value">
                <a href={`mailto:${kontakt_epost}`}>{kontakt_epost}</a>
              </span>
            </div>
            {kontakt_telefon && (
              <div className="field">
                <span className="label">Telefon:</span>
                <span className="value">
                  <a href={`tel:${kontakt_telefon}`}>{kontakt_telefon}</a>
                </span>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          {merknad && (
            <div className="section">
              <h2 className="section-title">Merknad</h2>
              <div className="message-box">{merknad}</div>
            </div>
          )}

          <div className="footer">
            <p>Mottatt: {timestamp}</p>
            <p>
              Dette bemanningsbehovet er automatisk logget i Supabase og krever
              rask oppfølging.
            </p>
            <p>
              <strong>Prioritet:</strong> {antall >= 5 ? "HØY" : "NORMAL"} (
              {antall} personer)
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

