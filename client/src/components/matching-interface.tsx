import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { X, Heart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";

const CURRENT_USER_ID = "mock-user-id";

export default function MatchingInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  const createMatchMutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      return apiRequest("POST", "/api/matches", {
        userId1: CURRENT_USER_ID,
        userId2: targetUserId,
        status: "pending",
      });
    },
    onSuccess: () => {
      toast({
        title: "Connection request sent! 💪",
        description: "You'll be notified if they're interested too!",
      });
      nextUser();
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      });
    },
  });

  const nextUser = () => {
    setCurrentIndex((prev) => (prev + 1) % users.length);
  };

  const handleSwipeLeft = () => {
    toast({
      title: "User passed",
      description: "We'll find you someone better suited!",
    });
    nextUser();
  };

  const handleSwipeRight = () => {
    if (currentUser) {
      createMatchMutation.mutate(currentUser.id);
    }
  };

  const handleSuperLike = () => {
    if (currentUser) {
      toast({
        title: "Super Like sent! ⭐",
        description: "This shows you're really interested!",
      });
      createMatchMutation.mutate(currentUser.id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading potential matches...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-12">No users available for matching.</div>;
  }

  const currentUser = users[currentIndex];
  if (!currentUser) return null;

  const getWorkoutTypeColor = (type: string) => {
    const colors = {
      "Strength Training": "bg-orange/10 text-orange",
      "Cardio": "bg-vibrant-blue/10 text-vibrant-blue",
      "Yoga": "bg-deep-purple/10 text-deep-purple",
      "Running": "bg-vibrant-blue/10 text-vibrant-blue",
      "CrossFit": "bg-orange/10 text-orange",
      "HIIT": "bg-vibrant-blue/10 text-vibrant-blue",
      "Pilates": "bg-deep-purple/10 text-deep-purple",
      "Weight Training": "bg-orange/10 text-orange",
      "Endurance": "bg-vibrant-blue/10 text-vibrant-blue",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="relative">
            <img
              src={currentUser.profilePhoto}
              alt={`${currentUser.name}'s profile`}
              className="w-full h-96 object-cover"
            />
            
            <div className="absolute top-4 right-4">
              <Badge className={currentUser.isOnline ? 'bg-energetic-green text-white' : 'bg-gray-400 text-white'}>
                {currentUser.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-charcoal">{currentUser.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{currentUser.location}</span>
                <span className="mx-2">•</span>
                <span>{currentUser.age} years old</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{currentUser.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {currentUser.workoutTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className={`text-sm px-3 py-2 font-medium ${getWorkoutTypeColor(type)}`}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mt-8">
          <Button
            onClick={handleSwipeLeft}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-4 border-gray-300 hover:border-red-400 hover:text-red-400 transition-all transform hover:scale-110 shadow-lg"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleSuperLike}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-4 border-vibrant-blue text-vibrant-blue hover:bg-vibrant-blue hover:text-white transition-all transform hover:scale-110 shadow-lg"
          >
            <Star className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleSwipeRight}
            size="lg"
            variant="outline"
            disabled={createMatchMutation.isPending}
            className="w-16 h-16 rounded-full border-4 border-energetic-green text-energetic-green hover:bg-energetic-green hover:text-white transition-all transform hover:scale-110 shadow-lg"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
