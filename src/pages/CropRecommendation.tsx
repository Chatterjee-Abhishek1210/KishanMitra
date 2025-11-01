import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CropRecommendation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
  });
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ML model integration will go here
    setResult('Based on your soil conditions, we recommend: Rice, Wheat, or Cotton');
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
            <Sprout className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-2">Crop Recommendation</h1>
            <p className="text-muted-foreground">Get AI-powered crop suggestions based on your soil conditions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enter Soil Parameters</CardTitle>
              <CardDescription>Provide your soil and environmental data</CardDescription>
            </CardHeader>
            <CardContent>
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
                <Button type="submit" className="w-full">Get Recommendation</Button>
              </form>

              {result && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
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
