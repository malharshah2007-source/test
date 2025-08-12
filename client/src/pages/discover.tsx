import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/user-card";
import { User } from "@shared/schema";

export default function Discover() {
  const [filter, setFilter] = useState<'all' | 'nearby' | 'online'>('all');
  
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const filteredUsers = users.filter(user => {
    if (filter === 'online') return user.isOnline;
    if (filter === 'nearby') return true; // All users are considered nearby in mock data
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Discover Workout Partners</h1>
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-orange text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          >
            All
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('nearby')}
            className={filter === 'nearby' ? 'bg-orange text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          >
            Nearby
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('online')}
            className={filter === 'online' ? 'bg-orange text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          >
            Online
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found matching your criteria.</p>
        </div>
      )}
    </main>
  );
}
