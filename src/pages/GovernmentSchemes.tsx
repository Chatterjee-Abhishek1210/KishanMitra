import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GovernmentSchemes() {
  const navigate = useNavigate();

  const schemes = [
    {
      name: 'PM-KISAN',
      category: 'Financial Support',
      description: 'Direct income support of ₹6000 per year to all farmer families',
      eligibility: 'All landholding farmers',
      status: 'Active',
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Insurance',
      description: 'Crop insurance scheme providing financial support in case of crop loss',
      eligibility: 'All farmers growing notified crops',
      status: 'Active',
    },
    {
      name: 'Kisan Credit Card (KCC)',
      category: 'Credit',
      description: 'Easy access to credit for farmers at subsidized interest rates',
      eligibility: 'Farmers, tenant farmers, and sharecroppers',
      status: 'Active',
    },
    {
      name: 'Soil Health Card Scheme',
      category: 'Advisory',
      description: 'Free soil testing and advisory for nutrient management',
      eligibility: 'All farmers',
      status: 'Active',
    },
    {
      name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'Organic Farming',
      description: 'Promotion of organic farming through financial assistance',
      eligibility: 'Farmers interested in organic farming',
      status: 'Active',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-2">Government Schemes</h1>
            <p className="text-muted-foreground">Explore schemes and subsidies available for farmers</p>
          </div>

          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{scheme.name}</CardTitle>
                      <CardDescription>{scheme.description}</CardDescription>
                    </div>
                    <Badge>{scheme.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Eligibility: </span>
                      <span className="text-muted-foreground">{scheme.eligibility}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Status: </span>
                      <Badge variant="outline" className="text-green-600">
                        {scheme.status}
                      </Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Learn More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
