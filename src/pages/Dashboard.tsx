import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Sprout, Leaf, Bug, TrendingUp, FileText, User } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: Sprout, title: 'Crop Recommendation', description: 'Get AI-powered crop suggestions', link: '/crop-recommendation', color: 'text-green-600' },
    { icon: Leaf, title: 'Fertilizer Recommendation', description: 'Optimize your fertilizer usage', link: '/fertilizer-recommendation', color: 'text-emerald-600' },
    { icon: Bug, title: 'Disease Detection', description: 'Detect crop diseases early', link: '/disease-detection', color: 'text-red-600' },
    { icon: TrendingUp, title: 'Market Prices', description: 'Check current market rates', link: '/market-prices', color: 'text-blue-600' },
    { icon: FileText, title: 'Government Schemes', description: 'Explore available schemes', link: '/government-schemes', color: 'text-purple-600' },
    { icon: User, title: 'Profile', description: 'Manage your account', link: '/profile', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome, {user?.email?.split('@')[0] || 'Farmer'}!</h1>
          <p className="text-muted-foreground">Access all AI-powered agriculture tools from your dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Access Tool
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
