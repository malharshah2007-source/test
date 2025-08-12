import { Link, useLocation } from "wouter";
import { Bell, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", id: "home" },
    { href: "/discover", label: "Discover", id: "discover" },
    { href: "/matches", label: "Matches", id: "matches" },
    { href: "/messages", label: "Messages", id: "messages" },
    { href: "/profile", label: "Profile", id: "profile" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-orange to-vibrant-blue rounded-lg flex items-center justify-center">
                  <Dumbbell className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-charcoal">FitBuddy</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <a className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-orange'
                      : 'text-charcoal hover:text-orange'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600 hover:text-orange" />
                <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-orange text-[10px]"></Badge>
              </Button>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                alt="User profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <a className={`flex flex-col items-center py-2 transition-colors ${
                isActive(item.href)
                  ? 'text-orange'
                  : 'text-gray-600'
              }`}>
                <div className="text-xl mb-1">
                  {item.id === 'home' && '🏠'}
                  {item.id === 'discover' && '🔍'}
                  {item.id === 'matches' && '❤️'}
                  {item.id === 'messages' && '💬'}
                  {item.id === 'profile' && '👤'}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
