import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Link2,
  ExternalLink,
  BarChart3,
  Copy,
  Power,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createLink, getLinks, deactivateLink, getLinkStats } from '../api';
import type { Link as LinkType, Stats } from '../types';
import { useAuth } from '../context/AuthContext';

const WRAPPER_CLASSES = "py-10 px-6 sm:px-8 lg:px-12 bg-gray-50 min-h-[calc(100vh-64px)]";

const DashboardPage: React.FC = () => {
  const { username } = useAuth();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [expireSeconds, setExpireSeconds] = useState(86400);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filters
  const [filterActive, setFilterActive] = useState<boolean | undefined>(undefined);
  const [filterValid, setFilterValid] = useState<boolean | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Stats modal
  const [selectedLinkStats, setSelectedLinkStats] = useState<Stats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const loadLinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getLinks(page, pageSize, filterValid, filterActive);
      setLinks(response.items);
      setTotalPages(response.total_pages);
      setTotalItems(response.total_items);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ошибка загрузки ссылок');
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, filterValid, filterActive]);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUrl.trim()) {
      toast.error('Пожалуйста, введите URL');
      return;
    }

    // Validate URL
    try {
      new URL(newUrl);
    } catch {
      toast.error('Пожалуйста, введите корректный URL');
      return;
    }

    setIsCreating(true);
    try {
      await createLink({ orig_url: newUrl, expire_seconds: expireSeconds });
      toast.success('Ссылка успешно создана!');
      setNewUrl('');
      setPage(1);
      loadLinks();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ошибка создания ссылки');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeactivate = async (shortId: string) => {
    try {
      await deactivateLink(shortId);
      toast.success('Ссылка деактивирована');
      loadLinks();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ошибка деактивации ссылки');
      }
    }
  };

  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Ссылка скопирована!');
  };

  const handleViewStats = async (shortId: string) => {
    setIsLoadingStats(true);
    try {
      const stats = await getLinkStats(shortId);
      setSelectedLinkStats(stats);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ошибка загрузки статистики');
      }
    } finally {
      setIsLoadingStats(false);
    }
  };

  const closeStatsModal = () => {
    setSelectedLinkStats(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expireAt: string) => {
    return new Date(expireAt) <= new Date();
  };

  const resetFilters = () => {
    setFilterActive(undefined);
    setFilterValid(undefined);
    setPage(1);
  };

  const expireOptions = [
    { value: 3600, label: '1 час' },
    { value: 86400, label: '1 день' },
    { value: 604800, label: '1 неделя' },
    { value: 2592000, label: '30 дней' },
    { value: 31536000, label: '1 год' },
  ];

  return (
    <div className={WRAPPER_CLASSES}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Добро пожаловать, <span className="text-indigo-600">{username}</span>!
          </h1>
          <p className="text-gray-600 mt-3">Управляйте своими ссылками и отслеживайте статистику</p>
        </div>

        {/* Create Link Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Plus className="w-6 h-6 text-indigo-500" />
            Создать короткую ссылку
          </h2>
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Вставьте длинную ссылку здесь..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  disabled={isCreating}
                />
              </div>
              <div className="md:w-48">
                <select
                  value={expireSeconds}
                  onChange={(e) => setExpireSeconds(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  disabled={isCreating}
                >
                  {expireOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isCreating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    Создать
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Links List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-indigo-500" />
              Ваши ссылки
              <span className="text-sm font-normal text-gray-500">({totalItems})</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadLinks()}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Обновить"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters || filterActive !== undefined || filterValid !== undefined
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                Фильтры
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Статус:</span>
                  <select
                    value={filterActive === undefined ? '' : filterActive.toString()}
                    onChange={(e) => {
                      setFilterActive(e.target.value === '' ? undefined : e.target.value === 'true');
                      setPage(1);
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Все</option>
                    <option value="true">Активные</option>
                    <option value="false">Неактивные</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Действие:</span>
                  <select
                    value={filterValid === undefined ? '' : filterValid.toString()}
                    onChange={(e) => {
                      setFilterValid(e.target.value === '' ? undefined : e.target.value === 'true');
                      setPage(1);
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Все</option>
                    <option value="true">Действующие</option>
                    <option value="false">Истёкшие</option>
                  </select>
                </div>
                {(filterActive !== undefined || filterValid !== undefined) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Сбросить
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Links Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : links.length === 0 ? (
              <div className="text-center py-12">
                <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">У вас пока нет ссылок</p>
                <p className="text-sm text-gray-400 mt-1">Создайте первую ссылку выше</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Короткая ссылка
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Оригинальный URL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Создана
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Истекает
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {links.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={link.short_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                          >
                            {link.short_url.replace(/^https?:\/\//, '')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-xs truncate text-gray-600" title={link.orig_url}>
                          {link.orig_url}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(link.created_at)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(link.expire_at)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {!link.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            Неактивна
                          </span>
                        ) : isExpired(link.expire_at) ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Истекла
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Активна
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleCopyLink(link.short_url)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Копировать"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleViewStats(link.short_id)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Статистика"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          {link.is_active && (
                            <button
                              onClick={() => handleDeactivate(link.short_id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Деактивировать"
                            >
                              <Power className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Страница {page} из {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Modal */}
      {(selectedLinkStats || isLoadingStats) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={closeStatsModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isLoadingStats ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : selectedLinkStats && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Статистика ссылки
                </h3>
                <p className="text-sm text-gray-500 mb-6 truncate" title={selectedLinkStats.short_url}>
                  {selectedLinkStats.short_url}
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Оригинальный URL</p>
                    <a
                      href={selectedLinkStats.orig_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 break-all flex items-center gap-1"
                    >
                      {selectedLinkStats.orig_url}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-indigo-600">
                        {selectedLinkStats.last_hour_clicks}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">За час</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">
                        {selectedLinkStats.last_day_clicks}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">За день</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-green-600">
                        {selectedLinkStats.all_clicks}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Всего</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeStatsModal}
                  className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Закрыть
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
