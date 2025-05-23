import React, { useRef } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  rating: number;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Madad's crop monitoring system has revolutionized my farming practices!",
    rating: 5,
    author: "Rajesh Kumar"
  },
  {
    id: 2,
    text: "The smart irrigation feature saved me 40% on water costs.",
    rating: 5,
    author: "Priya Singh"
  },
  {
    id: 3,
    text: "Best agricultural tech platform I've used in 20 years of farming.",
    rating: 5,
    author: "Mohammed Ali"
  },
  {
    id: 4,
    text: "Disease detection is spot on! Saved my entire wheat crop.",
    rating: 4,
    author: "Sunita Patel"
  },
  {
    id: 5,
    text: "Market predictions are incredibly accurate. Great for planning!",
    rating: 5,
    author: "Amit Desai"
  },
  {
    id: 6,
    text: "Expert consultations are worth every penny. Very knowledgeable team.",
    rating: 5,
    author: "Lakshmi Iyer"
  },
  {
    id: 7,
    text: "User-friendly interface makes it easy to monitor my entire farm.",
    rating: 4,
    author: "Vikram Singh"
  },
  {
    id: 8,
    text: "The mobile app is a game-changer for on-the-go monitoring.",
    rating: 5,
    author: "Neha Sharma"
  },
  {
    id: 9,
    text: "Customer support is exceptional. Always there when needed.",
    rating: 5,
    author: "Rahul Gupta"
  },
  {
    id: 10,
    text: "Weather alerts have helped me protect my crops multiple times.",
    rating: 4,
    author: "Anita Reddy"
  },
  {
    id: 11,
    text: "Soil analysis feature is incredibly detailed and accurate.",
    rating: 5,
    author: "Kiran Mehta"
  },
  {
    id: 12,
    text: "Best investment I've made for my farm. ROI is amazing!",
    rating: 5,
    author: "Deepak Verma"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#FFD700" : "none"}
        stroke={i < rating ? "#FFD700" : "#FFD700"}
      />
    ));
  };

  // Create seamless loops for each row
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4, 8), ...testimonials.slice(4, 8)];
  const row3 = [...testimonials.slice(8, 12), ...testimonials.slice(8, 12)];

  return (
    <div className="testimonials-container">
      <h2>What Our Users Say</h2>
      <div className="testimonials-scroll-container" ref={scrollRef}>
        <div className="testimonials-scroll-row row1">
          {row1.map((testimonial, index) => (
            <div key={`row1-${testimonial.id}-${index}`} className="testimonial-card">
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
        <div className="testimonials-scroll-row row2">
          {row2.map((testimonial, index) => (
            <div key={`row2-${testimonial.id}-${index}`} className="testimonial-card">
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
        <div className="testimonials-scroll-row row3">
          {row3.map((testimonial, index) => (
            <div key={`row3-${testimonial.id}-${index}`} className="testimonial-card">
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 