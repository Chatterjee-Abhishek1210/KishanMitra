import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, ArrowLeft, Upload, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CropRecommendation() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
  });
  const [soilImage, setSoilImage] = useState<string | null>(null);
  const [extractedValues, setExtractedValues] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSoilImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSoilImage = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis - In production, this would call your ML model API
    setTimeout(() => {
      const mockValues = {
        nitrogen: Math.floor(Math.random() * 100) + 50,
        phosphorus: Math.floor(Math.random() * 50) + 20,
        potassium: Math.floor(Math.random() * 80) + 30,
        ph: (Math.random() * 3 + 5.5).toFixed(1),
        moisture: Math.floor(Math.random() * 40) + 30,
        organicMatter: (Math.random() * 3 + 1).toFixed(1)
      };
      setExtractedValues(mockValues);
      setFormData({
        nitrogen: mockValues.nitrogen.toString(),
        phosphorus: mockValues.phosphorus.toString(),
        potassium: mockValues.potassium.toString(),
        ph: mockValues.ph,
        rainfall: '',
        temperature: ''
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ML model integration will go here
    const recommendations = [
      { crop: 'Rice', suitability: '95%', reason: 'Optimal NPK ratio and pH level' },
      { crop: 'Wheat', suitability: '88%', reason: 'Good soil composition' },
      { crop: 'Cotton', suitability: '82%', reason: 'Adequate potassium levels' }
    ];
    setResult(JSON.stringify(recommendations));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Sprout className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-green-700 mb-2">{t('cropRecommendation')}</h1>
            <p className="text-muted-foreground">{t('cropRecommendationDesc')}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t('soilAnalysis') || 'Soil Analysis'}</CardTitle>
              <CardDescription>{t('soilAnalysisDesc') || 'Upload soil image or enter parameters manually'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="image" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">
                    <Camera className="h-4 w-4 mr-2" />
                    Soil Image Analysis
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Sprout className="h-4 w-4 mr-2" />
                    Manual Entry
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="image" className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    {soilImage ? (
                      <img src={soilImage} alt="Soil sample" className="max-h-64 mx-auto rounded-lg mb-4" />
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Upload soil image for AI analysis</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="soil-image-upload"
                    />
                    <label htmlFor="soil-image-upload">
                      <Button type="button" variant="outline" className="mt-4" onClick={() => document.getElementById('soil-image-upload')?.click()}>
                        {soilImage ? 'Change Image' : 'Select Image'}
                      </Button>
                    </label>
                  </div>

                  {soilImage && !extractedValues && (
                    <Button onClick={analyzeSoilImage} className="w-full" disabled={isAnalyzing}>
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Soil Image'}
                    </Button>
                  )}

                  {extractedValues && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-lg mb-3 text-green-800">Extracted Values from Image:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">Nitrogen (N)</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.nitrogen} kg/ha</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">Phosphorus (P)</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.phosphorus} kg/ha</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">Potassium (K)</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.potassium} kg/ha</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">pH Level</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.ph}</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">Moisture %</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.moisture}%</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-muted-foreground">Organic Matter</p>
                            <p className="text-lg font-bold text-green-700">{extractedValues.organicMatter}%</p>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="rainfall">Rainfall (mm)</Label>
                            <Input
                              id="rainfall"
                              type="number"
                              placeholder="mm"
                              value={formData.rainfall}
                              onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="temperature">Temperature (°C)</Label>
                            <Input
                              id="temperature"
                              type="number"
                              placeholder="°C"
                              value={formData.temperature}
                              onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Get Crop Recommendations</Button>
                      </form>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="manual">
                  <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      placeholder="kg/ha"
                      value={formData.nitrogen}
                      onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      placeholder="kg/ha"
                      value={formData.phosphorus}
                      onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (K)</Label>
                    <Input
                      id="potassium"
                      type="number"
                      placeholder="kg/ha"
                      value={formData.potassium}
                      onChange={(e) => setFormData({...formData, potassium: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ph">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      placeholder="0-14"
                      value={formData.ph}
                      onChange={(e) => setFormData({...formData, ph: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rainfall">Rainfall (mm)</Label>
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="mm"
                      value={formData.rainfall}
                      onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="°C"
                      value={formData.temperature}
                      onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Get Recommendation</Button>
              </form>
                </TabsContent>
              </Tabs>

              {result && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <h3 className="font-semibold text-xl mb-4 text-green-800">Recommended Crops:</h3>
                  <div className="space-y-3">
                    {JSON.parse(result).map((item: any, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-lg text-green-700">{item.crop}</h4>
                          <span className="text-2xl font-bold text-green-600">{item.suitability}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
