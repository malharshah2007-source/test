import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Match, User } from "@shared/schema";

// Mock current user ID - in real app this would come from auth
const CURRENT_USER_ID = "mock-user-id";

export default function Matches() {
  const { data: matches = [], isLoading: matchesLoading } = useQuery<Match[]>({
    queryKey: ['/api/users', CURRENT_USER_ID, 'matches'],
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  if (matchesLoading || usersLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const pendingMatches = matches.filter(match => match.status === 'pending');
  const acceptedMatches = matches.filter(match => match.status === 'accepted');

  const getMatchedUser = (match: Match) => {
    const otherUserId = match.userId1 === CURRENT_USER_ID ? match.userId2 : match.userId1;
    return users.find(user => user.id === otherUserId);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Your Matches</h1>
      
      {/* Pending Matches */}
      {pendingMatches.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Pending Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingMatches.map((match) => {
              const user = getMatchedUser(match);
              if (!user) return null;

              return (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video">
                    <img
                      src={user.profilePhoto}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-charcoal">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.location}</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.workoutTypes.slice(0, 2).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-gray-600 hover:bg-gray-100"
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange to-red-500 hover:shadow-lg"
                      >
                        Accept
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Accepted Matches */}
      <section>
        <h2 className="text-2xl font-bold text-charcoal mb-6">Your Workout Partners</h2>
        {acceptedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedMatches.map((match) => {
              const user = getMatchedUser(match);
              if (!user) return null;

              return (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video">
                    <img
                      src={user.profilePhoto}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-charcoal">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.location}</p>
                      </div>
                      <Badge className="bg-energetic-green text-white">
                        {user.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.workoutTypes.slice(0, 2).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button
                      className="w-full bg-vibrant-blue hover:bg-vibrant-blue/90"
                    >
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No matches yet</h3>
              <p className="text-gray-500">Start swiping to find your perfect workout partner!</p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
