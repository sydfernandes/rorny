import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
                <NavigationMenuTrigger>Why Rorny</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="font-medium">Our Mission</div>
                    <div className="text-sm text-muted-foreground">
                      Creating a safe and inclusive space for meaningful connections in the LGBTQA+ community
                    </div>
                    <div className="font-medium mt-4">Community Guidelines</div>
                    <div className="text-sm text-muted-foreground">
                      Learn about our commitment to safety and respect
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Safety</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="font-medium">Privacy First</div>
                    <div className="text-sm text-muted-foreground">
                      Your privacy and safety are our top priorities
                    </div>
                    <div className="font-medium mt-4">Support</div>
                    <div className="text-sm text-muted-foreground">
                      24/7 support for our community members
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Love Has No Labels
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome to Rorny, where the LGBTQA+ community finds meaningful connections in a safe, 
            inclusive, and respectful environment. Be yourself, be proud, be loved.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
