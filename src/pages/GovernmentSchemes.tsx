import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, ArrowLeft, ExternalLink, IndianRupee, Shield, CreditCard, FlaskConical, Sprout, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GovernmentSchemes() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const schemes = [
    {
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      category: 'Financial Support',
      icon: IndianRupee,
      logo: 'https://pmkisan.gov.in/Images/LogoPMKisanEnglish.png',
      description: 'Direct income support of ₹6000 per year to all farmer families in three equal installments',
      eligibility: 'All landholding farmers regardless of size of holdings',
      benefits: ['₹6000 per year', 'Direct bank transfer', 'Three installments'],
      status: 'Active',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'PM Fasal Bima Yojana',
      fullName: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Insurance',
      icon: Shield,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
      description: 'Comprehensive crop insurance scheme providing financial support against crop loss due to natural calamities',
      eligibility: 'All farmers growing notified crops in notified areas',
      benefits: ['Low premium', 'Coverage for all risks', 'Quick claim settlement'],
      status: 'Active',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Kisan Credit Card',
      fullName: 'Kisan Credit Card Scheme',
      category: 'Credit',
      icon: CreditCard,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
      description: 'Easy access to credit facility for farmers at subsidized interest rates for crop cultivation and allied activities',
      eligibility: 'Farmers, tenant farmers, oral lessees, and sharecroppers',
      benefits: ['Low interest rate', 'Flexible repayment', 'Insurance coverage'],
      status: 'Active',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Soil Health Card Scheme',
      fullName: 'Soil Health Card Scheme',
      category: 'Advisory',
      icon: FlaskConical,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
      description: 'Free soil testing and advisory for nutrient management to improve productivity through judicious use of inputs',
      eligibility: 'All farmers across the country',
      benefits: ['Free soil testing', 'Crop-wise recommendations', 'Increased productivity'],
      status: 'Active',
      color: 'from-amber-500 to-amber-600'
    },
    {
      name: 'PKVY',
      fullName: 'Paramparagat Krishi Vikas Yojana',
      category: 'Organic Farming',
      icon: Sprout,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
      description: 'Promotion of organic farming through adoption of organic villages by cluster approach and PGS certification',
      eligibility: 'Farmers interested in organic farming in groups of 50 or more',
      benefits: ['₹50,000/ha assistance', 'Organic certification', 'Market linkage'],
      status: 'Active',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      name: 'NMSA',
      fullName: 'National Mission for Sustainable Agriculture',
      category: 'Sustainability',
      icon: Sprout,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
      description: 'Promotes sustainable agriculture practices through climate resilient technologies and resource conservation',
      eligibility: 'All farmers practicing sustainable agriculture',
      benefits: ['Climate adaptation', 'Water conservation', 'Soil health improvement'],
      status: 'Active',
      color: 'from-teal-500 to-teal-600'
    },
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || scheme.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(schemes.map(s => s.category)))];

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
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-purple-700 mb-2">{t('govSchemes') || 'Government Schemes'}</h1>
            <p className="text-muted-foreground">{t('govSchemesDesc') || 'Explore schemes and subsidies available for farmers'}</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Schemes Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme, index) => {
              const Icon = scheme.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Header with gradient */}
                  <div className={`h-2 bg-gradient-to-r ${scheme.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      {/* Logo/Icon */}
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${scheme.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <CardTitle className="text-xl mb-1">{scheme.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{scheme.fullName}</p>
                          </div>
                          <Badge className={`bg-gradient-to-r ${scheme.color} text-white border-0`}>
                            {scheme.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {scheme.description}
                    </CardDescription>

                    {/* Key Benefits */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Eligibility</p>
                      <p className="text-sm">{scheme.eligibility}</p>
                    </div>

                    {/* Status and Action */}
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        ✓ {scheme.status}
                      </Badge>
                      <Button variant="outline" size="sm" className={`hover:bg-gradient-to-r ${scheme.color} hover:text-white hover:border-transparent transition-all`}>
                        Learn More <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No schemes found matching your criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
