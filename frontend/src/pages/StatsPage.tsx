import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  ExternalLink,
  RefreshCw,
  ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getStats } from '../api';
import type { Stats } from '../types';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [top, setTop] = useState(10);
  const [sortBy, setSortBy] = useState<'hour' | 'day' | 'all'>('all');

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getStats(top, sortBy);
      setStats(response.items);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ошибка загрузки статистики');
      }
    } finally {
      setIsLoading(false);
    }
  }, [top, sortBy]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const totalClicks = stats.reduce((sum, s) => sum + s.all_clicks, 0);
  const totalDayClicks = stats.reduce((sum, s) => sum + s.last_day_clicks, 0);
  const totalHourClicks = stats.reduce((sum, s) => sum + s.last_hour_clicks, 0);

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-500" />
            Статистика
          </h1>
          <p className="text-gray-600 mt-3">Обзор кликов по вашим ссылкам</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">За последний час</p>
                <p className="text-2xl font-bold text-gray-900">{totalHourClicks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">За последний день</p>
                <p className="text-2xl font-bold text-gray-900">{totalDayClicks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Всего кликов</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Топ ссылки
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Показать:</span>
                <select
                  value={top}
                  onChange={(e) => setTop(Number(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'hour' | 'day' | 'all')}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">По всем кликам</option>
                  <option value="day">По кликам за день</option>
                  <option value="hour">По кликам за час</option>
                </select>
              </div>
              <button
                onClick={() => loadStats()}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Обновить"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : stats.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Нет данных для отображения</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Короткая ссылка
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Оригинальный URL
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      За час
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      За день
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Всего
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.map((stat, index) => (
                    <tr key={stat.short_url} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={stat.short_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                        >
                          {stat.short_url.replace(/^https?:\/\//, '')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-xs truncate text-gray-600" title={stat.orig_url}>
                          {stat.orig_url}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stat.last_hour_clicks > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {stat.last_hour_clicks}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stat.last_day_clicks > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {stat.last_day_clicks}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stat.all_clicks > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {stat.all_clicks}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
