'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, TrendingUp, TrendingDown, Users, BarChart3, PieChart, Calendar } from 'lucide-react';

const metrics = [
  { title: 'Total Tickets', value: '1,234', change: '+12%', trend: 'up', description: 'vs last month' },
  { title: 'Avg. Resolution Time', value: '4.2h', change: '-18%', trend: 'down', description: 'vs last month' },
  { title: 'First Response Time', value: '24m', change: '-8%', trend: 'down', description: 'vs last month' },
  { title: 'Customer Satisfaction', value: '94%', change: '+3%', trend: 'up', description: 'vs last month' },
];

const ticketsByStatus = [
  { status: 'Open', count: 42, percentage: 27, color: 'bg-blue-500' },
  { status: 'Pending', count: 28, percentage: 18, color: 'bg-amber-500' },
  { status: 'Resolved', count: 67, percentage: 43, color: 'bg-green-500' },
  { status: 'Closed', count: 19, percentage: 12, color: 'bg-gray-500' },
];

const topAgents = [
  { name: 'Sarah Johnson', tickets: 156, satisfaction: '98%', avgTime: '3.2h' },
  { name: 'Alex Chen', tickets: 142, satisfaction: '96%', avgTime: '3.8h' },
  { name: 'Jordan Lee', tickets: 128, satisfaction: '94%', avgTime: '4.1h' },
  { name: 'Emma Wilson', tickets: 115, satisfaction: '95%', avgTime: '3.9h' },
  { name: 'Marcus Brown', tickets: 98, satisfaction: '92%', avgTime: '4.5h' },
];

export default function ReportsPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Reports" subtitle="Analytics and performance insights" />
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select defaultValue="30d">
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    {metric.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className="ml-2 text-sm text-green-600">{metric.change}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Tickets by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketsByStatus.map((item) => (
                    <div key={item.status} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className={`h-3 w-3 rounded-full ${item.color}`} />
                          {item.status}
                        </span>
                        <span className="font-medium">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Ticket Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-around gap-2">
                  {[65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 70].map((height, i) => (
                    <div key={i} className="bg-primary/80 rounded-t w-full max-w-8 hover:bg-primary" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Top Performing Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <div key={agent.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">{index + 1}</div>
                    <div className="flex-1"><p className="font-medium">{agent.name}</p></div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center"><p className="font-semibold">{agent.tickets}</p><p className="text-xs text-muted-foreground">Tickets</p></div>
                      <div className="text-center"><p className="font-semibold text-green-600">{agent.satisfaction}</p><p className="text-xs text-muted-foreground">CSAT</p></div>
                      <div className="text-center"><p className="font-semibold">{agent.avgTime}</p><p className="text-xs text-muted-foreground">Avg Time</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
