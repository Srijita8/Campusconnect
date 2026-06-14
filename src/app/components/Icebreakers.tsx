import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface Question {
  id: number;
  text: string;
  category: string;
  responses: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "If you could have dinner with any historical figure, who would it be and why?",
    category: "Deep Thoughts",
    responses: 156,
  },
  {
    id: 2,
    text: "What's your most embarrassing college moment so far?",
    category: "Fun & Silly",
    responses: 243,
  },
  {
    id: 3,
    text: "What class surprised you the most this semester?",
    category: "Academic",
    responses: 89,
  },
  {
    id: 4,
    text: "If you could master any skill instantly, what would it be?",
    category: "Dreams & Goals",
    responses: 312,
  },
  {
    id: 5,
    text: "What's your go-to late-night study snack?",
    category: "Campus Life",
    responses: 178,
  },
  {
    id: 6,
    text: "Which professor has had the biggest impact on you and why?",
    category: "Academic",
    responses: 124,
  },
  {
    id: 7,
    text: "What's your hidden talent that most people don't know about?",
    category: "Get to Know",
    responses: 267,
  },
  {
    id: 8,
    text: "If you could travel anywhere during spring break, where would you go?",
    category: "Travel & Adventure",
    responses: 198,
  },
];

const categoryColors: Record<string, string> = {
  "Deep Thoughts": "bg-purple-100 text-purple-700",
  "Fun & Silly": "bg-pink-100 text-pink-700",
  "Academic": "bg-blue-100 text-blue-700",
  "Dreams & Goals": "bg-green-100 text-green-700",
  "Campus Life": "bg-orange-100 text-orange-700",
  "Get to Know": "bg-cyan-100 text-cyan-700",
  "Travel & Adventure": "bg-teal-100 text-teal-700",
};

export function Icebreakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = mockQuestions[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockQuestions.length);
    setAnswer("");
    setSubmitted(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mockQuestions.length) % mockQuestions.length);
    setAnswer("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  return (
    <div className="min-h-full py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-600">Anonymous Icebreakers</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Break the Ice</h1>
          <p className="text-gray-600">
            Answer fun questions anonymously and see what others think
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl mb-6">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={categoryColors[currentQuestion.category]}>
                {currentQuestion.category}
              </Badge>
              <span className="text-sm text-gray-500">
                {currentQuestion.responses} responses
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="min-h-[120px] flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-center leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            {!submitted ? (
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your anonymous answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[120px] text-base"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Anonymously
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 font-semibold mb-2">
                  ✓ Response Submitted!
                </div>
                <p className="text-sm text-gray-600">
                  Your anonymous answer has been shared with the community
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-gray-600">
              {currentIndex + 1} / {mockQuestions.length}
            </div>

            <Button
              variant="outline"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Popular Responses Preview */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h3 className="font-semibold">Popular Responses</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "I'd love to meet Marie Curie and talk about her groundbreaking research!",
              "Albert Einstein - I have so many questions about physics and creativity.",
              "Maya Angelou - her wisdom and poetry would make for amazing conversation.",
            ].map((response, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                "{response}"
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(categoryColors).map((category) => (
              <button
                key={category}
                className={`${categoryColors[category]} rounded-lg p-3 text-sm font-medium transition-transform hover:scale-105`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
