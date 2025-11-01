import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Bug, TrendingUp, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sprout,
      title: t('cropRecommendation'),
      description: t('cropRecommendationDesc'),
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      icon: Bug,
      title: t('diseaseDetection'),
      description: t('diseaseDetectionDesc'),
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      icon: TrendingUp,
      title: t('marketPrices'),
      description: t('marketPricesDesc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      icon: FileText,
      title: t('govSchemes'),
      description: t('govSchemesDesc'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Agriculture <span className="text-primary">Schemes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('schemesDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <div className={`h-16 w-16 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};