import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DiseaseDetection() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

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
    // ML model integration will go here
    setResult('Disease Detected: Early Blight\nConfidence: 95%\nRecommendation: Apply fungicide and remove affected leaves');
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
            <h1 className="text-4xl font-bold text-primary mb-2">Disease Detection</h1>
            <p className="text-muted-foreground">Upload a leaf image to detect crop diseases using AI</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload Crop Image</CardTitle>
              <CardDescription>Take a clear photo of the affected leaf</CardDescription>
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
                <Button onClick={handleAnalyze} className="w-full">
                  Analyze Image
                </Button>
              )}

              {result && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-lg mb-2">Analysis Result:</h3>
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
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
