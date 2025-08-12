import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, Clock } from "lucide-react";

// Mock current user data - in real app this would come from auth
const currentUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  age: "26",
  bio: "Looking for a workout buddy to push each other to the limit! Love strength training and cardio.",
  location: "San Francisco, CA",
  profilePhoto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  workoutTypes: ["Strength Training", "Cardio", "HIIT"],
  preferredTime: "Morning",
  isOnline: true,
};

export default function Profile() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-charcoal">My Profile</h1>
        <Button className="bg-orange hover:bg-orange/90">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image and Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <img
                src={currentUser.profilePhoto}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-charcoal mb-1">{currentUser.name}</h2>
              <p className="text-gray-600 mb-2">{currentUser.age} years old</p>
              
              <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {currentUser.location}
              </div>
              
              <Badge className={`${currentUser.isOnline ? 'bg-energetic-green' : 'bg-gray-400'} text-white`}>
                {currentUser.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </CardContent>
          </Card>

          {/* Workout Preferences */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Workout Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Workout Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.workoutTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-sm">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Preferred Time</h4>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {currentUser.preferredTime}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">
                {currentUser.bio}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-charcoal mb-3">Fitness Goals</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Build muscle mass</li>
                    <li>• Improve cardiovascular health</li>
                    <li>• Train for upcoming marathon</li>
                    <li>• Stay consistent with workouts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-charcoal mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Strength Training</span>
                      <Badge variant="outline">Advanced</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cardio</span>
                      <Badge variant="outline">Intermediate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yoga</span>
                      <Badge variant="outline">Beginner</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange mb-1">24</div>
                <div className="text-sm text-gray-600">Matches</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-vibrant-blue mb-1">156</div>
                <div className="text-sm text-gray-600">Workouts</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-energetic-green mb-1">89</div>
                <div className="text-sm text-gray-600">Days Active</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
