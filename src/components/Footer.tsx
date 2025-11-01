import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">AI-Kisan</h3>
                <p className="text-xs text-white/80">{t('heroSubtitle')}</p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Ministry of Agriculture & Farmers Welfare, Government of India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/" className="hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('aboutUs')}</Link></li>
              <li><Link to="/schemes" className="hover:text-white transition-colors">{t('schemes')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('dashboard')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contactUs')}</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Krishi Bhavan, Dr. Rajendra Prasad Road, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support-krishinivesh-agri@gov.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 11 2338 2651</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>© 2025 Government of India. All rights reserved. | Designed & Developed for Agricultural Innovation</p>
        </div>
      </div>
    </footer>
  );
};