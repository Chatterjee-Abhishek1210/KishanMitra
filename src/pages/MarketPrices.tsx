import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, ArrowLeft, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MarketPrices() {
  const navigate = useNavigate();

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
            <h1 className="text-4xl font-bold text-primary mb-2">Market Prices</h1>
            <p className="text-muted-foreground">Current mandi rates and price forecasts</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Today's Mandi Rates</CardTitle>
              <CardDescription>Live prices from nearest markets</CardDescription>
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Price Forecast</CardTitle>
              <CardDescription>AI-powered predictions for next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <p>Price trend charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
