import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, AlertOctagon, ShieldAlert } from 'lucide-react';

export interface RiskBadgeProps {
  id?: string;
  status: RiskLevel | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showDot?: boolean;
  score?: number;
  variant?: 'subtle' | 'solid' | 'outline';
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  id,
  status,
  size = 'md',
  showIcon = true,
  showDot = false,
  score,
  variant = 'subtle',
  className = '',
}) => {
  const normalizedStatus = (status || '').toUpperCase().trim();

  // Normalize status mapping
  let level: 'SAFE' | 'SUSPICIOUS' | 'HIGH RISK' = 'SAFE';
  if (normalizedStatus.includes('HIGH') || normalizedStatus.includes('CRITICAL')) {
    level = 'HIGH RISK';
  } else if (normalizedStatus.includes('SUSPICIOUS') || normalizedStatus.includes('MEDIUM') || normalizedStatus.includes('WARN')) {
    level = 'SUSPICIOUS';
  } else {
    level = 'SAFE';
  }

  const getStyleConfig = () => {
    switch (level) {
      case 'SAFE':
        return {
          label: 'SAFE',
          icon: ShieldCheck,
          subtle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
          solid: 'bg-emerald-600 text-white border-emerald-500',
          outline: 'bg-transparent text-emerald-400 border-emerald-500/40',
          dot: 'bg-emerald-400',
          pulse: 'animate-pulse',
        };
      case 'SUSPICIOUS':
        return {
          label: 'SUSPICIOUS',
          icon: AlertTriangle,
          subtle: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          solid: 'bg-amber-600 text-white border-amber-500',
          outline: 'bg-transparent text-amber-400 border-amber-500/40',
          dot: 'bg-amber-400',
          pulse: '',
        };
      case 'HIGH RISK':
      default:
        return {
          label: 'HIGH RISK',
          icon: AlertOctagon,
          subtle: 'bg-red-500/15 text-red-400 border-red-500/35 font-bold',
          solid: 'bg-red-600 text-white border-red-500 font-bold',
          outline: 'bg-transparent text-red-400 border-red-500/50 font-bold',
          dot: 'bg-red-500',
          pulse: 'animate-pulse',
        };
    }
  };

  const config = getStyleConfig();
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'text-[10px] font-medium px-2 py-0.5 gap-1',
    sm: 'text-xs font-semibold px-2.5 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-3 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  };

  const variantClass = config[variant] || config.subtle;

  return (
    <span
      id={id || `risk-badge-${level.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center justify-center rounded-full border whitespace-nowrap tracking-wide select-none font-mono ${variantClass} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.pulse} shrink-0`}
        />
      )}
      {showIcon && <Icon className={`${iconSizes[size]} shrink-0`} />}
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-80 font-mono text-[10px] ml-0.5">
          ({score})
        </span>
      )}
    </span>
  );
};
