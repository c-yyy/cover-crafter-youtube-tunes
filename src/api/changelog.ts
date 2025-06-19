// API functions for changelog functionality

export interface GitCommit {
  hash: string;
  date: string;
  author: string;
  message: string;
  type: 'feat' | 'fix' | 'refactor' | 'docs' | 'style' | 'test' | 'chore' | 'other';
  scope?: string;
}

// Parse commit message to extract type and scope
export const parseCommitMessage = (message: string): { type: GitCommit['type']; scope?: string; description: string } => {
  // Match conventional commits format: type(scope): description
  const conventionalMatch = message.match(/^(\w+)(\(([^)]+)\))?:\s*(.+)$/);
  
  if (conventionalMatch) {
    const [, type, , scope, description] = conventionalMatch;
    const commitType = ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'chore'].includes(type) 
      ? type as GitCommit['type'] 
      : 'other';
    return { type: commitType, scope, description };
  }
  
  // If not standard format, try to infer type from message content
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('feat') || message.includes('新增') || message.includes('添加')) {
    return { type: 'feat', description: message };
  }
  if (lowerMessage.includes('fix') || message.includes('修复') || message.includes('修正')) {
    return { type: 'fix', description: message };
  }
  if (lowerMessage.includes('refactor') || message.includes('重构')) {
    return { type: 'refactor', description: message };
  }
  if (lowerMessage.includes('docs') || message.includes('文档')) {
    return { type: 'docs', description: message };
  }
  if (lowerMessage.includes('style') || message.includes('样式')) {
    return { type: 'style', description: message };
  }
  if (lowerMessage.includes('test') || message.includes('测试')) {
    return { type: 'test', description: message };
  }
  if (lowerMessage.includes('chore') || message.includes('杂项')) {
    return { type: 'chore', description: message };
  }
  
  return { type: 'other', description: message };
};

// Mock git history data (in a real app, this would come from a backend API)
const mockGitHistory = [
  { hash: 'b1c2d3e', date: '2025-06-20', author: 'Developer', message: 'feat(ui): Add user reviews section with multi-language support and auto-carousel' },
  { hash: 'e8b8c02', date: '2025-06-15', author: 'Developer', message: 'refactor(index.html): Adjust layout' },
  { hash: '60092a6', date: '2025-06-05', author: 'Developer', message: 'fix: Fix website name spelling in download filename' },
  { hash: 'a81dc62', date: '2025-05-13', author: 'Developer', message: 'feat(i18n): Add support for Khmer, Sinhala, Bengali and Urdu languages' },
  { hash: '6939e27', date: '2025-05-12', author: 'Developer', message: 'feat: Add Google Analytics tracking code' },
  { hash: 'f4e941a', date: '2025-04-21', author: 'Developer', message: 'feat: Add and update sitemap configuration' },
  { hash: 'd0de568', date: '2025-03-10', author: 'Developer', message: 'feat(history): Add thumbnail preview for history items' },
  { hash: '3a345f4', date: '2025-02-09', author: 'Developer', message: 'feat(i18n): Add multi-language support and internationalization' },
  { hash: '0027049', date: '2025-02-08', author: 'Developer', message: 'feat: Create website for YouTube thumbnail download' },
  { hash: '5601f62', date: '2025-01-07', author: 'Developer', message: 'chore: Use tech stack vite_react_shadcn_ts' },
];

// Fetch git commits (mock implementation)
export const fetchGitCommits = async (limit: number = 20): Promise<GitCommit[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would make an HTTP request to your backend
  // which would execute `git log` commands and return the results
  
  const commits: GitCommit[] = mockGitHistory.slice(0, limit).map(commit => {
    const parsed = parseCommitMessage(commit.message);
    return {
      hash: commit.hash,
      date: commit.date,
      author: commit.author,
      message: parsed.description,
      type: parsed.type,
      scope: parsed.scope
    };
  });
  
  return commits;
};

// Group commits by date
export const groupCommitsByDate = (commits: GitCommit[]): Record<string, GitCommit[]> => {
  return commits.reduce((groups, commit) => {
    const date = commit.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(commit);
    return groups;
  }, {} as Record<string, GitCommit[]>);
};

// Get commit type styling information
export const getCommitTypeInfo = (type: GitCommit['type']) => {
  switch (type) {
    case 'feat':
      return { color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' };
    case 'fix':
      return { color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' };
    case 'refactor':
      return { color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' };
    case 'docs':
      return { color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' };
    case 'style':
      return { color: 'bg-pink-500', textColor: 'text-pink-700', bgColor: 'bg-pink-50' };
    case 'test':
      return { color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50' };
    case 'chore':
      return { color: 'bg-gray-500', textColor: 'text-gray-700', bgColor: 'bg-gray-50' };
    default:
      return { color: 'bg-gray-400', textColor: 'text-gray-600', bgColor: 'bg-gray-50' };
  }
};