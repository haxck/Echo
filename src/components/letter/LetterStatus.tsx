import React from 'react';
import { ErrorResponse } from '../../types';
import { utils } from '../../services/api';

interface LetterStatusProps {
  data: ErrorResponse;
  remainingTime?: string;
}

export const LetterStatus: React.FC<LetterStatusProps> = ({ data, remainingTime }) => {
  if (data.error === 'not_found') {
    return (
      <div className="mt-6 bg-orange-100/50 shadow-xl max-w-2xl w-full rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">😢 {data.message}</h2>
        <p>这封信可能已经不存在了</p>
      </div>
    );
  }

  if (data.error === 'slow_read') {
    return (
      <div className="mt-6 bg-orange-100/50 shadow-xl max-w-2xl w-full rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">🕒 声声慢模式</h2>
        <p className="mb-4">这封信还在路上，需要等一段时间才能阅读</p>
        <p className="text-lg font-semibold">还需等待：{remainingTime}</p>
      </div>
    );
  }

  if (data.error === 'burn_after_read') {
    return (
      <div className="mt-6 bg-orange-100/50 shadow-xl max-w-2xl w-full rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">🔥 阅后即焚</h2>
        <p>{data.message}</p>
      </div>
    );
  }

  return null;
}; 