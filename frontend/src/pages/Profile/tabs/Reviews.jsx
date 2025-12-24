import { Star, ThumbsUp, MessageSquare, Edit, Trash2 } from "lucide-react";
import ProfileCard from "../ProfileCard";

export default function Reviews({ user }) {
  const reviews = [
    { 
      id: 1, 
      product: "Wireless Headphones", 
      rating: 5, 
      comment: "Excellent sound quality and comfortable fit!",
      date: "2 days ago",
      likes: 12,
      replies: 3
    },
    { 
      id: 2, 
      product: "Smart Watch", 
      rating: 4, 
      comment: "Good features but battery life could be better.",
      date: "1 week ago",
      likes: 5,
      replies: 1
    },
    { 
      id: 3, 
      product: "Laptop Stand", 
      rating: 5, 
      comment: "Very sturdy and adjustable. Perfect for my setup!",
      date: "2 weeks ago",
      likes: 8,
      replies: 0
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileCard 
        title="My Reviews"
        action="Write Review"
        onClickAction={() => console.log("Write review")}
      >
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.product}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp className="w-4 h-4" />
                  {review.likes} helpful
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <MessageSquare className="w-4 h-4" />
                  {review.replies} replies
                </button>
              </div>
            </div>
          ))}
        </div>
      </ProfileCard>

      {/* Review Stats */}
      <ProfileCard title="Review Statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <div className="text-2xl font-bold text-amber-600">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Helpful Votes</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Replies Received</div>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
}