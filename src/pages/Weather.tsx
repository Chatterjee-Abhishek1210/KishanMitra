import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Weather() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = () => {
    setIsLoading(true);
    // Simulate API call - In production, integrate with weather API
    setTimeout(() => {
      setWeatherData({
        location: location || 'Mumbai, Maharashtra',
        temperature: 28,
        feelsLike: 32,
        condition: 'Partly Cloudy',
        humidity: 75,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        forecast: [
          { day: 'Mon', high: 30, low: 24, condition: 'Sunny', icon: Sun, rain: 10 },
          { day: 'Tue', high: 29, low: 23, condition: 'Cloudy', icon: Cloud, rain: 30 },
          { day: 'Wed', high: 27, low: 22, condition: 'Rainy', icon: CloudRain, rain: 80 },
          { day: 'Thu', high: 28, low: 23, condition: 'Cloudy', icon: Cloud, rain: 40 },
          { day: 'Fri', high: 30, low: 24, condition: 'Sunny', icon: Sun, rain: 5 },
          { day: 'Sat', high: 31, low: 25, condition: 'Sunny', icon: Sun, rain: 5 },
          { day: 'Sun', high: 29, low: 24, condition: 'Partly Cloudy', icon: Cloud, rain: 20 },
        ],
        hourly: [
          { time: '12 AM', temp: 24, rain: 10 },
          { time: '3 AM', temp: 23, rain: 15 },
          { time: '6 AM', temp: 24, rain: 20 },
          { time: '9 AM', temp: 26, rain: 10 },
          { time: '12 PM', temp: 28, rain: 5 },
          { time: '3 PM', temp: 30, rain: 5 },
          { time: '6 PM', temp: 27, rain: 15 },
          { time: '9 PM', temp: 25, rain: 20 },
        ],
        alerts: [
          { type: 'warning', message: 'Heavy rainfall expected on Wednesday' },
          { type: 'info', message: 'Good weather for sowing operations on Friday-Sunday' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        getWeather();
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full mb-4">
              <Cloud className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-blue-700 mb-2">{t('weatherForecast') || 'Weather Forecast'}</h1>
            <p className="text-muted-foreground">{t('weatherForecastDesc') || 'Get accurate weather predictions for better farm planning'}</p>
          </div>

          {/* Location Search */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter city or location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && getWeather()}
                  />
                </div>
                <Button onClick={getWeather} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Use My Location
                </Button>
              </div>
            </CardContent>
          </Card>

          {weatherData && (
            <>
              {/* Current Weather */}
              <Card className="mb-6 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{weatherData.location}</h2>
                      <p className="text-lg opacity-90">{weatherData.condition}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-6xl font-bold">{weatherData.temperature}°C</div>
                      <p className="text-sm opacity-90">Feels like {weatherData.feelsLike}°C</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Droplets className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                        <p className="text-lg font-bold">{weatherData.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                      <Wind className="h-8 w-8 text-sky-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Wind Speed</p>
                        <p className="text-lg font-bold">{weatherData.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                      <Eye className="h-8 w-8 text-indigo-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Visibility</p>
                        <p className="text-lg font-bold">{weatherData.visibility} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Gauge className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pressure</p>
                        <p className="text-lg font-bold">{weatherData.pressure} mb</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alerts */}
              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <div className="mb-6 space-y-3">
                  {weatherData.alerts.map((alert: any, idx: number) => (
                    <Card key={idx} className={`border-l-4 ${alert.type === 'warning' ? 'border-l-orange-500 bg-orange-50' : 'border-l-blue-500 bg-blue-50'}`}>
                      <CardContent className="p-4">
                        <p className="font-medium">{alert.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* 7-Day Forecast */}
              <Card className="mb-6 shadow-lg">
                <CardHeader>
                  <CardTitle>7-Day Forecast</CardTitle>
                  <CardDescription>Plan your farming activities ahead</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {weatherData.forecast.map((day: any, idx: number) => {
                      const Icon = day.icon;
                      return (
                        <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <p className="font-semibold mb-2">{day.day}</p>
                            <Icon className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                            <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
                            <div className="flex justify-center gap-2 text-sm">
                              <span className="font-bold">{day.high}°</span>
                              <span className="text-muted-foreground">{day.low}°</span>
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-600">
                              <CloudRain className="h-3 w-3" />
                              <span>{day.rain}%</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Hourly Forecast */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                  <CardDescription>Temperature and precipitation trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 pb-2">
                      {weatherData.hourly.map((hour: any, idx: number) => (
                        <div key={idx} className="flex flex-col items-center min-w-[80px] p-3 bg-gradient-to-b from-blue-50 to-white rounded-lg">
                          <p className="text-sm font-medium mb-2">{hour.time}</p>
                          <p className="text-2xl font-bold text-blue-700 mb-2">{hour.temp}°</p>
                          <div className="flex items-center gap-1 text-xs text-blue-600">
                            <CloudRain className="h-3 w-3" />
                            <span>{hour.rain}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Map Placeholder */}
              <Card className="mt-6 shadow-lg">
                <CardHeader>
                  <CardTitle>Weather Map</CardTitle>
                  <CardDescription>Interactive weather radar and satellite view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-100 to-sky-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">Weather Map Integration</p>
                      <p className="text-sm text-muted-foreground mt-2">Interactive map with radar, satellite, and precipitation layers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!weatherData && !isLoading && (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <Cloud className="h-20 w-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Enter a location to view weather forecast</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
