import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Globe, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const InvestmentOpportunities = () => {
  const { t } = useLanguage();

  const opportunities = [
    {
      title: 'Agri-Tech Startups',
      description: 'Invest in innovative agricultural technology companies developing AI, IoT, and precision farming solutions',
      minInvestment: '₹10 Lakhs',
      sector: 'Technology',
      returns: 'High Growth Potential',
      icon: TrendingUp
    },
    {
      title: 'Organic Farming Projects',
      description: 'Support sustainable organic farming initiatives with government backing and export potential',
      minInvestment: '₹25 Lakhs',
      sector: 'Agriculture',
      returns: '15-20% Annual',
      icon: Globe
    },
    {
      title: 'Food Processing Units',
      description: 'Establish modern food processing and packaging facilities in agricultural zones',
      minInvestment: '₹50 Lakhs',
      sector: 'Manufacturing',
      returns: '18-25% Annual',
      icon: Building
    },
    {
      title: 'Farmer Producer Organizations',
      description: 'Invest in FPOs to aggregate small farmers and create sustainable supply chains',
      minInvestment: '₹5 Lakhs',
      sector: 'Community',
      returns: 'Stable Returns',
      icon: Users
    }
  ];

  const benefits = [
    'Government subsidies and tax benefits',
    'Growing market with 60% agricultural population',
    'Export opportunities in organic and processed foods',
    'Technology-driven efficiency improvements',
    'Sustainable and socially impactful investments'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-destructive">
            {t('investment')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore lucrative investment opportunities in India's agricultural sector
          </p>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl">Why Invest in Agriculture?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <Icon className="h-8 w-8 text-destructive" />
                    </div>
                    <Badge variant="secondary">{opportunity.sector}</Badge>
                  </div>
                  <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                  <CardDescription className="text-base">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum Investment</span>
                    <span className="font-semibold">{opportunity.minInvestment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Returns</span>
                    <span className="font-semibold text-green-600">{opportunity.returns}</span>
                  </div>
                  <Button className="w-full mt-4 bg-destructive hover:bg-destructive/90">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-white">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="mb-6 text-white/90 max-w-2xl mx-auto">
              Connect with our investment team to explore opportunities tailored to your goals
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-destructive hover:bg-white/90">
              Contact Investment Cell
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentOpportunities;
