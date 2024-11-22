import { Bell, Heart, Eye, UserPlus, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-10">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Quick Access Features */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Heart className="h-5 w-5" />
                  <span>Matches</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Bell className="h-5 w-5" />
                  <span>Messages</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <UserPlus className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Eye className="h-5 w-5" />
                  <span>Explore</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Activity Feed</h2>
              <div className="space-y-4">
                <ActivityItem
                  icon={<Heart className="h-4 w-4 text-red-500" />}
                  text="Sarah liked your profile"
                  time="2m ago"
                />
                <ActivityItem
                  icon={<Eye className="h-4 w-4 text-blue-500" />}
                  text="John viewed your profile"
                  time="5m ago"
                />
                <ActivityItem
                  icon={<UserPlus className="h-4 w-4 text-green-500" />}
                  text="You have a new match with Emma!"
                  time="10m ago"
                />
                <ActivityItem
                  icon={<Bell className="h-4 w-4 text-purple-500" />}
                  text="New message from Michael"
                  time="15m ago"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Placement */}
            <Card className="p-4 sm:p-6">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center text-muted-foreground">
                Advertisement
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ icon, text, time }: { icon: React.ReactNode; text: string; time: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
