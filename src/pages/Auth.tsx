import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Auth() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Firebase Google Sign-In will be implemented here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">AI-Kisan</h1>
            <p className="text-sm text-muted-foreground">{t('heroSubtitle')}</p>
          </div>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('welcomeBack')}</CardTitle>
            <CardDescription>{t('heroDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t('signIn')}</TabsTrigger>
                <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" placeholder="farmer@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  {t('signIn')}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t('signInWithGoogle')}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('fullName')}</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('email')}</Label>
                  <Input id="signup-email" type="email" placeholder="farmer@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phoneNumber')}</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('password')}</Label>
                  <Input id="signup-password" type="password" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  {t('createAccount')}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t('signInWithGoogle')}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}