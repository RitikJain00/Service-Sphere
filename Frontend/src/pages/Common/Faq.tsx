import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Divider } from "@mantine/core";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide a wide range of household services, including electricians, plumbers, carpenters, pest control, painters, and house cleaning.",
  },
  {
    question: "How do I book a service?",
    answer: "You can book a service through our website by selecting the required service, choosing a date, and providing necessary details. Our professional will reach out to you shortly.",
  },
  {
    question: "What is the pricing for your services?",
    answer: "Pricing varies depending on the service and location. You can check the estimated cost on our website before confirming your booking.",
  },
  {
    question: "Is my data safe with you?",
    answer: "Yes, we prioritize user privacy and ensure all personal data is securely stored and not shared with third parties.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach out to us via email at support@servicesphere.com or call our helpline at +91-7836086508.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-[100vh] w-full bg-mine-shaft-950 text-mine-shaft-100">
      <Header />
      <Divider mx="md" mb='xl' />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-bright-sun-400 text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="w-3/4 flex flex-col gap-6 bg-mine-shaft-900 p-6 rounded-lg shadow-md border border-mine-shaft-700">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-mine-shaft-800 p-4 rounded-md cursor-pointer border border-mine-shaft-700"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openIndex === index ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
              </div>
              {openIndex === index && <p className="mt-2 text-mine-shaft-400">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;