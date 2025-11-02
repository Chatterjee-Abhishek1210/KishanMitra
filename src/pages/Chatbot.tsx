import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Mic, MicOff, Volume2, Image, X, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  image?: string;
  audio?: boolean;
}

export default function Chatbot() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi' ? 'नमस्ते! मैं किसानमित्र हूं। मैं आपकी कृषि संबंधी सभी समस्याओं में मदद कर सकता हूं। आप मुझसे फसल की सिफारिश, रोग पहचान, मौसम की जानकारी और सरकारी योजनाओं के बारे में पूछ सकते हैं।' :
             language === 'ta' ? 'வணக்கம்! நான் கிசான்மித்ரா. உங்கள் விவசாய தேவைகளில் உதவ நான் இங்கு இருக்கிறேன்.' :
             'Hello! I am KisanMitra, your AI farming assistant. I can help you with crop recommendations, disease detection, weather information, and government schemes. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input || 'Sent an image',
      timestamp: new Date(),
      image: selectedImage || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        en: {
          'crop': 'Based on your soil conditions and climate, I recommend growing Rice, Wheat, or Cotton. Rice is particularly suitable for areas with high rainfall and fertile soil.',
          'disease': 'I can help identify crop diseases. Please upload a clear image of the affected plant leaf or stem.',
          'weather': 'Current weather: 28°C, Partly Cloudy. Expected rainfall in 2 days. This is good weather for sowing operations.',
          'scheme': 'You may be eligible for PM-KISAN (₹6000/year), PM Fasal Bima Yojana (crop insurance), and Kisan Credit Card. Would you like more details on any scheme?',
          'price': 'Current market prices: Rice ₹2,100/quintal (+5%), Wheat ₹2,015/quintal (-2%), Cotton ₹6,800/quintal (+8%). Prices are trending upward.',
          'default': 'I understand you need help with farming. I can assist you with:\n• Crop recommendations\n• Disease detection\n• Weather forecasts\n• Market prices\n• Government schemes\n\nWhat would you like to know?'
        },
        hi: {
          'crop': 'आपकी मिट्टी और जलवायु के आधार पर, मैं चावल, गेहूं या कपास उगाने की सलाह देता हूं। चावल विशेष रूप से उच्च वर्षा और उपजाऊ मिट्टी वाले क्षेत्रों के लिए उपयुक्त है।',
          'disease': 'मैं फसल रोगों की पहचान में मदद कर सकता हूं। कृपया प्रभावित पौधे की पत्ती या तने की स्पष्ट तस्वीर अपलोड करें।',
          'weather': 'वर्तमान मौसम: 28°C, आंशिक रूप से बादल छाए हुए। 2 दिनों में वर्षा की उम्मीद। यह बुवाई के लिए अच्छा मौसम है।',
          'scheme': 'आप पीएम-किसान (₹6000/वर्ष), पीएम फसल बीमा योजना और किसान क्रेडिट कार्ड के लिए पात्र हो सकते हैं। क्या आप किसी योजना के बारे में अधिक जानकारी चाहते हैं?',
          'price': 'वर्तमान बाजार मूल्य: चावल ₹2,100/क्विंटल (+5%), गेहूं ₹2,015/क्विंटल (-2%), कपास ₹6,800/क्विंटल (+8%)।',
          'default': 'मैं समझता हूं कि आपको खेती में मदद चाहिए। मैं आपकी मदद कर सकता हूं:\n• फसल सिफारिशें\n• रोग पहचान\n• मौसम पूर्वानुमान\n• बाजार मूल्य\n• सरकारी योजनाएं\n\nआप क्या जानना चाहेंगे?'
        }
      };

      const currentLang = language === 'hi' ? 'hi' : 'en';
      const responses = botResponses[currentLang];
      
      let response = responses.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('crop') || lowerInput.includes('फसल') || selectedImage) {
        response = responses.crop;
      } else if (lowerInput.includes('disease') || lowerInput.includes('रोग') || lowerInput.includes('बीमारी')) {
        response = responses.disease;
      } else if (lowerInput.includes('weather') || lowerInput.includes('मौसम')) {
        response = responses.weather;
      } else if (lowerInput.includes('scheme') || lowerInput.includes('योजना')) {
        response = responses.scheme;
      } else if (lowerInput.includes('price') || lowerInput.includes('मूल्य') || lowerInput.includes('दाम')) {
        response = responses.price;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      // In production, integrate with Web Speech API
      setTimeout(() => {
        setIsRecording(false);
        setInput('How to prevent crop diseases?');
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    setIsSpeaking(true);
    // In production, integrate with Web Speech API
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-green-700 mb-2">{t('chatbot') || 'AI Chatbot Assistant'}</h1>
            <p className="text-muted-foreground">{t('chatbotDesc') || 'Ask me anything about farming in your language'}</p>
            
            {/* Language Selector */}
            <div className="mt-4 flex justify-center gap-2 items-center">
              <span className="text-sm text-muted-foreground">Chat Language:</span>
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-600" />
                KisanMitra AI Assistant
                <Badge variant="secondary" className="ml-auto">Online</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <Avatar className="h-8 w-8 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </Avatar>
                      )}
                      <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.image && (
                            <img src={message.image} alt="Uploaded" className="max-w-xs rounded mb-2" />
                          )}
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.type === 'bot' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handleTextToSpeech(message.content)}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      {message.type === 'user' && (
                        <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Image Preview */}
              {selectedImage && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="relative inline-block">
                    <img src={selectedImage} alt="Selected" className="max-h-32 rounded" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceInput}
                    className={`shrink-0 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                  >
                    {isRecording ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={language === 'hi' ? 'अपना सवाल यहाँ लिखें...' : language === 'ta' ? 'உங்கள் கேள்வியை இங்கே டைப் செய்யுங்கள்...' : 'Type your question here...'}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setInput('Recommend crops for my soil')}>
                    Crop Recommendation
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setInput('How to detect plant diseases?')}>
                    Disease Detection
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setInput('What are current market prices?')}>
                    Market Prices
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setInput('Tell me about government schemes')}>
                    Government Schemes
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
