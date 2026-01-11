"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "@/components/icons";
import CertificationBar from "./CertificationBar";

const footerLinks = {
  forSjofolk: [
    { label: "Meld interesse", href: "/meld-interesse" },
    { label: "Ledige stillinger", href: "/stillinger" },
    { label: "Lønnskalkulator", href: "/lonn/kalkulator" },
    { label: "Turnuskalkulator", href: "/turnus" },
    { label: "Karrieremuligheter", href: "/karriere" },
    { label: "Crew blogg", href: "/crew" },
    { label: "Maritim ordbok", href: "/ordbok" },
  ],
  forRederier: [
    { label: "Lei mannskap", href: "/rederi/behov" },
    { label: "Våre tjenester", href: "/rederi" },
    { label: "Havbruk bemanning", href: "/rederi/havbruk" },
    { label: "Bli partner", href: "/rederi/partner" },
    { label: "Trygghet & etterlevelse", href: "/trygghet" },
    { label: "Om Bluecrew", href: "/om-oss" },
    { label: "Ofte stilte spørsmål", href: "/faq" },
  ],
};

const contactInfo = [
  {
    icon: Mail,
    label: "post@bluecrew.no",
    href: "mailto:post@bluecrew.no",
  },
  {
    icon: Phone,
    label: "+47 77 02 90 00",
    href: "tel:+4777029000",
  },
  {
    icon: MapPin,
    label: "Ervikveien 110, 9402 Harstad",
    href: "https://maps.google.com/?q=Ervikveien+110,+9402+Harstad,+Norway",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582845493676",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/bluecrewas",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/bluecrew.no",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 pt-16 pb-8 border-t border-gold-400/10" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Om oss */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon.png"
                alt="Bluecrew"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-3xl font-medium text-cream-50 tracking-tight">
                Bluecrew
              </span>
            </div>
            <p className="text-cream-200/70 leading-relaxed text-sm">
              Stolt leverandør og partner av maritim bemanning og rekruttering.
              Vi sikrer pålitelige bemanningsløsninger til havbruk, offshore og rederi.
            </p>
            <p className="text-gold-400 text-sm font-medium italic">
              Bygget av sjøfolk, for sjøfolk
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream-100/5 hover:bg-gold-400/20 flex items-center justify-center transition-all duration-300 text-cream-200/70 hover:text-gold-400 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: For Sjøfolk */}
          <div>
            <h3 className="text-xl font-medium text-gold-500 mb-6 font-sans">For Sjøfolk</h3>
            <ul className="space-y-4">
              {footerLinks.forSjofolk.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-200/70 hover:text-gold-400 transition-colors text-base block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Rederier */}
          <div>
            <h3 className="text-xl font-medium text-gold-500 mb-6 font-sans">For Rederier</h3>
            <ul className="space-y-4">
              {footerLinks.forRederier.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-200/70 hover:text-gold-400 transition-colors text-base block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div>
            <h3 className="text-xl font-medium text-gold-500 mb-6 font-sans">Kontakt</h3>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-gold-400 mt-0.5 shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-cream-200/70 hover:text-cream-50 transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-cream-200/70 text-sm">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CertificationBar />

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gold-400/10 text-center space-y-3">
          <p className="text-sm text-cream-200/60">
            © {new Date().getFullYear()} Bluecrew AS | Org.nr 936 463 843
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-cream-200/50">
            <Link href="/personvern" className="hover:text-gold-400 transition-colors">
              Personvern
            </Link>
            <span>|</span>
            <Link href="/vilkar" className="hover:text-gold-400 transition-colors">
              Vilkår
            </Link>
            <span>|</span>
            <button
              onClick={() => {
                localStorage.removeItem('cookie-consent');
                window.location.reload();
              }}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Informasjonskapsler
            </button>
          </div>
          <p className="text-xs text-cream-200/50">
            Nettsiden er laget av{" "}
            <a
              href="https://didriksson.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              Didriksson Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}


