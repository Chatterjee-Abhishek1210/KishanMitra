import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, ArrowLeft, Upload, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FertilizerRecommendation() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    cropType: '',
    soilType: '',
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
        soilType: ['clay', 'sandy', 'loamy', 'black', 'red'][Math.floor(Math.random() * 5)],
        deficiency: ['nitrogen', 'phosphorus', 'potassium'][Math.floor(Math.random() * 3)]
      };
      setExtractedValues(mockValues);
      setFormData({
        nitrogen: mockValues.nitrogen.toString(),
        phosphorus: mockValues.phosphorus.toString(),
        potassium: mockValues.potassium.toString(),
        cropType: formData.cropType,
        soilType: mockValues.soilType
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ML model integration will go here
    const recommendation = {
      fertilizer: 'NPK 10:26:26',
      quantity: '200 kg/ha',
      application: 'Split application - 50% at base, 25% at tillering, 25% at flowering',
      additionalNutrients: ['Zinc Sulphate: 25 kg/ha', 'Gypsum: 200 kg/ha']
    };
    setResult(JSON.stringify(recommendation));
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
            <Leaf className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">{t('fertilizerRecommendation') || 'Fertilizer Recommendation'}</h1>
            <p className="text-muted-foreground">{t('fertilizerRecommendationDesc') || 'Optimize your fertilizer usage with AI-powered suggestions'}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t('soilCropInfo') || 'Soil & Crop Information'}</CardTitle>
              <CardDescription>{t('soilCropInfoDesc') || 'Upload soil image or enter parameters manually'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="image" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">
                    <Camera className="h-4 w-4 mr-2" />
                    Image Analysis
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Leaf className="h-4 w-4 mr-2" />
                    Manual Entry
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="image" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Crop Type</Label>
                      <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="sugarcane">Sugarcane</SelectItem>
                          <SelectItem value="maize">Maize</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      {soilImage ? (
                        <img src={soilImage} alt="Soil sample" className="max-h-64 mx-auto rounded-lg mb-4" />
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Upload soil/plant image for nutrient analysis</p>
                          <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="fertilizer-image-upload"
                      />
                      <label htmlFor="fertilizer-image-upload">
                        <Button type="button" variant="outline" className="mt-4" onClick={() => document.getElementById('fertilizer-image-upload')?.click()}>
                          {soilImage ? 'Change Image' : 'Select Image'}
                        </Button>
                      </label>
                    </div>

                    {soilImage && !extractedValues && formData.cropType && (
                      <Button onClick={analyzeSoilImage} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isAnalyzing}>
                        {isAnalyzing ? 'Analyzing Nutrient Levels...' : 'Analyze Image'}
                      </Button>
                    )}

                    {extractedValues && (
                      <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h3 className="font-semibold text-lg mb-3 text-emerald-800">Extracted Nutrient Analysis:</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-white p-3 rounded border">
                              <p className="text-muted-foreground">Nitrogen (N)</p>
                              <p className="text-lg font-bold text-emerald-700">{extractedValues.nitrogen} kg/ha</p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="text-muted-foreground">Phosphorus (P)</p>
                              <p className="text-lg font-bold text-emerald-700">{extractedValues.phosphorus} kg/ha</p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="text-muted-foreground">Potassium (K)</p>
                              <p className="text-lg font-bold text-emerald-700">{extractedValues.potassium} kg/ha</p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="text-muted-foreground">Soil Type</p>
                              <p className="text-lg font-bold text-emerald-700 capitalize">{extractedValues.soilType}</p>
                            </div>
                            <div className="bg-white p-3 rounded border col-span-2">
                              <p className="text-muted-foreground">Detected Deficiency</p>
                              <p className="text-lg font-bold text-orange-600 capitalize">{extractedValues.deficiency}</p>
                            </div>
                          </div>
                        </div>
                        <Button onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700">Get Fertilizer Recommendations</Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="manual">
                  <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Get Recommendation</Button>
              </form>
                </TabsContent>
              </Tabs>

              {result && (
                <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
                  <h3 className="font-semibold text-xl mb-4 text-emerald-800">Fertilizer Recommendation:</h3>
                  {(() => {
                    const rec = JSON.parse(result);
                    return (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Recommended Fertilizer</p>
                              <p className="text-2xl font-bold text-emerald-700">{rec.fertilizer}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Application Rate</p>
                              <p className="text-xl font-bold text-emerald-600">{rec.quantity}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm font-semibold text-muted-foreground mb-2">Application Method:</p>
                          <p className="text-sm">{rec.application}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm font-semibold text-muted-foreground mb-2">Additional Nutrients:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {rec.additionalNutrients.map((nutrient: string, idx: number) => (
                              <li key={idx} className="text-sm">{nutrient}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
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
