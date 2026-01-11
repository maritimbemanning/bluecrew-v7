/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface ApplicationConfirmationProps {
  name: string;
  jobTitle: string;
  companyName?: string;
}

export function ApplicationConfirmationEmail({
  name,
  jobTitle,
  companyName,
}: ApplicationConfirmationProps) {
  const firstName = name.split(" ")[0];
  
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
              padding: 0;
              background: #f1f5f9;
            }
            .container {
              background: white;
              margin: 20px auto;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header {
              background: linear-gradient(135deg, #0b1f3a 0%, #1e3a5f 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              font-size: 28px;
              font-weight: 800;
              margin-bottom: 10px;
              letter-spacing: -0.5px;
            }
            .logo-icon {
              display: inline-block;
              width: 40px;
              height: 40px;
              background: #0ea5e9;
              border-radius: 10px;
              margin-right: 10px;
              vertical-align: middle;
            }
            .checkmark {
              background: #10b981;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin: 20px auto;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 20px;
              color: #0b1f3a;
              margin-bottom: 20px;
            }
            .job-card {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-left: 4px solid #0ea5e9;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .job-title {
              font-size: 18px;
              font-weight: 500;
              color: #0b1f3a;
              margin: 0 0 5px 0;
            }
            .company-name {
              color: #64748b;
              font-size: 14px;
              margin: 0;
            }
            .next-steps {
              background: #f0fdf4;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .next-steps-title {
              font-weight: 500;
              color: #166534;
              margin: 0 0 10px 0;
              font-size: 16px;
            }
            .next-steps-list {
              margin: 0;
              padding-left: 20px;
              color: #166534;
            }
            .next-steps-list li {
              margin-bottom: 8px;
            }
            .cta-button {
              display: inline-block;
              background: #0ea5e9;
              color: white;
              padding: 14px 28px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 500;
              margin: 20px 0;
            }
            .footer {
              background: #f8fafc;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer-text {
              color: #64748b;
              font-size: 14px;
              margin: 0 0 15px 0;
            }
            .footer-links {
              margin: 0;
            }
            .footer-links a {
              color: #0ea5e9;
              text-decoration: none;
              margin: 0 10px;
              font-size: 14px;
            }
            .social-proof {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
            }
            .badges {
              display: inline-block;
              margin: 0 10px;
              font-size: 12px;
              color: #64748b;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="logo">
              ⚓ Bluecrew
            </div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: '#10b981', 
              borderRadius: '50%', 
              margin: '20px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              ✓
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
              Søknad mottatt!
            </h1>
          </div>
          
          <div className="content">
            <p className="greeting">
              Hei {firstName}! 👋
            </p>
            
            <p>
              Takk for at du søkte gjennom Bluecrew. Vi har mottatt søknaden din og vil gjennomgå den så snart som mulig.
            </p>
            
            <div className="job-card">
              <p className="job-title">{jobTitle}</p>
              {companyName && (
                <p className="company-name">{companyName}</p>
              )}
            </div>
            
            <div className="next-steps">
              <p className="next-steps-title">📋 Hva skjer videre?</p>
              <ul className="next-steps-list">
                <li>Vi gjennomgår søknaden din</li>
                <li>Ved match kontakter vi deg for en uformell prat</li>
                <li>Du får beskjed uansett utfall</li>
              </ul>
            </div>
            
            <p>
              I mellomtiden kan du utforske andre stillinger eller oppdatere profilen din.
            </p>
            
            <div style={{ textAlign: 'center' }}>
              <a href="https://bluecrew.no/stillinger" className="cta-button">
                Se flere stillinger
              </a>
            </div>
            
            <div className="social-proof">
              <span className="badges">✅ Godkjent bemanningsforetak</span>
              <span className="badges">🔒 BankID-verifisert</span>
            </div>
          </div>
          
          <div className="footer">
            <p className="footer-text">
              Har du spørsmål? Svar på denne e-posten eller ring oss på +47 77 02 90 00
            </p>
            <p className="footer-links">
              <a href="https://bluecrew.no">bluecrew.no</a>
              <a href="https://bluecrew.no/personvern">Personvern</a>
            </p>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '20px' }}>
              © 2026 Bluecrew AS · Harstad & Stavanger
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

