import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Transparent Navigation Bar */}
      <div className="fixed top-0 w-full backdrop-blur-md bg-background/50 border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">Rorny</div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="font-medium">Discover</div>
                    <div className="text-sm text-muted-foreground">
                      Explore our powerful features
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-muted-foreground">
                      Learn how to get started
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Your Gateway to Amazing Experiences
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover a new way to connect, share, and grow with our platform
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
