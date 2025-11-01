import { Link } from 'react-router-dom';
import { Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Header = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('aboutUs'), href: '/about' },
    { label: t('schemes'), href: '/schemes' },
    { label: t('sectors'), href: '/sectors' },
    { label: t('media'), href: '/media' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Government of India</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">{t('login')}</Link>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary-dark">
              <Link to="/auth">{t('register')}</Link>
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">AI-Kisan</h1>
              <p className="text-xs text-muted-foreground">{t('heroSubtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-destructive hover:bg-destructive/90">
              <Link to="/investment">{t('investment')}</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="bg-destructive hover:bg-destructive/90 mt-4">
                  <Link to="/investment">{t('investment')}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};