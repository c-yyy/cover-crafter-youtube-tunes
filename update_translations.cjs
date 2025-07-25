const fs = require('fs');
const path = require('path');

const localesDir = './public/locales';
const languages = ['fr', 'ja', 'ko', 'bn', 'km', 'si', 'ur'];

const newKeys = {
  'caseStudiesPageTitle': 'Case Studies',
  'caseStudiesPageDescription': 'Explore successful YouTube thumbnail optimization case studies and learn from real-world examples',
  'caseStudiesTitle': 'Thumbnail Case Studies',
  'caseStudiesSubtitle': 'Success Stories & Best Practices',
  'caseStudiesDescription': 'Learn from real success stories of YouTube creators who significantly improved their click-through rates through strategic thumbnail optimization.',
  'caseStudiesFilterAll': 'All Categories',
  'caseStudiesFilterGaming': 'Gaming',
  'caseStudiesFilterEducation': 'Education',
  'caseStudiesFilterTech': 'Technology',
  'caseStudiesFilterLifestyle': 'Lifestyle',
  'caseStudiesFilterMusic': 'Music',
  'caseStudiesFilterEntertainment': 'Entertainment',
  'caseStudiesDifficultyBeginner': 'Beginner',
  'caseStudiesDifficultyIntermediate': 'Intermediate',
  'caseStudiesDifficultyAdvanced': 'Advanced',
  'caseStudiesChannelInfo': 'Channel Information',
  'caseStudiesChannelName': 'Channel Name',
  'caseStudiesSubscribers': 'Subscribers',
  'caseStudiesNiche': 'Content Niche',
  'caseStudiesMetrics': 'Performance Data',
  'caseStudiesBeforeCTR': 'Before CTR',
  'caseStudiesAfterCTR': 'After CTR',
  'caseStudiesImprovement': 'Improvement',
  'caseStudiesViewsGrowth': 'Views Growth',
  'caseStudiesEngagement': 'Engagement',
  'caseStudiesThumbnailComparison': 'Thumbnail Comparison',
  'caseStudiesBefore': 'Before',
  'caseStudiesAfter': 'After',
  'caseStudiesKeyChanges': 'Key Changes',
  'caseStudiesInsights': 'Key Insights',
  'caseStudiesToolsUsed': 'Tools Used',
  'caseStudiesTimeline': 'Timeline',
  'caseStudiesBackToList': 'Back to Case Studies',
  'tutorialsPageTitle': 'Tutorials',
  'tutorialsPageDescription': 'Comprehensive tutorials and guides for YouTube thumbnail extraction and optimization',
  'tutorialsTitle': 'Tutorials',
  'tutorialsSubtitle': 'Detailed Guides & Best Practices',
  'tutorialsDescription': 'Master the art of extraction and optimization with our comprehensive tutorials and step-by-step guides.',
  'tutorialsFilterAll': 'All Categories',
  'tutorialsFilterBasics': 'Basics',
  'tutorialsFilterAdvanced': 'Advanced',
  'tutorialsFilterDesign': 'Design',
  'tutorialsFilterOptimization': 'Optimization',
  'tutorialsDifficultyBeginner': 'Beginner',
  'tutorialsDifficultyIntermediate': 'Intermediate',
  'tutorialsDifficultyAdvanced': 'Advanced',
  'tutorialsReadTime': 'Read Time',
  'tutorialsSteps': 'Steps',
  'tutorialsOverview': 'Overview',
  'tutorialsWhatYouWillLearn': 'What You\'ll Learn',
  'tutorialsPrerequisites': 'Prerequisites',
  'tutorialsStepByStep': 'Step-by-Step Guide',
  'tutorialsTips': 'Pro Tips',
  'tutorialsConclusion': 'Conclusion',
  'tutorialsBackToList': 'Back to Tutorials',
  'faqPageTitle': 'FAQ',
  'faqPageDescription': 'Frequently asked questions about YouTube Thumbnail Size Guide & Downloader and optimization',
  'faqTitle': 'Frequently Asked Questions',
  'faqSubtitle': 'Find answers to common questions',
  'faqDescription': 'Get quick answers to the most commonly asked questions about our YouTube Thumbnail Size Guide & Downloader service.',
  'faqSearchPlaceholder': 'Search questions...',
  'faqPopularQuestions': 'Popular Questions',
  'faqAllCategories': 'All Categories',
  'faqCategoryGeneral': 'General',
  'faqCategoryTechnical': 'Technical',
  'faqCategoryUsage': 'Usage',
  'faqCategoryTroubleshooting': 'Troubleshooting',
  'faqNoResults': 'No questions found',
  'faqNoResultsDescription': 'Try adjusting your search terms or browse by category',
  'faqContactTitle': 'Still have questions?',
  'faqContactDescription': 'Can\'t find what you\'re looking for? Contact our support team.',
  'faqContactButton': 'Contact Support',
  'toolsPageTitle': 'Tools',
  'toolsPageDescription': 'Professional YouTube thumbnail creation and optimization tools',
  'toolsTitle': 'Design Tools',
  'toolsSubtitle': 'YouTube Thumbnail Creation Toolkit',
  'toolsDescription': 'Discover professional tools and resources to create stunning YouTube thumbnails that drive clicks and engagement.',
  'toolsFilterAll': 'All Tools',
  'toolsFilterFree': 'Free',
  'toolsFilterPaid': 'Paid',
  'toolsFilterOnline': 'Online',
  'toolsFilterDesktop': 'Desktop',
  'toolsFilterMobile': 'Mobile',
  'toolsPlatforms': 'Platforms',
  'toolsPricing': 'Pricing',
  'toolsFeatures': 'Key Features',
  'toolsVisitWebsite': 'Visit Website',
  'toolsLearnMore': 'Learn More',
  'resourcesPageTitle': 'Resources',
  'resourcesPageDescription': 'Curated resources for YouTube creators including tools, guides, and learning materials',
  'resourcesTitle': 'Creator Resources',
  'resourcesSubtitle': 'Professional Tools & Learning Resources',
  'resourcesDescription': 'Discover curated tools, guides, and resources to help you create better YouTube content and grow your channel.',
  'resourcesFilterAll': 'All Resources',
  'resourcesFilterTools': 'Tools',
  'resourcesFilterGuides': 'Guides',
  'resourcesFilterCourses': 'Courses',
  'resourcesFilterTemplates': 'Templates',
  'resourcesFilterCommunity': 'Community',
  'resourcesTypeTool': 'Tool',
  'resourcesTypeGuide': 'Guide',
  'resourcesTypeCourse': 'Course',
  'resourcesTypeTemplate': 'Template',
  'resourcesTypeCommunity': 'Community',
  'resourcesVisitResource': 'Visit Resource',
  'resourcesLearnMore': 'Learn More',
  'blogPageTitle': 'Blog',
  'blogPageDescription': 'Latest articles, tips, and insights for YouTube creators',
  'blogTitle': 'Blog Articles',
  'blogSubtitle': 'YouTube Creation Tips & Tutorials',
  'blogDescription': 'Stay updated with the latest YouTube creation tips, thumbnail design trends, and platform insights from our expert team.',
  'blogFilterAll': 'All Posts',
  'blogFilterTips': 'Tips',
  'blogFilterTutorials': 'Tutorials',
  'blogFilterNews': 'News',
  'blogFilterDesign': 'Design',
  'blogReadMore': 'Read More',
  'blogBackToBlog': 'Back to Blog',
  'blogReadTime': 'min read',
  'blogPublishedOn': 'Published on',
  'blogAuthor': 'Author',
  'newsPageTitle': 'News',
  'newsPageDescription': 'Latest YouTube platform updates and industry news',
  'newsTitle': 'Industry News',
  'newsSubtitle': 'Latest YouTube Updates & Trends',
  'newsDescription': 'Stay informed about the latest YouTube platform updates, algorithm changes, and industry trends that affect content creators.',
  'newsFilterAll': 'All News',
  'newsFilterUpdates': 'Platform Updates',
  'newsFilterAlgorithm': 'Algorithm',
  'newsFilterFeatures': 'New Features',
  'newsFilterTrends': 'Trends',
  'newsReadMore': 'Read More',
  'newsBackToNews': 'Back to News',
  'newsPublishedOn': 'Published on',
  'newsSource': 'Source',
  'helpPageTitle': 'Help',
  'helpPageDescription': 'Get help and support for using YouTube Thumbnail Size Guide & Downloader',
  'helpTitle': 'Help & Support',
  'helpSubtitle': 'Get the help you need',
  'helpDescription': 'Find answers to your questions and get support for using our YouTube Thumbnail Size Guide & Downloader service.',
  'helpGettingStarted': 'Getting Started',
  'helpTroubleshooting': 'Troubleshooting',
  'helpAdvancedFeatures': 'Advanced Features',
  'helpContactSupport': 'Contact Support',
  'creatorEconomyPageTitle': 'Creator Economy',
  'creatorEconomyPageDescription': 'Insights and analysis of the YouTube creator economy and monetization strategies',
  'creatorEconomyTitle': 'Creator Economy',
  'creatorEconomySubtitle': 'Monetization & Growth Insights',
  'creatorEconomyDescription': 'Explore the evolving landscape of the YouTube creator economy, monetization strategies, and growth opportunities for content creators.'
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    Object.assign(data, newKeys);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}/translation.json`);
  } catch (error) {
    console.error(`Error updating ${lang}:`, error.message);
  }
});

console.log('All language files updated successfully!');