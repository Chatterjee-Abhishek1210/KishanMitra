import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
export const Hero = () => {
  const {
    t
  } = useLanguage();
  return <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary min-h-[500px] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Powered by AI & ML</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('heroTitle')}
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              {t('heroDescription')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/auth">
                  {t('getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-base text-slate-900 bg-zinc-200 hover:bg-zinc-100">
                {t('learnMore')}
              </Button>
            </div>

            {/* Carousel controls */}
            <div className="flex gap-2 pt-8">
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full border border-white/20 text-white hover:bg-white/10">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full border border-white/20 text-white hover:bg-white/10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Schemes card */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary">{t('topSchemes')}</h3>
              <div className="space-y-3">
                {['Agri Sure Fund for Start Ups & Rural Enterprises', 'Agriculture Infrastructure Fund', 'Animal Husbandry Infrastructure Development Fund', 'National Livestock Mission - NLM', 'National Horticulture Board'].map((scheme, idx) => <div key={idx} className="p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <p className="text-sm font-medium">{scheme}</p>
                  </div>)}
              </div>
              <Button variant="link" className="text-primary p-0">
                {t('viewMore')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};