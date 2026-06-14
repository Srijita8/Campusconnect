import { useState } from "react";
import { Heart, X, MapPin, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StudentProfile {
  id: number;
  name: string;
  major: string;
  year: string;
  bio: string;
  interests: string[];
  imageUrl: string;
  matchScore: number;
}

const mockProfiles: StudentProfile[] = [
  {
    id: 1,
    name: "Alex Chen",
    major: "Computer Science",
    year: "Sophomore",
    bio: "Love coding, gaming, and hiking. Looking for people to explore the outdoors with!",
    interests: ["Gaming", "Hiking", "Programming", "Photography", "Music"],
    imageUrl: "https://images.unsplash.com/photo-1611181355758-089959e2cfb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc4MTQ1MzAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 92,
  },
  {
    id: 2,
    name: "Maya Patel",
    major: "Biology",
    year: "Junior",
    bio: "Pre-med student who loves yoga, cooking, and volunteering. Always up for coffee chats!",
    interests: ["Yoga", "Cooking", "Volunteering", "Reading", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1611181355758-089959e2cfb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc4MTQ1MzAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 88,
  },
  {
    id: 3,
    name: "Jordan Lee",
    major: "Marketing",
    year: "Freshman",
    bio: "Passionate about social media, fashion, and making new friends. Let's grab lunch!",
    interests: ["Fashion", "Social Media", "Photography", "Music", "Art"],
    imageUrl: "https://images.unsplash.com/photo-1611181355758-089959e2cfb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc4MTQ1MzAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 85,
  },
  {
    id: 4,
    name: "Sam Williams",
    major: "Engineering",
    year: "Senior",
    bio: "Robotics enthusiast, rock climbing addict. Looking for gym buddies and project partners.",
    interests: ["Rock Climbing", "Robotics", "Programming", "Gaming", "Camping"],
    imageUrl: "https://images.unsplash.com/photo-1611181355758-089959e2cfb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc4MTQ1MzAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 90,
  },
];

export function InterestMatching() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<StudentProfile[]>([]);

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = () => {
    if (currentProfile) {
      setMatches([...matches, currentProfile]);
    }
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentProfile) {
    return null;
  }

  return (
    <div className="min-h-full py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Interest Matching</h1>
          <p className="text-gray-600">
            Swipe right on students who share your interests
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {matches.length} Matches
            </Badge>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-xl">
          <div className="relative">
            <ImageWithFallback
              src={currentProfile.imageUrl}
              alt={currentProfile.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 text-white text-lg px-3 py-1">
                {currentProfile.matchScore}% Match
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">{currentProfile.name}</h2>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{currentProfile.major}</span>
                </div>
                <span>•</span>
                <span className="text-sm">{currentProfile.year}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{currentProfile.bio}</p>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 border-2 border-red-500 text-red-500 hover:bg-red-50"
            onClick={handlePass}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-purple-600 hover:bg-purple-700"
            onClick={handleLike}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        {/* Matches Section */}
        {matches.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Your Matches</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={match.imageUrl}
                      alt={match.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-semibold text-sm truncate">{match.name}</p>
                    <p className="text-xs text-gray-600 truncate">{match.major}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
