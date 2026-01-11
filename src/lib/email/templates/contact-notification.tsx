/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface ContactNotificationProps {
  navn: string;
  epost: string;
  telefon?: string;
  melding: string;
  timestamp: string;
}

export function ContactNotificationEmail({
  navn,
  epost,
  telefon,
  melding,
  timestamp,
}: ContactNotificationProps) {
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
            .field {
              margin-bottom: 20px;
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
            Ny henvendelse fra kontaktskjema
          </h1>
        </div>
        <div className="content">
          <div className="field">
            <span className="label">Navn:</span>
            <span className="value">{navn}</span>
          </div>
          <div className="field">
            <span className="label">E-post:</span>
            <span className="value">
              <a href={`mailto:${epost}`}>{epost}</a>
            </span>
          </div>
          {telefon && (
            <div className="field">
              <span className="label">Telefon:</span>
              <span className="value">
                <a href={`tel:${telefon}`}>{telefon}</a>
              </span>
            </div>
          )}
          <div className="field">
            <span className="label">Melding:</span>
            <div className="message-box">{melding}</div>
          </div>
          <div className="footer">
            <p>Mottatt: {timestamp}</p>
            <p>
              Denne henvendelsen er automatisk logget i Supabase og krever
              oppfølging.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

