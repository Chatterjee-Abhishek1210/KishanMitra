import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Wheat, Apple, Droplet, Factory, Tractor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Sectors = () => {
  const { t } = useLanguage();

  const sectors = [
    {
      icon: Wheat,
      title: 'Food Grains',
      description: 'Cultivation of rice, wheat, pulses, and coarse cereals forming the foundation of food security',
      stats: '60% of cultivated area'
    },
    {
      icon: Apple,
      title: 'Horticulture',
      description: 'Fruits, vegetables, flowers, spices, and plantation crops contributing to nutritional security',
      stats: '18% of agricultural GDP'
    },
    {
      icon: Droplet,
      title: 'Irrigation',
      description: 'Water management systems and infrastructure for sustainable crop production',
      stats: '50% irrigated area'
    },
    {
      icon: Sprout,
      title: 'Agricultural Research',
      description: 'Innovation and development in crop varieties, farming techniques, and technology',
      stats: '100+ research institutes'
    },
    {
      icon: Tractor,
      title: 'Farm Mechanization',
      description: 'Modern equipment and machinery to enhance productivity and reduce labor burden',
      stats: '40% mechanization level'
    },
    {
      icon: Factory,
      title: 'Agro-Processing',
      description: 'Value addition through food processing, storage, and supply chain infrastructure',
      stats: '₹32 lakh crore industry'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t('sectors')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key sectors driving agricultural growth and development in India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{sector.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {sector.description}
                  </p>
                  <div className="pt-2 border-t">
                    <span className="text-sm font-semibold text-primary">{sector.stats}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sectors;
