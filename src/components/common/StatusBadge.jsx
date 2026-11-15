import React from 'react';
import { STATUS_COLORS } from '../../data/mockAstronauts';

export default function StatusBadge({ status = 'NORMAL', size = 'sm', pulse = true }) {
  const normStatus = (status || 'NORMAL').toUpperCase();
  const config = STATUS_COLORS[normStatus] || STATUS_COLORS.NORMAL;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm font-semibold',
    lg: 'px-3 py-1.5 text-base font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono tracking-wide ${config.badge} ${sizeClasses[size] || sizeClasses.sm}`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${config.dot} ${pulse ? 'animate-pulse' : ''}`}
      />
      {normStatus}
    </span>
  );
}
