
import { useMemo } from 'react';

export const useNumberFormat = () => {
  const formatCurrency = (amount: number, currency: string = 'RD$'): string => {
    return `${currency} ${amount.toLocaleString('es-DO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatNumber = (value: number, decimals: number = 0): string => {
    return value.toLocaleString('es-DO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatPercentage = (value: number, decimals: number = 1): string => {
    return `${value.toLocaleString('es-DO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}%`;
  };

  return useMemo(() => ({
    formatCurrency,
    formatNumber,
    formatPercentage
  }), []);
};
