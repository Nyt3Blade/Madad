import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Madad and how does it help farmers?",
    answer: "Madad is an innovative agricultural technology platform that helps farmers optimize their farming practices through real-time monitoring, smart irrigation, disease detection, and market predictions. Our platform combines cutting-edge technology with agricultural expertise to provide comprehensive solutions for modern farming."
  },
  {
    question: "How does the crop monitoring system work?",
    answer: "Our crop monitoring system uses advanced sensors and AI-powered image recognition to track crop health, growth patterns, and potential issues. The system provides real-time updates and alerts about soil conditions, water levels, and early signs of diseases or pest infestations."
  },
  {
    question: "What kind of support do you offer to farmers?",
    answer: "We offer 24/7 technical support, regular expert consultations, and personalized guidance for farmers. Our team of agricultural experts is always available to help with any questions or concerns about crop management, technology usage, or farming practices."
  },
  {
    question: "How accurate are the market predictions?",
    answer: "Our market prediction system uses machine learning algorithms and historical data to provide highly accurate forecasts. While no prediction system is 100% accurate, our system has shown over 85% accuracy in predicting market trends and prices, helping farmers make informed decisions about their crops."
  },
  {
    question: "Is the platform suitable for small-scale farmers?",
    answer: "Yes, Madad is designed to be accessible and beneficial for farmers of all scales. We offer flexible pricing plans and scalable solutions that can be customized according to farm size and requirements. Our technology is user-friendly and can be easily adopted by farmers with varying levels of technical expertise."
  },
  {
    question: "What kind of training is provided for using the platform?",
    answer: "We provide comprehensive training sessions, both online and on-site, to help farmers get started with the platform. This includes basic setup, feature tutorials, and best practices. We also offer ongoing support and regular updates about new features and improvements."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <ChevronDown 
                size={20} 
                className={`chevron ${openIndex === index ? 'rotate' : ''}`}
              />
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 