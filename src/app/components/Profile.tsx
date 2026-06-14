import { useState } from "react";
import { Camera, Edit, MapPin, GraduationCap, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jordan Taylor",
    major: "Computer Science",
    year: "Junior",
    email: "jordan.taylor@university.edu",
    bio: "Passionate about coding, gaming, and making new friends. Always down for coffee and conversations about tech!",
    location: "Campus Dorms",
    joined: "September 2024",
    interests: ["Gaming", "Programming", "Music", "Photography", "Hiking"],
  });

  const stats = {
    matches: 24,
    events: 12,
    studySessions: 8,
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <div className="min-h-full py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-purple-600 to-pink-600"></div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-12">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-3xl bg-purple-600 text-white">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 md:mb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{profile.major} • {profile.year}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "" : "bg-purple-600 hover:bg-purple-700"}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.matches}</div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.events}</div>
                <div className="text-sm text-gray-600">Events Attended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.studySessions}</div>
                <div className="text-sm text-gray-600">Study Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg">About Me</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-700">{profile.bio}</p>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">Joined {profile.joined}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg">My Interests</h2>
                <p className="text-sm text-gray-600">
                  These help us match you with like-minded students
                </p>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input placeholder="Add an interest..." />
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-sm">
                          {interest}
                          <button className="ml-2 hover:text-red-600">×</button>
                        </Badge>
                      ))}
                    </div>
                    <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} className="bg-purple-100 text-purple-700 text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg">Clubs & Organizations</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Computer Science Club", "Photography Society", "Hiking Club"].map((club) => (
                    <div key={club} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {club[0]}
                      </div>
                      <span className="font-medium">{club}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg">Account Settings</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profile.name} readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.email} type="email" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Input value={profile.major} readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input value={profile.year} readOnly={!isEditing} />
                </div>
                {isEditing && (
                  <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg">Privacy Settings</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show profile in matching</h3>
                    <p className="text-sm text-gray-600">Allow others to find and match with you</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Anonymous icebreakers</h3>
                    <p className="text-sm text-gray-600">Keep your identity hidden in icebreaker responses</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
