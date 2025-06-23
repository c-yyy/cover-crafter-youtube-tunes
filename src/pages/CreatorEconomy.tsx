import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { 
  Youtube, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Star, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Lightbulb, 
  ExternalLink,
  Eye,
  Clock,
  AlertCircle,
  Info,
  BookOpen,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CreatorEconomy: React.FC = () => {
  const { lng = 'zh' } = useParams<{ lng: string }>();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('overview');

  // 创作者经济数据
  const economyData = [
    {
      id: 1,
      title: t('creatorEconomy.globalScale.title', '全球创作者经济规模'),
      value: '$1040亿',
      change: '+23.5%',
      trend: 'up',
      period: '2024年',
      description: t('creatorEconomy.globalScale.description', '全球创作者经济市场规模持续快速增长，预计2025年将突破1300亿美元'),
      insights: [
        '短视频内容贡献了60%的增长',
        '品牌合作收入增长最为显著',
        '新兴市场创作者数量激增'
      ],
      relatedMetrics: [
        { name: '活跃创作者', value: '5000', unit: '万+' },
        { name: '品牌合作', value: '78', unit: '%' },
        { name: '平均收入', value: '3.2', unit: '万' },
        { name: '增长率', value: '23.5', unit: '%' }
      ],
      source: 'Creator Economy Report 2024'
    },
    {
      id: 2,
      title: t('creatorEconomy.youtubeRevenue.title', 'YouTube创作者收入'),
      value: '$150亿',
      change: '+18.2%',
      trend: 'up',
      period: '2024年',
      description: t('creatorEconomy.youtubeRevenue.description', 'YouTube平台创作者总收入再创新高，广告分成和会员收入是主要来源'),
      insights: [
        'YouTube Shorts收入占比达到35%',
        '会员订阅收入增长42%',
        '超级感谢功能贡献显著'
      ],
      relatedMetrics: [
        { name: '顶级创作者', value: '1000', unit: '+' },
        { name: '平均RPM', value: '$2.8', unit: '' },
        { name: '订阅增长', value: '28', unit: '%' },
        { name: '观看时长', value: '10', unit: '亿小时' }
      ],
      source: 'YouTube Creator Report 2024'
    },
    {
      id: 3,
      title: '品牌营销投入',
      value: '$240亿',
      change: '+31.7%',
      trend: 'up',
      period: '2024年',
      description: '品牌在创作者营销上的投入大幅增加，影响者营销成为主流',
      insights: [
        '微型影响者合作增长最快',
        '长期合作关系更受青睐',
        'ROI平均提升45%'
      ],
      relatedMetrics: [
        { name: '合作品牌', value: '85', unit: '万+' },
        { name: '平均ROI', value: '5.2', unit: 'x' },
        { name: '合作时长', value: '8.5', unit: '月' },
        { name: '满意度', value: '92', unit: '%' }
      ],
      source: 'Influencer Marketing Hub 2024'
    },
    {
      id: 4,
      title: '直播电商规模',
      value: '$680亿',
      change: '+45.3%',
      trend: 'up',
      period: '2024年',
      description: '直播电商继续高速发展，成为创作者变现的重要渠道',
      insights: [
        '美妆和时尚类目表现最佳',
        '平均转化率达到12.8%',
        '移动端占比超过85%'
      ],
      relatedMetrics: [
        { name: '直播创作者', value: '280', unit: '万' },
        { name: '转化率', value: '12.8', unit: '%' },
        { name: '客单价', value: '156', unit: '元' },
        { name: '复购率', value: '68', unit: '%' }
      ],
      source: 'Live Commerce Analytics 2024'
    }
  ];

  // 市场趋势数据
  const marketTrends = [
    {
      id: 1,
      title: 'AI驱动的内容创作',
      description: '人工智能技术正在革命性地改变内容创作流程，从脚本生成到视频编辑，AI工具大幅提升创作效率。',
      impact: 'high',
      timeframe: '2024-2025',
      keyPoints: [
        'AI生成的缩略图点击率提升35%',
        '自动化剪辑工具节省70%制作时间',
        'AI推荐的标题获得更高曝光率'
      ],
      opportunities: [
        '降低内容制作门槛，吸引更多新创作者',
        '提升内容质量和一致性',
        '实现大规模个性化内容生产'
      ],
      challenges: [
        '原创性和真实性的平衡',
        '技术学习成本',
        '版权和伦理问题'
      ]
    },
    {
      id: 2,
      title: '短视频内容主导',
      description: '短视频格式继续主导内容消费，平台算法更加偏向短视频内容，创作者需要适应这一趋势。',
      impact: 'high',
      timeframe: '持续进行',
      keyPoints: [
        '短视频观看时长占总时长的78%',
        '15-60秒视频获得最高互动率',
        '垂直视频格式成为标准'
      ],
      opportunities: [
        '更快的内容迭代和测试',
        '更高的病毒传播潜力',
        '更低的制作成本'
      ],
      challenges: [
        '内容深度受限',
        '竞争更加激烈',
        '注意力碎片化'
      ]
    },
    {
      id: 3,
      title: '社区驱动的变现',
      description: '创作者越来越依赖忠实粉丝社区进行变现，会员制、打赏和社区商品成为重要收入来源。',
      impact: 'medium',
      timeframe: '2024-2026',
      keyPoints: [
        '会员收入增长率达到45%',
        '社区商品销售额翻倍',
        '粉丝忠诚度显著提升'
      ],
      opportunities: [
        '建立稳定的收入来源',
        '深化与粉丝的关系',
        '提高用户生命周期价值'
      ],
      challenges: [
        '社区管理复杂性增加',
        '内容质量期望提高',
        '竞争对手模仿'
      ]
    }
  ];

  // 收入模式数据
  const revenueStreams = [
    {
      id: 1,
      name: '广告分成',
      description: '通过平台广告分成获得收入，是最基础的变现方式',
      averageEarning: '$1-5/千次观看',
      difficulty: 'easy',
      popularity: 95,
      requirements: [
        '1000订阅者',
        '4000小时观看时长',
        '符合平台政策'
      ],
      pros: [
        '门槛相对较低',
        '被动收入',
        '与内容质量正相关'
      ],
      cons: [
        '收入不稳定',
        '依赖平台政策',
        '需要大量流量'
      ]
    },
    {
      id: 2,
      name: '品牌合作',
      description: '与品牌方合作推广产品或服务，获得合作费用',
      averageEarning: '$500-50000/次',
      difficulty: 'medium',
      popularity: 78,
      requirements: [
        '稳定的观众群体',
        '良好的互动率',
        '专业的内容质量'
      ],
      pros: [
        '收入较高',
        '建立行业关系',
        '提升个人品牌'
      ],
      cons: [
        '需要谈判技巧',
        '可能影响内容独立性',
        '合作周期不确定'
      ]
    },
    {
      id: 3,
      name: '会员订阅',
      description: '通过提供独家内容获得订阅费用',
      averageEarning: '$5-50/月/会员',
      difficulty: 'medium',
      popularity: 65,
      requirements: [
        '忠实粉丝基础',
        '独家内容能力',
        '持续更新承诺'
      ],
      pros: [
        '稳定的月收入',
        '深化粉丝关系',
        '内容自主权高'
      ],
      cons: [
        '需要持续产出',
        '会员流失风险',
        '内容压力大'
      ]
    },
    {
      id: 4,
      name: '商品销售',
      description: '销售自有品牌商品或推荐产品获得收入',
      averageEarning: '$10-100/件',
      difficulty: 'hard',
      popularity: 45,
      requirements: [
        '强大的个人品牌',
        '供应链管理能力',
        '营销推广技能'
      ],
      pros: [
        '利润率高',
        '品牌价值提升',
        '长期资产积累'
      ],
      cons: [
        '初期投入大',
        '库存风险',
        '客服压力'
      ]
    },
    {
      id: 5,
      name: '在线课程',
      description: '制作和销售在线教育课程',
      averageEarning: '$50-500/课程',
      difficulty: 'hard',
      popularity: 38,
      requirements: [
        '专业知识技能',
        '教学能力',
        '课程制作技术'
      ],
      pros: [
        '知识变现',
        '被动收入潜力',
        '建立专家地位'
      ],
      cons: [
        '制作周期长',
        '市场竞争激烈',
        '需要持续更新'
      ]
    },
    {
      id: 6,
      name: '直播打赏',
      description: '通过直播获得观众打赏和礼物',
      averageEarning: '$10-1000/场',
      difficulty: 'medium',
      popularity: 72,
      requirements: [
        '良好的互动能力',
        '稳定的直播时间',
        '有趣的直播内容'
      ],
      pros: [
        '即时收入',
        '强化粉丝关系',
        '内容形式灵活'
      ],
      cons: [
        '收入波动大',
        '时间投入高',
        '情绪压力大'
      ]
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: '市场概览', icon: BarChart3 },
    { id: 'trends', label: '趋势分析', icon: TrendingUp },
    { id: 'revenue', label: '收入模式', icon: DollarSign },
    { id: 'insights', label: '行业洞察', icon: Lightbulb }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <Header currentPage="creator-economy" />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800">
                {t('creatorEconomy.pageTitle', 'YouTube创作者经济分析')}
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('creatorEconomy.pageDescription', '深入了解YouTube创作者经济的最新数据、趋势分析和变现策略，为您的创作事业提供专业洞察和数据支持。')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      selectedTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">创作者经济市场概览</h2>
                  <p className="text-slate-600">最新的市场数据和关键指标分析</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {economyData.map((data) => (
                    <Card key={data.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-500">{data.period}</span>
                          <div className={`flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
                            {getTrendIcon(data.trend)}
                            <span className="text-sm font-medium">{data.change}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {data.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {data.value}
                          </div>
                          <p className="text-slate-600 text-sm">
                            {data.description}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2">关键洞察</h4>
                            <div className="space-y-1">
                              {data.insights.slice(0, 2).map((insight, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{insight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2">相关指标</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {data.relatedMetrics.slice(0, 4).map((metric, index) => (
                                <div key={index} className="text-center p-2 bg-slate-50 rounded">
                                  <div className="text-sm font-semibold text-slate-800">
                                    {metric.value}{metric.unit}
                                  </div>
                                  <div className="text-xs text-slate-600">{metric.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-xs text-slate-500 pt-2 border-t">
                            数据来源: {data.source}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Trends Analysis Tab */}
            {selectedTab === 'trends' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">市场趋势分析</h2>
                  <p className="text-slate-600">了解影响创作者经济的关键趋势和方法趋势</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  {marketTrends.map((trend) => (
                    <Card key={trend.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getImpactColor(trend.impact)
                          }`}>
                            {trend.impact === 'high' ? '高影响' : trend.impact === 'medium' ? '中等影响' : '低影响'}
                          </span>
                          <span className="text-sm text-slate-500">{trend.timeframe}</span>
                        </div>
                        <CardTitle className="text-xl text-slate-800">
                          {trend.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">
                          {trend.description}
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 flex items-center space-x-2">
                              <Info className="h-4 w-4" />
                              <span>关键要点</span>
                            </h4>
                            <div className="space-y-1">
                              {trend.keyPoints.map((point, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span>机遇</span>
                            </h4>
                            <div className="space-y-1">
                              {trend.opportunities.slice(0, 2).map((opportunity, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{opportunity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-orange-600" />
                              <span>挑战</span>
                            </h4>
                            <div className="space-y-1">
                              {trend.challenges.slice(0, 2).map((challenge, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{challenge}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Revenue Models Tab */}
            {selectedTab === 'revenue' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">创作者收入模式</h2>
                  <p className="text-slate-600">了解不同的变现方式和收入潜力</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {revenueStreams.map((stream) => (
                    <Card key={stream.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getDifficultyColor(stream.difficulty)
                          }`}>
                            {stream.difficulty === 'easy' ? '简单' : stream.difficulty === 'medium' ? '中等' : '困难'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-slate-600">{stream.popularity}%</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-slate-800">
                          {stream.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4">
                          {stream.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="text-lg font-bold text-green-600 mb-1">
                            {stream.averageEarning}
                          </div>
                          <div className="text-xs text-slate-500">平均收入</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2">要求条件</h4>
                            <div className="space-y-1">
                              {stream.requirements.slice(0, 3).map((req, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                                  <span className="text-xs text-slate-600">{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1 text-sm">优势</h4>
                              <div className="space-y-1">
                                {stream.pros.slice(0, 2).map((pro, index) => (
                                  <div key={index} className="flex items-start space-x-1">
                                    <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-slate-600">{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-1 text-sm">劣势</h4>
                              <div className="space-y-1">
                                {stream.cons.slice(0, 2).map((con, index) => (
                                  <div key={index} className="flex items-start space-x-1">
                                    <AlertCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-slate-600">{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Insights Tab */}
            {selectedTab === 'insights' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">行业洞察与建议</h2>
                  <p className="text-slate-600">基于数据分析的专业建议和未来展望</p>
                </div>
                
                {/* Key Insights */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-blue-800">
                        <Lightbulb className="h-5 w-5" />
                        <span>创作者成功要素</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">内容质量至上</h4>
                            <p className="text-sm text-slate-600">高质量、有价值的内容是长期成功的基础</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">多元化收入策略</h4>
                            <p className="text-sm text-slate-600">不依赖单一收入来源，建立多样化的变现模式</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">社区建设</h4>
                            <p className="text-sm text-slate-600">与观众建立深度连接，培养忠实的粉丝社区</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">数据驱动决策</h4>
                            <p className="text-sm text-slate-600">利用分析数据优化内容策略和运营决策</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-green-800">
                        <TrendingUp className="h-5 w-5" />
                        <span>未来发展趋势</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">AI技术融合</h4>
                            <p className="text-sm text-slate-600">AI将深度参与内容创作和优化过程</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">短视频持续增长</h4>
                            <p className="text-sm text-slate-600">短视频格式将继续主导内容消费</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">全球化机遇</h4>
                            <p className="text-sm text-slate-600">跨文化内容和全球市场将带来新机遇</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-800">专业化发展</h4>
                            <p className="text-sm text-slate-600">创作者经济将更加专业化和规范化</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Action Recommendations */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-purple-800">
                      <Target className="h-5 w-5" />
                      <span>行动建议</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">新手创作者</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">专注内容质量和一致性</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">学习基础的SEO和缩略图优化</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">建立发布时间表</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">成长期创作者</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">探索多元化收入来源</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">建立品牌合作关系</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">投资专业设备和工具</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">成熟创作者</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">考虑团队化运营</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">开发自有产品和服务</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">拓展到其他平台</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <div className="text-center">
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                <CardContent className="py-12">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      开始您的创作者之旅
                    </h2>
                  </div>
                  <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    利用我们的工具和洞察，优化您的内容策略，在竞争激烈的创作者经济中脱颖而出。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/${lng}`}>
                      <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3">
                        <Play className="h-5 w-5 mr-2" />
                        开始优化缩略图
                      </Button>
                    </Link>
                    <Link to={`/${lng}/case-studies`}>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3">
                        <BookOpen className="h-5 w-5 mr-2" />
                        查看成功案例
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreatorEconomy;