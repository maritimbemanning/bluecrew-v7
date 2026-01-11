/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface ApplicationNotificationProps {
  // Stilling
  jobTitle: string;
  companyName?: string;
  
  // Søker
  name: string;
  email: string;
  phone: string;
  
  // Verifisering
  vippsVerified: boolean;
  
  // Dokumenter
  hasCv: boolean;
  hasCertificates: boolean;
  
  // Følgebrev
  coverLetter?: string;
  
  // Meta
  timestamp: string;
}

export function ApplicationNotificationEmail({
  jobTitle,
  companyName,
  name,
  email,
  phone,
  vippsVerified,
  hasCv,
  hasCertificates,
  coverLetter,
  timestamp,
}: ApplicationNotificationProps) {
  return (
    <html>
      <head>
        <style>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 700px;
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
              padding: 25px 30px;
            }
            .header-top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }
            .logo {
              font-size: 20px;
              font-weight: 800;
            }
            .badge-new {
              background: #10b981;
              color: white;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
            }
            .job-info {
              margin-top: 10px;
            }
            .job-title {
              font-size: 22px;
              font-weight: 500;
              margin: 0;
            }
            .company {
              opacity: 0.8;
              margin: 5px 0 0 0;
            }
            
            /* Quick Actions Bar */
            .quick-actions {
              background: #0ea5e9;
              padding: 15px 30px;
              display: flex;
              gap: 20px;
            }
            .action-btn {
              color: white;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              display: inline-flex;
              align-items: center;
              gap: 6px;
            }
            
            /* Kandidat Info */
            .candidate-section {
              padding: 30px;
              border-bottom: 1px solid #e2e8f0;
            }
            .section-title {
              font-size: 14px;
              font-weight: 500;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 0 0 15px 0;
            }
            .candidate-card {
              display: flex;
              gap: 20px;
              align-items: flex-start;
            }
            .avatar {
              width: 70px;
              height: 70px;
              background: linear-gradient(135deg, #0ea5e9, #0b1f3a);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: 700;
              flex-shrink: 0;
            }
            .candidate-details {
              flex: 1;
            }
            .candidate-name {
              font-size: 20px;
              font-weight: 700;
              color: #0b1f3a;
              margin: 0 0 5px 0;
            }
            .contact-row {
              display: flex;
              gap: 20px;
              margin-top: 10px;
              flex-wrap: wrap;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #475569;
              font-size: 14px;
            }
            .contact-item a {
              color: #0ea5e9;
              text-decoration: none;
            }
            
            /* Status Tags */
            .status-tags {
              display: flex;
              gap: 10px;
              margin-top: 15px;
              flex-wrap: wrap;
            }
            .tag {
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
            }
            .tag-verified {
              background: #dcfce7;
              color: #166534;
            }
            .tag-unverified {
              background: #fef3c7;
              color: #92400e;
            }
            .tag-cv {
              background: #dbeafe;
              color: #1e40af;
            }
            .tag-no-cv {
              background: #f1f5f9;
              color: #64748b;
            }
            .tag-cert {
              background: #f3e8ff;
              color: #7c3aed;
            }
            
            /* Følgebrev */
            .cover-letter-section {
              padding: 30px;
              background: #fafafa;
            }
            .cover-letter-box {
              background: white;
              border: 1px solid #e2e8f0;
              border-left: 4px solid #0ea5e9;
              border-radius: 8px;
              padding: 25px;
              white-space: pre-wrap;
              font-size: 15px;
              line-height: 1.7;
              color: #334155;
            }
            .no-cover-letter {
              color: #94a3b8;
              font-style: italic;
            }
            
            /* Footer */
            .footer {
              padding: 20px 30px;
              background: #f8fafc;
              border-top: 1px solid #e2e8f0;
            }
            .footer-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .timestamp {
              color: #64748b;
              font-size: 13px;
            }
            .dashboard-link {
              color: #0ea5e9;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="header-top">
              <span className="logo">⚓ Bluecrew Admin</span>
              <span className="badge-new">NY SØKNAD</span>
            </div>
            <div className="job-info">
              <h1 className="job-title">{jobTitle}</h1>
              {companyName && <p className="company">{companyName}</p>}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <a href={`mailto:${email}`} className="action-btn">
              📧 Send e-post
            </a>
            <a href={`tel:${phone}`} className="action-btn">
              📞 Ring {phone}
            </a>
          </div>
          
          {/* Kandidat Info */}
          <div className="candidate-section">
            <p className="section-title">👤 Kandidat</p>
            <div className="candidate-card">
              <div className="avatar">
                {name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div className="candidate-details">
                <h2 className="candidate-name">{name}</h2>
                <div className="contact-row">
                  <span className="contact-item">
                    📧 <a href={`mailto:${email}`}>{email}</a>
                  </span>
                  <span className="contact-item">
                    📞 <a href={`tel:${phone}`}>{phone}</a>
                  </span>
                </div>
                <div className="status-tags">
                  {vippsVerified ? (
                    <span className="tag tag-verified">✅ Vipps-verifisert</span>
                  ) : (
                    <span className="tag tag-unverified">⚠️ Ikke verifisert</span>
                  )}
                  {hasCv ? (
                    <span className="tag tag-cv">📄 CV lastet opp</span>
                  ) : (
                    <span className="tag tag-no-cv">Ingen CV</span>
                  )}
                  {hasCertificates && (
                    <span className="tag tag-cert">📜 Sertifikater</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Følgebrev */}
          <div className="cover-letter-section">
            <p className="section-title">✉️ Følgebrev</p>
            {coverLetter ? (
              <div className="cover-letter-box">
                {coverLetter}
              </div>
            ) : (
              <p className="no-cover-letter">Ingen følgebrev vedlagt</p>
            )}
          </div>
          
          {/* Footer */}
          <div className="footer">
            <div className="footer-row">
              <span className="timestamp">Mottatt: {timestamp}</span>
              <a 
                href="https://supabase.com/dashboard" 
                className="dashboard-link"
              >
                Åpne i Supabase →
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

