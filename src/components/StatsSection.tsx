import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('totalMinistries'), value: '9', bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { label: t('totalSchemes'), value: '19', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' },
    { label: t('financialInstitutions'), value: '266', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { label: t('totalProjects'), value: '74809', bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
    { label: t('totalCost'), value: '167777.45', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
  ];

  return (
    <div className="bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">FY: 2025 - 2026</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className={`p-6 ${stat.bgColor} border-0 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
          
          <Card className="p-6 bg-gradient-to-br from-primary to-primary-light border-0 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="text-center space-y-2 text-white h-full flex flex-col items-center justify-center">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                {t('viewMore')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};