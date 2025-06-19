import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GitCommit, Calendar, User, RefreshCw, Clock } from 'lucide-react';
import { fetchGitCommits, groupCommitsByDate, getCommitTypeInfo, GitCommit as GitCommitType } from '@/api/changelog';

const Changelog: React.FC = () => {
  const { t } = useTranslation();
  const [commits, setCommits] = useState<GitCommitType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载提交历史
  const loadCommits = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedCommits = await fetchGitCommits(20);
      setCommits(fetchedCommits);
    } catch (err) {
      setError(t('changelogError', 'Failed to load commit history'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommits();
  }, []);

  // 获取提交类型的标签
  const getTypeLabel = (type: GitCommitType['type']) => {
    switch (type) {
      case 'feat':
        return t('changelogTypeFeat', '新功能');
      case 'fix':
        return t('changelogTypeFix', '修复');
      case 'refactor':
        return t('changelogTypeRefactor', '重构');
      case 'docs':
        return t('changelogTypeDocs', '文档');
      case 'style':
        return t('changelogTypeStyle', '样式');
      case 'test':
        return t('changelogTypeTest', '测试');
      case 'chore':
        return t('changelogTypeChore', '杂项');
      default:
        return t('changelogTypeOther', '其他');
    }
  };

  // 按日期分组提交
  const groupedCommits = groupCommitsByDate(commits);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('changelogTitle', '更新日志')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('changelogDescription', '查看项目的最新更新和改进历史')}
          </p>
        </div>

        {/* 刷新按钮 */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={loadCommits} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? t('changelogLoading', '加载中...') : t('changelogRefresh', '刷新')}
          </Button>
        </div>

        {/* 错误信息 */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* 提交历史 */}
        <div className="space-y-8">
          {Object.entries(groupedCommits)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dateCommits]) => (
              <Card key={date} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    {new Date(date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dateCommits.map((commit, index) => {
                      const typeInfo = getCommitTypeInfo(commit.type);
                      const typeLabel = getTypeLabel(commit.type);
                      return (
                        <div key={commit.hash} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${typeInfo.color} mt-2`}></div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge 
                                className={`${typeInfo.color} text-white text-xs hover:opacity-80`}
                              >
                                {typeLabel}
                              </Badge>
                              {commit.scope && (
                                <Badge variant="outline" className="text-xs">
                                  {commit.scope}
                                </Badge>
                              )}
                              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                                {commit.hash}
                              </code>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <User className="h-3 w-3" />
                                <span>{commit.author}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{commit.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>

        {/* 空状态 */}
        {!loading && commits.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <GitCommit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('changelogEmpty', '暂无更新记录')}
              </h3>
              <p className="text-gray-500">
                {t('changelogEmptyDescription', '还没有找到任何提交记录')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Changelog;