import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  badgeText
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          iconBg: 'bg-green-500/10 text-green-500 border-green-500/20',
          valueColor: 'text-green-500',
          border: 'border-white/5 hover:border-green-500/30'
        };
      case 'warning':
        return {
          iconBg: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
          valueColor: 'text-orange-500',
          border: 'border-white/5 hover:border-orange-500/30'
        };
      case 'danger':
        return {
          iconBg: 'bg-red-500/10 text-red-500 border-red-500/20',
          valueColor: 'text-red-500',
          border: 'border-white/5 hover:border-red-500/30'
        };
      case 'info':
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          valueColor: 'text-white',
          border: 'border-white/5 hover:border-cyan-500/30'
        };
      default:
        return {
          iconBg: 'bg-white/5 text-gray-400 border-white/10',
          valueColor: 'text-white',
          border: 'border-white/5 hover:border-white/10'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      id={id || `stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`bg-[#1A1A1A] rounded-2xl p-5 border transition-all duration-200 shadow-lg shadow-black/40 ${styles.border}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {title}
        </span>
        <div className={`p-2 rounded-lg border ${styles.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-3xl font-bold tracking-tight font-sans ${styles.valueColor}`}>
          {value}
        </div>
        {badgeText && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 font-mono">
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-[10px] text-gray-500 italic leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
