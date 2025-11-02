import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, ArrowLeft, TrendingDown, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function MarketPrices() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const forecastData = {
    rice: [
      { month: 'Jan', actual: 2100, predicted: 2150, low: 2050, high: 2250 },
      { month: 'Feb', actual: 2120, predicted: 2180, low: 2080, high: 2280 },
      { month: 'Mar', actual: 2150, predicted: 2200, low: 2100, high: 2300 },
      { month: 'Apr', predicted: 2250, low: 2150, high: 2350 },
      { month: 'May', predicted: 2300, low: 2200, high: 2400 },
      { month: 'Jun', predicted: 2280, low: 2180, high: 2380 },
    ],
    wheat: [
      { month: 'Jan', actual: 2015, predicted: 2000, low: 1950, high: 2100 },
      { month: 'Feb', actual: 2000, predicted: 1980, low: 1930, high: 2080 },
      { month: 'Mar', actual: 1990, predicted: 1970, low: 1920, high: 2070 },
      { month: 'Apr', predicted: 2050, low: 2000, high: 2150 },
      { month: 'May', predicted: 2100, low: 2050, high: 2200 },
      { month: 'Jun', predicted: 2150, low: 2100, high: 2250 },
    ],
    cotton: [
      { month: 'Jan', actual: 6800, predicted: 6850, low: 6700, high: 6950 },
      { month: 'Feb', actual: 6850, predicted: 6900, low: 6750, high: 7000 },
      { month: 'Mar', actual: 6900, predicted: 6950, low: 6800, high: 7050 },
      { month: 'Apr', predicted: 7100, low: 7000, high: 7200 },
      { month: 'May', predicted: 7200, low: 7100, high: 7300 },
      { month: 'Jun', predicted: 7150, low: 7050, high: 7250 },
    ]
  };

  const marketComparison = [
    { market: 'Delhi Mandi', rice: 2100, wheat: 2015, cotton: 6800 },
    { market: 'Mumbai APMC', rice: 2150, wheat: 2050, cotton: 6900 },
    { market: 'Kolkata Market', rice: 2080, wheat: 1990, cotton: 6750 },
    { market: 'Chennai Mandi', rice: 2120, wheat: 2030, cotton: 6850 },
  ];

  const marketData = [
    { crop: 'Rice', price: '₹2,100/quintal', change: '+5%', trend: 'up' },
    { crop: 'Wheat', price: '₹2,015/quintal', change: '-2%', trend: 'down' },
    { crop: 'Cotton', price: '₹6,800/quintal', change: '+8%', trend: 'up' },
    { crop: 'Sugarcane', price: '₹325/quintal', change: '+3%', trend: 'up' },
    { crop: 'Maize', price: '₹1,850/quintal', change: '-1%', trend: 'down' },
    { crop: 'Soybean', price: '₹4,200/quintal', change: '+6%', trend: 'up' },
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
            <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-blue-700 mb-2">{t('marketPrices') || 'Market Prices'}</h1>
            <p className="text-muted-foreground">{t('marketPricesDesc') || 'Current mandi rates and AI-powered price forecasts'}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t('todayMandiRates') || "Today's Mandi Rates"}</CardTitle>
              <CardDescription>{t('todayMandiRatesDesc') || 'Live prices from nearest markets'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Change (24h)</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.crop}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {item.change}
                      </TableCell>
                      <TableCell>
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    AI Price Forecast (Next 6 Months)
                  </CardTitle>
                  <CardDescription>Predictive analytics based on historical data and market trends</CardDescription>
                </div>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={forecastData[selectedCrop as keyof typeof forecastData]}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="actual" stroke="#10b981" fillOpacity={1} fill="url(#colorActual)" name="Actual Price" />
                  <Area type="monotone" dataKey="predicted" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPredicted)" name="Predicted Price" />
                  <Line type="monotone" dataKey="high" stroke="#ef4444" strokeDasharray="5 5" name="High Estimate" />
                  <Line type="monotone" dataKey="low" stroke="#f59e0b" strokeDasharray="5 5" name="Low Estimate" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold text-green-700">₹{forecastData[selectedCrop as keyof typeof forecastData][2].actual}/quintal</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground">6-Month Forecast</p>
                  <p className="text-2xl font-bold text-blue-700">₹{forecastData[selectedCrop as keyof typeof forecastData][5].predicted}/quintal</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-muted-foreground">Expected Change</p>
                  <p className="text-2xl font-bold text-purple-700">+{((forecastData[selectedCrop as keyof typeof forecastData][5].predicted - forecastData[selectedCrop as keyof typeof forecastData][2].actual!) / forecastData[selectedCrop as keyof typeof forecastData][2].actual! * 100).toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle>Regional Market Comparison</CardTitle>
              <CardDescription>Compare prices across different mandis (₹/quintal)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="market" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rice" fill="#10b981" name="Rice" />
                  <Bar dataKey="wheat" fill="#f59e0b" name="Wheat" />
                  <Bar dataKey="cotton" fill="#3b82f6" name="Cotton" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
