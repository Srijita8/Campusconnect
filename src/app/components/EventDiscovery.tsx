import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  imageUrl: string;
  description: string;
  organizer: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Spring Festival Concert",
    date: "June 20, 2026",
    time: "7:00 PM",
    location: "Campus Amphitheater",
    attendees: 342,
    category: "Music",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwcGFydHklMjBldmVudCUyMGNyb3dkfGVufDF8fHx8MTc4MTQ1MzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Annual spring concert featuring student bands and special guest performers.",
    organizer: "Student Activities Board",
  },
  {
    id: 2,
    title: "Career Fair 2026",
    date: "June 22, 2026",
    time: "10:00 AM",
    location: "Student Union Hall",
    attendees: 456,
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1530099486328-e021101a494a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2x1YiUyMG1lZXRpbmclMjBncm91cHxlbnwxfHx8fDE3ODE0NTMwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Meet recruiters from top companies and explore internship opportunities.",
    organizer: "Career Services",
  },
  {
    id: 3,
    title: "Midnight Study Session",
    date: "June 17, 2026",
    time: "9:00 PM",
    location: "Main Library",
    attendees: 89,
    category: "Academic",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc4MTMyNzgyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Group study session for finals week with free coffee and snacks.",
    organizer: "Library Student Council",
  },
  {
    id: 4,
    title: "Yoga in the Park",
    date: "June 18, 2026",
    time: "8:00 AM",
    location: "Campus Green",
    attendees: 67,
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1652487308763-4e9cee456d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3ODEzOTkyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Morning yoga session to destress before finals. All levels welcome!",
    organizer: "Wellness Club",
  },
  {
    id: 5,
    title: "Gaming Tournament",
    date: "June 21, 2026",
    time: "2:00 PM",
    location: "Recreation Center",
    attendees: 128,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwcGFydHklMjBldmVudCUyMGNyb3dkfGVufDF8fHx8MTc4MTQ1MzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Compete in our annual esports tournament with prizes and giveaways.",
    organizer: "Gaming Club",
  },
  {
    id: 6,
    title: "Food Truck Friday",
    date: "June 19, 2026",
    time: "11:30 AM",
    location: "Central Plaza",
    attendees: 234,
    category: "Social",
    imageUrl: "https://images.unsplash.com/photo-1530099486328-e021101a494a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2x1YiUyMG1lZXRpbmclMjBncm91cHxlbnwxfHx8fDE3ODE0NTMwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Weekly food truck event with diverse cuisines and live music.",
    organizer: "Campus Dining",
  },
];

export function EventDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Music", "Career", "Academic", "Wellness", "Gaming", "Social"];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-full py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Event Discovery</h1>
          <p className="text-gray-600">
            Find campus events, parties, and activities happening around you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-white text-purple-700">
                  {event.category}
                </Badge>
              </div>

              <CardHeader>
                <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  I'm Interested
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Create Event CTA */}
        <div className="mt-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Want to host an event?</h2>
          <p className="text-purple-100 mb-4">
            Share your event with the campus community
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}
