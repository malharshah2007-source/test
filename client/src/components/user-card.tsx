import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";

interface UserCardProps {
  user: User;
  currentUserId?: string;
}

// Mock current user ID
const CURRENT_USER_ID = "mock-user-id";

export default function UserCard({ user, currentUserId = CURRENT_USER_ID }: UserCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMatchMutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      return apiRequest("POST", "/api/matches", {
        userId1: currentUserId,
        userId2: targetUserId,
        status: "pending",
      });
    },
    onSuccess: () => {
      toast({
        title: "Connection request sent! 💪",
        description: "You'll be notified if they're interested too!",
      });
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

  const handleConnect = () => {
    createMatchMutation.mutate(user.id);
  };

  const handlePass = () => {
    toast({
      title: "User passed",
      description: "We'll find you someone better suited!",
    });
  };

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

  const getPreferredTimeColor = (time: string) => {
    const colors = {
      "Morning": "bg-energetic-green/10 text-energetic-green",
      "Evening": "bg-orange/10 text-orange",
      "Any Time": "bg-deep-purple/10 text-deep-purple",
    };
    return colors[time as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={user.profilePhoto}
          alt={`${user.name}'s profile`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={user.isOnline ? 'bg-energetic-green text-white' : 'bg-gray-400 text-white'}>
            {user.isOnline ? 'Online' : `${Math.floor(Math.random() * 60)}m ago`}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-charcoal">{user.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {user.workoutTypes.slice(0, 2).map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className={`text-xs px-3 py-1 font-medium ${getWorkoutTypeColor(type)}`}
            >
              {type}
            </Badge>
          ))}
          <Badge
            variant="secondary"
            className={`text-xs px-3 py-1 font-medium ${getPreferredTimeColor(user.preferredTime)}`}
          >
            {user.preferredTime}
          </Badge>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={handlePass}
            variant="outline"
            className="flex-1 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Pass
          </Button>
          <Button
            onClick={handleConnect}
            disabled={createMatchMutation.isPending}
            className="flex-1 bg-gradient-to-r from-orange to-red-500 text-white hover:shadow-lg transition-all"
          >
            <Heart className="w-4 h-4 mr-2" />
            {createMatchMutation.isPending ? "Connecting..." : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
