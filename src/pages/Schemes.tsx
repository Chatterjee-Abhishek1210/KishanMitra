import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Schemes = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      title: 'PM-KISAN',
      description: 'Pradhan Mantri Kisan Samman Nidhi - Direct income support of ₹6000 per year to farmer families',
      status: 'Active',
      category: 'Financial Support'
    },
    {
      title: 'Kisan Credit Card',
      description: 'Provides adequate and timely credit support to farmers for their cultivation needs',
      status: 'Active',
      category: 'Credit Scheme'
    },
    {
      title: 'PM Fasal Bima Yojana',
      description: 'Crop insurance scheme to protect farmers against crop loss due to natural calamities',
      status: 'Active',
      category: 'Insurance'
    },
    {
      title: 'Soil Health Card Scheme',
      description: 'Provides soil nutrient status to farmers to improve productivity through judicious use of inputs',
      status: 'Active',
      category: 'Agricultural Support'
    },
    {
      title: 'National Mission for Sustainable Agriculture',
      description: 'Promotes sustainable agriculture practices and climate resilient farming',
      status: 'Active',
      category: 'Sustainability'
    },
    {
      title: 'Paramparagat Krishi Vikas Yojana',
      description: 'Promotes organic farming and certification of organic produce',
      status: 'Active',
      category: 'Organic Farming'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t('schemes')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore various government schemes designed to support and empower farmers across India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{scheme.category}</Badge>
                  <Badge variant="default" className="bg-green-600">{scheme.status}</Badge>
                </div>
                <CardTitle className="text-xl">{scheme.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {scheme.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;
