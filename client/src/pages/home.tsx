import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Users, Handshake, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserCard from "@/components/user-card";
import MatchingInterface from "@/components/matching-interface";
import { User } from "@shared/schema";

export default function Home() {
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const stats = {
    activeUsers: users.length,
    matches: Math.floor(users.length * 0.7),
    workouts: Math.floor(users.length * 125)
  };

  const featuredUsers = users.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Find Your Perfect{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-vibrant-blue">
            Workout Partner
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with fitness enthusiasts in your area, share your goals, and motivate each other to reach new heights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/discover">
            <Button size="lg" className="bg-gradient-to-r from-orange to-red-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg px-8 py-3 rounded-full">
              Start Finding Partners
            </Button>
          </Link>
          <Link href="/discover">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-vibrant-blue text-vibrant-blue hover:bg-vibrant-blue hover:text-white transition-all duration-200 text-lg px-8 py-3 rounded-full"
            >
              Browse Profiles
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center border-gray-100">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-orange text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">{stats.activeUsers.toLocaleString()}</h3>
            <p className="text-gray-600">Active Members</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-gray-100">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-vibrant-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-vibrant-blue text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">{stats.matches.toLocaleString()}</h3>
            <p className="text-gray-600">Successful Matches</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-gray-100">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-energetic-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Flame className="text-energetic-green text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">{stats.workouts.toLocaleString()}</h3>
            <p className="text-gray-600">Workouts Together</p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Users */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-charcoal">Discover Workout Partners</h2>
          <Link href="/discover">
            <Button variant="outline" className="text-orange border-orange hover:bg-orange hover:text-white">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      {/* Quick Match */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Quick Match</h2>
        <MatchingInterface />
      </section>
    </main>
  );
}
