import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FertilizerRecommendation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    cropType: '',
    soilType: '',
  });
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ML model integration will go here
    setResult('Recommended Fertilizer: NPK 10:26:26 at 200 kg/ha');
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
            <h1 className="text-4xl font-bold text-primary mb-2">Fertilizer Recommendation</h1>
            <p className="text-muted-foreground">Optimize your fertilizer usage with AI-powered suggestions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Soil & Crop Information</CardTitle>
              <CardDescription>Enter your soil parameters and crop details</CardDescription>
            </CardHeader>
            <CardContent>
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

                <Button type="submit" className="w-full">Get Recommendation</Button>
              </form>

              {result && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h3 className="font-semibold text-lg mb-2">Recommendation Result:</h3>
                  <p>{result}</p>
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
