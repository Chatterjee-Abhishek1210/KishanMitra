import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, ArrowLeft, Upload, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DiseaseDetection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // ML model integration will go here
    setTimeout(() => {
      const diseases = [
        { name: 'Early Blight', confidence: 95, severity: 'High' },
        { name: 'Late Blight', confidence: 78, severity: 'Medium' },
        { name: 'Leaf Spot', confidence: 65, severity: 'Low' }
      ];
      const recommendations = [
        'Apply Mancozeb fungicide (2g/L) immediately',
        'Remove and destroy severely infected leaves',
        'Ensure proper spacing for air circulation',
        'Apply preventive spray every 7-10 days'
      ];
      setResult({ diseases, recommendations, primaryDisease: diseases[0] });
      setIsAnalyzing(false);
    }, 2000);
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
            <Bug className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-red-700 mb-2">{t('cropDiseaseDetection') || 'Crop Disease Detection'}</h1>
            <p className="text-muted-foreground">{t('cropDiseaseDetectionDesc') || 'Upload a crop image to detect diseases using AI'}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t('uploadCropImage') || 'Upload Crop Image'}</CardTitle>
              <CardDescription>{t('uploadCropImageDesc') || 'Take a clear photo of the affected plant part'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded crop" className="max-h-64 mx-auto rounded-lg" />
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button type="button" className="mt-4" onClick={() => document.getElementById('image-upload')?.click()}>
                    {selectedImage ? 'Change Image' : 'Select Image'}
                  </Button>
                </label>
              </div>

              {selectedImage && (
                <Button onClick={handleAnalyze} className="w-full bg-red-600 hover:bg-red-700" disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing Disease...' : 'Analyze Image'}
                </Button>
              )}

              {result && (
                <div className="mt-6 space-y-4">
                  <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-red-800 mb-1">Primary Disease Detected</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-red-700">{result.primaryDisease.name}</p>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Confidence</p>
                            <p className="text-3xl font-bold text-red-600">{result.primaryDisease.confidence}%</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            result.primaryDisease.severity === 'High' ? 'bg-red-200 text-red-800' :
                            result.primaryDisease.severity === 'Medium' ? 'bg-orange-200 text-orange-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            Severity: {result.primaryDisease.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h4 className="font-semibold text-lg mb-3">All Detected Possibilities:</h4>
                    <div className="space-y-2">
                      {result.diseases.map((disease: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">{disease.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{disease.severity} Severity</span>
                            <span className="font-bold text-red-600">{disease.confidence}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-lg mb-3 text-green-800">Treatment Recommendations:</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
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
