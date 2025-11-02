import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          {t('aboutUs')}
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ministry of Agriculture & Farmers Welfare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Department of Agriculture & Farmers Welfare is committed to the welfare of farmers 
                and the development of agriculture in India. We work towards sustainable agricultural practices, 
                farmer empowerment, and technological advancement in the agricultural sector.
              </p>
              <p className="text-muted-foreground">
                Our AI-powered platform aims to bridge the gap between traditional farming and modern technology, 
                providing farmers with data-driven insights and recommendations to improve crop yield and reduce losses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Empower farmers with AI-driven agricultural solutions</li>
                <li>Promote sustainable and efficient farming practices</li>
                <li>Provide accurate crop recommendations based on soil and climate data</li>
                <li>Enable early disease detection to prevent crop losses</li>
                <li>Connect farmers with market information and government schemes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To transform Indian agriculture through technology and innovation, ensuring food security, 
                farmer prosperity, and sustainable growth for the nation.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
