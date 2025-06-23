#!/bin/bash

# 批量更新页面文件，统一使用 Header 组件

echo "开始批量更新页面头部导航..."

# 定义需要更新的页面文件列表
files=(
  "src/pages/Tools.tsx"
  "src/pages/News.tsx"
  "src/pages/Privacy.tsx"
  "src/pages/CaseStudies.tsx"
  "src/pages/Help.tsx"
  "src/pages/Terms.tsx"
  "src/pages/Tutorials.tsx"
  "src/pages/CreatorEconomy.tsx"
  "src/pages/Resources.tsx"
)

# 为每个文件添加 Header 组件导入（如果还没有的话）
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "处理文件: $file"
    
    # 检查是否已经导入了 Header 组件
    if ! grep -q "import.*Header" "$file"; then
      echo "  - 添加 Header 组件导入"
      # 在导入部分添加 Header 组件导入
      sed -i '' '/from.*lucide-react/a\
import { Header } from '\'../components/Header\'';' "$file"
    fi
    
    echo "  - 完成处理 $file"
  else
    echo "警告: 文件 $file 不存在"
  fi
done

echo "批量更新完成！"
echo "请手动替换各文件中的 header 标签为 <Header currentPage=\"页面名\" />"