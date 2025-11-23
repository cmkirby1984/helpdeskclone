'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Plus,
  BookOpen,
  FileText,
  FolderOpen,
  Eye,
  ThumbsUp,
  ChevronRight,
  Star,
} from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Getting Started',
    description: 'Basic guides for new users',
    icon: '🚀',
    articleCount: 12,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    id: '2',
    name: 'Account & Billing',
    description: 'Manage your account and payments',
    icon: '💳',
    articleCount: 8,
    color: 'bg-green-500/10 text-green-600',
  },
  {
    id: '3',
    name: 'Technical Support',
    description: 'Troubleshooting and technical guides',
    icon: '🔧',
    articleCount: 24,
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    id: '4',
    name: 'API & Integrations',
    description: 'Developer documentation',
    icon: '🔌',
    articleCount: 15,
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    id: '5',
    name: 'Security',
    description: 'Security best practices',
    icon: '🔒',
    articleCount: 6,
    color: 'bg-red-500/10 text-red-600',
  },
  {
    id: '6',
    name: 'FAQs',
    description: 'Frequently asked questions',
    icon: '❓',
    articleCount: 18,
    color: 'bg-cyan-500/10 text-cyan-600',
  },
];

const popularArticles = [
  {
    id: '1',
    title: 'How to reset your password',
    category: 'Account & Billing',
    views: 2345,
    helpful: 98,
  },
  {
    id: '2',
    title: 'Getting started with the API',
    category: 'API & Integrations',
    views: 1876,
    helpful: 94,
  },
  {
    id: '3',
    title: 'Setting up two-factor authentication',
    category: 'Security',
    views: 1654,
    helpful: 97,
  },
  {
    id: '4',
    title: 'Troubleshooting common errors',
    category: 'Technical Support',
    views: 1432,
    helpful: 89,
  },
  {
    id: '5',
    title: 'Understanding your invoice',
    category: 'Account & Billing',
    views: 1298,
    helpful: 92,
  },
];

export default function KnowledgeBasePage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Knowledge Base" subtitle="Help articles and documentation" />
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Search and Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge base..."
                className="pl-9 h-10"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Article
            </Button>
          </div>

          {/* Categories Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {category.articleCount} articles
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Popular Articles
            </h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {popularArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {article.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {article.helpful}%
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">83</p>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-600">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12.4K</p>
                  <p className="text-sm text-muted-foreground">Monthly Views</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600">
                  <ThumbsUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-muted-foreground">Helpful Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
