import { Link } from "react-router";
import { Users, MessageCircle, Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Home() {
  const features = [
    {
      icon: Users,
      title: "Interest Matching",
      description: "Find students who share your hobbies, passions, and clubs",
      link: "/interests",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: MessageCircle,
      title: "Icebreaker Questions",
      description: "Start conversations with fun, anonymous questions",
      link: "/icebreakers",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Calendar,
      title: "Event Discovery",
      description: "Discover campus events, parties, and activities",
      link: "/events",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: BookOpen,
      title: "Study Partner Finder",
      description: "Connect with classmates for study sessions",
      link: "/study-partners",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Connect with your campus community</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Make Friends. <br />Find Your Tribe.
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Campus Connect helps college students build meaningful connections through shared interests, events, and study groups.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/interests">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc4MTQxNTMxMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students studying together"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Connect</h2>
            <p className="text-gray-600 text-lg">
              Powerful features to help you find your people on campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.link} to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm text-purple-600 font-medium flex items-center gap-1">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">2,500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600">Campus Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Study Groups Formed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
