import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  id?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id,
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
  compact = false,
}) => {
  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center text-center rounded-xl bg-black/25 border border-white/5 ${
        compact ? 'py-8 px-4' : 'py-12 px-6'
      } ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 mb-3.5 shadow-inner">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-200 tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
          {description}
        </p>
      )}

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/10 rounded-lg transition-colors cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
