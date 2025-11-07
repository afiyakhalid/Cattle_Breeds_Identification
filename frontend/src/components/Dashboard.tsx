import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Camera, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

const scansData = [
  { month: 'Jul', scans: 12 },
  { month: 'Aug', scans: 19 },
  { month: 'Sep', scans: 15 },
  { month: 'Oct', scans: 25 },
  { month: 'Nov', scans: 18 },
];

const breedData = [
  { name: 'Holstein', value: 35, color: '#224B0C' },
  { name: 'Angus', value: 25, color: '#3A6B1F' },
  { name: 'Hereford', value: 20, color: '#5A8A32' },
  { name: 'Jersey', value: 12, color: '#B75D0B' },
  { name: 'Other', value: 8, color: '#D4743F' },
];

export function Dashboard({ onNavigate, userName }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-foreground mb-3 text-4xl" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
          Welcome back, {userName}!
        </h1>
        <p className="text-muted-foreground text-lg">Here's your farm management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Scans</CardTitle>
            <Camera className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-3xl">89</div>
            <p className="text-xs text-muted-foreground mt-2">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Breeds Identified</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-3xl">14</div>
            <p className="text-xs text-muted-foreground mt-2">
              Unique breeds
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg. Confidence</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-3xl">94.2%</div>
            <p className="text-xs text-muted-foreground mt-2">
              High accuracy
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">This Month</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-3xl">18</div>
            <p className="text-xs text-muted-foreground mt-2">
              Scans in November
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your next task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => onNavigate('recognize')} 
              className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground h-12"
            >
              <Camera className="mr-2 h-5 w-5" />
              Recognize a New Breed
            </Button>
            <Button 
              onClick={() => onNavigate('breeds')} 
              variant="outline" 
              className="w-full justify-start border-2 border-primary text-primary hover:bg-primary/5 h-12"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Breed Library
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader>
            <CardTitle>Common Breeds in Your Area</CardTitle>
            <CardDescription>Based on your scan history</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={breedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {breedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    color: 'var(--foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {breedData.slice(0, 3).map((breed, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: breed.color }}></div>
                    <span className="text-foreground">{breed.name}</span>
                  </div>
                  <span className="text-muted-foreground">{breed.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-primary/20 hover:border-primary/40 transition-all">
          <CardHeader>
            <CardTitle>Scan Activity</CardTitle>
            <CardDescription>Your monthly scanning trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scansData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    color: 'var(--foreground)'
                  }}
                />
                <Bar dataKey="scans" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
