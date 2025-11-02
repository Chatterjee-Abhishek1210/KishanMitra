import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Video, Image, Play, Search, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MediaCorner = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // YouTube video recommendations based on farming topics
  const youtubeVideos = [
    {
      id: '1',
      title: 'Modern Crop Disease Detection Using AI',
      description: 'Learn how artificial intelligence is revolutionizing disease detection in crops',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Technology',
      views: '125K',
      duration: '12:45'
    },
    {
      id: '2',
      title: 'Soil Health Management - Complete Guide',
      description: 'Expert tips on maintaining and improving soil health for better crop yields',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Tutorial',
      views: '98K',
      duration: '18:30'
    },
    {
      id: '3',
      title: 'Organic Farming Success Stories',
      description: 'Inspiring stories of farmers who transitioned to organic farming',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Success Story',
      views: '210K',
      duration: '15:20'
    },
    {
      id: '4',
      title: 'Smart Irrigation Techniques',
      description: 'Water conservation through modern irrigation methods',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Technology',
      views: '87K',
      duration: '10:15'
    },
    {
      id: '5',
      title: 'Government Schemes Explained',
      description: 'Complete guide to PM-KISAN and other farmer welfare schemes',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Information',
      views: '156K',
      duration: '14:50'
    },
    {
      id: '6',
      title: 'Market Price Prediction Tips',
      description: 'How to predict and leverage market price trends',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
      category: 'Tutorial',
      views: '76K',
      duration: '11:30'
    },
  ];

  const mediaItems = [
    {
      type: 'Press Release',
      icon: FileText,
      title: 'New AI-Powered Agricultural Platform Launched',
      date: '2025-10-28',
      description: 'Ministry launches innovative platform to empower farmers with AI-driven insights'
    },
    {
      type: 'Video',
      icon: Video,
      title: 'Success Stories: Farmers Using AI Technology',
      date: '2025-10-25',
      description: 'Documentary showcasing how AI is transforming farming practices across India'
    },
    {
      type: 'Gallery',
      icon: Image,
      title: 'National Agriculture Summit 2025',
      date: '2025-10-20',
      description: 'Photo coverage of the recent agriculture summit highlighting key initiatives'
    },
    {
      type: 'Press Release',
      icon: FileText,
      title: 'Record Crop Production Achieved',
      date: '2025-10-15',
      description: 'India achieves milestone in agricultural output with technology integration'
    },
    {
      type: 'Video',
      icon: Video,
      title: 'Training: Using Disease Detection System',
      date: '2025-10-10',
      description: 'Tutorial videos for farmers on utilizing AI-based disease detection tools'
    },
    {
      type: 'Gallery',
      icon: Image,
      title: 'Farmer Training Programs',
      date: '2025-10-05',
      description: 'Images from recent digital literacy and training programs for farmers'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Press Release': return 'bg-blue-600';
      case 'Video': return 'bg-purple-600';
      case 'Gallery': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
            <Video className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            {t('media')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Latest news, educational videos, and media coverage on agriculture and farming
          </p>
        </div>

        <Tabs defaultValue="videos" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">
              <Youtube className="h-4 w-4 mr-2" />
              Video Library
            </TabsTrigger>
            <TabsTrigger value="news">
              <FileText className="h-4 w-4 mr-2" />
              News & Updates
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Image className="h-4 w-4 mr-2" />
              Photo Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search farming videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeVideos
                .filter(video => 
                  video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  video.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((video) => (
                  <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-full w-16 h-16 bg-red-600 hover:bg-red-700 opacity-90 hover:opacity-100"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                      >
                        <Play className="h-8 w-8 text-white ml-1" fill="white" />
                      </Button>
                      <div className="absolute bottom-2 right-2 z-20 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm line-clamp-2 flex-1">{video.title}</h3>
                        <Badge variant="secondary" className="ml-2 shrink-0">{video.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          {video.views} views
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                        >
                          Watch on YouTube
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="grid md:grid-cols-2 gap-6">
          {mediaItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl flex-1">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <Card key={idx} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Image className="h-12 w-12 text-green-600 opacity-50" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium">Gallery Image {idx}</p>
                    <p className="text-xs text-muted-foreground">Agricultural Event 2025</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MediaCorner;
