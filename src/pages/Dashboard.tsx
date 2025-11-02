import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Sprout, Leaf, Bug, TrendingUp, FileText, User, Cloud, Bot } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: Sprout, title: t('cropRecommendation'), description: t('cropRecommendationDesc'), link: '/crop-recommendation', color: 'text-green-600', gradient: 'from-green-500 to-emerald-600' },
    { icon: Leaf, title: t('fertilizerRecommendation'), description: t('fertilizerRecommendationDesc'), link: '/fertilizer-recommendation', color: 'text-emerald-600', gradient: 'from-emerald-500 to-green-600' },
    { icon: Bug, title: t('cropDiseaseDetection'), description: t('cropDiseaseDetectionDesc'), link: '/disease-detection', color: 'text-red-600', gradient: 'from-red-500 to-orange-600' },
    { icon: TrendingUp, title: t('marketPrices'), description: t('marketPricesDesc'), link: '/market-prices', color: 'text-blue-600', gradient: 'from-blue-500 to-indigo-600' },
    { icon: FileText, title: t('govSchemes'), description: t('govSchemesDesc'), link: '/government-schemes', color: 'text-purple-600', gradient: 'from-purple-500 to-pink-600' },
    { icon: Cloud, title: t('weatherForecast'), description: t('weatherForecastDesc'), link: '/weather', color: 'text-sky-600', gradient: 'from-sky-500 to-blue-600' },
    { icon: Bot, title: t('chatbot'), description: t('chatbotDesc'), link: '/chatbot', color: 'text-teal-600', gradient: 'from-teal-500 to-emerald-600' },
    { icon: User, title: 'Profile', description: 'Manage your account', link: '/profile', color: 'text-orange-600', gradient: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome, {user?.email?.split('@')[0] || 'Farmer'}!</h1>
          <p className="text-muted-foreground">Access all AI-powered agriculture tools from your dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer h-full overflow-hidden border-2 hover:border-primary">
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
                <CardHeader className="pb-4">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className={`w-full group-hover:bg-gradient-to-r ${feature.gradient} group-hover:text-white group-hover:border-transparent transition-all`}>
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
