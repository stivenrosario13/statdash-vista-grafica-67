
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LucideIcon, TrendingUp, TrendingDown, Minus, Info, Target } from 'lucide-react';
import { useGlobalData } from '@/contexts/GlobalDataContext';

interface InteractiveMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  target?: number;
  description?: string;
  onEdit?: () => void;
  isEditable?: boolean;
  showProgress?: boolean;
}

export function InteractiveMetricCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  target,
  description,
  onEdit,
  isEditable = false,
  showProgress = false
}: InteractiveMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { state } = useGlobalData();

  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      icon: 'bg-blue-500',
      text: 'text-blue-600'
    },
    green: {
      bg: 'from-green-50 to-green-100',
      border: 'border-green-200',
      icon: 'bg-green-500',
      text: 'text-green-600'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      icon: 'bg-purple-500',
      text: 'text-purple-600'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100',
      border: 'border-orange-200',
      icon: 'bg-orange-500',
      text: 'text-orange-600'
    },
    red: {
      bg: 'from-red-50 to-red-100',
      border: 'border-red-200',
      icon: 'bg-red-500',
      text: 'text-red-600'
    },
    teal: {
      bg: 'from-teal-50 to-teal-100',
      border: 'border-teal-200',
      icon: 'bg-teal-500',
      text: 'text-teal-600'
    }
  };

  const currentValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^\d]/g, '')) || 0 : value;
  const progressPercentage = target ? (currentValue / target) * 100 : 0;

  return (
    <Card 
      className={`
        bg-gradient-to-br ${colorClasses[color].bg} ${colorClasses[color].border}
        shadow-xl hover:shadow-2xl transition-all duration-500 
        transform hover:scale-105 cursor-pointer group
        ${isHovered ? 'ring-2 ring-blue-300' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative">
        {isEditable && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onEdit}
          >
            <Info className="h-4 w-4" />
          </Button>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className={`${colorClasses[color].text} text-sm font-bold uppercase tracking-wide`}>
                {title}
              </p>
              {state.settings?.autoRefresh && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <p className="text-3xl font-bold text-black mb-2">
              {value}
            </p>

            {trend && (
              <div className="flex items-center gap-2">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : trend.value === 0 ? (
                  <Minus className="h-4 w-4 text-gray-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <Badge 
                  className={`
                    ${trend.isPositive ? 'bg-green-100 text-green-800' : 
                      trend.value === 0 ? 'bg-gray-100 text-gray-800' : 
                      'bg-red-100 text-red-800'}
                    font-bold text-xs
                  `}
                >
                  {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
                </Badge>
                <span className="text-gray-600 text-sm">{trend.label}</span>
              </div>
            )}

            {showProgress && target && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Progreso</span>
                  <span className="text-xs font-bold text-gray-800">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-2"
                />
              </div>
            )}

            {description && (
              <p className="text-gray-600 text-sm mt-2">{description}</p>
            )}
          </div>

          <div className={`${colorClasses[color].icon} p-4 rounded-full shadow-lg relative`}>
            <Icon className="h-8 w-8 text-white" />
            {target && progressPercentage >= 100 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="h-2 w-2 text-white" />
              </div>
            )}
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 pointer-events-none" />
        )}
      </CardContent>
    </Card>
  );
}
