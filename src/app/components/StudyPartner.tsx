import { useState } from "react";
import { BookOpen, Clock, MapPin, GraduationCap, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface StudyPartner {
  id: number;
  name: string;
  major: string;
  courses: string[];
  availability: string[];
  location: string;
  gpa: string;
  bio: string;
  avatar: string;
}

const mockPartners: StudyPartner[] = [
  {
    id: 1,
    name: "Emily Johnson",
    major: "Computer Science",
    courses: ["Data Structures", "Algorithms", "Database Systems"],
    availability: ["Mon 2-5pm", "Wed 3-6pm"],
    location: "Main Library",
    gpa: "3.8",
    bio: "Love collaborative learning! Strong in CS fundamentals.",
    avatar: "EJ",
  },
  {
    id: 2,
    name: "Marcus Chen",
    major: "Biology",
    courses: ["Organic Chemistry", "Molecular Biology", "Genetics"],
    availability: ["Tue 1-4pm", "Thu 2-5pm"],
    location: "Science Library",
    gpa: "3.9",
    bio: "Pre-med student looking for study buddies for MCAT prep.",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Sarah Williams",
    major: "Business",
    courses: ["Financial Accounting", "Marketing", "Statistics"],
    availability: ["Mon 4-7pm", "Fri 1-4pm"],
    location: "Business School",
    gpa: "3.7",
    bio: "Organized study sessions with detailed notes to share.",
    avatar: "SW",
  },
  {
    id: 4,
    name: "Alex Rivera",
    major: "Mathematics",
    courses: ["Calculus III", "Linear Algebra", "Differential Equations"],
    availability: ["Wed 10am-1pm", "Sat 2-5pm"],
    location: "Math Lab",
    gpa: "4.0",
    bio: "Can help explain complex concepts. Patient tutor!",
    avatar: "AR",
  },
  {
    id: 5,
    name: "Jessica Park",
    major: "Psychology",
    courses: ["Research Methods", "Cognitive Psychology", "Statistics"],
    availability: ["Tue 3-6pm", "Thu 4-7pm"],
    location: "Psychology Building",
    gpa: "3.8",
    bio: "Looking for partners for research project collaboration.",
    avatar: "JP",
  },
  {
    id: 6,
    name: "David Kim",
    major: "Engineering",
    courses: ["Thermodynamics", "Fluid Mechanics", "Circuit Analysis"],
    availability: ["Mon 6-9pm", "Wed 7-10pm"],
    location: "Engineering Lab",
    gpa: "3.6",
    bio: "Good with problem sets and hands-on projects.",
    avatar: "DK",
  },
];

export function StudyPartner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const majors = ["all", ...new Set(mockPartners.map((p) => p.major))];
  const allCourses = new Set(mockPartners.flatMap((p) => p.courses));
  const courses = ["all", ...Array.from(allCourses)];

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMajor = selectedMajor === "all" || partner.major === selectedMajor;
    const matchesCourse = selectedCourse === "all" || partner.courses.includes(selectedCourse);
    return matchesSearch && matchesMajor && matchesCourse;
  });

  return (
    <div className="min-h-full py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Partner Finder</h1>
          <p className="text-gray-600">
            Connect with classmates for study sessions and group projects
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                <SelectTrigger>
                  <SelectValue placeholder="All Majors" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major === "all" ? "All Majors" : major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course === "all" ? "All Courses" : course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-purple-600 text-white">
                      {partner.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{partner.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>{partner.major}</span>
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      GPA: {partner.gpa}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{partner.bio}</p>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Courses
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.courses.map((course) => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Availability
                  </h4>
                  <div className="space-y-1">
                    {partner.availability.map((time) => (
                      <div key={time} className="text-xs text-gray-600">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{partner.location}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No study partners found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Tips Card */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border-none">
          <CardHeader>
            <h2 className="font-bold text-lg">Study Tips</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Set clear goals and expectations for each study session</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Choose quiet locations with minimal distractions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Take regular breaks to maintain focus and productivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Share notes and resources to help each other succeed</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
