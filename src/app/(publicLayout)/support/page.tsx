/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { type: string; message: string }[]
  >([{ type: "bot", message: "Hello! How can I help you today?" }]);
  const [messageInput, setMessageInput] = useState("");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // FAQ state
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);
  const [faqSearchQuery, setFaqSearchQuery] = useState("");

  const faqCategories = [
    {
      id: "orders",
      title: "Orders & Shipping",
      faqs: [
        {
          id: "order-tracking",
          question: "How can I track my order?",
          answer:
            "You can track your order by logging into your account and visiting the 'Order History' section. Alternatively, you can use the tracking number provided in your shipping confirmation email by entering it on our tracking page or directly on the courier's website.",
        },
        {
          id: "shipping-time",
          question: "How long will it take to receive my order?",
          answer:
            "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is 1-2 business days. International shipping can take 7-14 business days depending on the destination country and customs processing.",
        },
        {
          id: "order-changes",
          question: "Can I change or cancel my order?",
          answer:
            "You can change or cancel your order within 1 hour of placing it. After that, our fulfillment process begins and we cannot guarantee changes. Please contact our customer support team immediately if you need to make changes to a recent order.",
        },
        {
          id: "missing-items",
          question: "What should I do if items are missing from my order?",
          answer:
            "If you received a partial order, please contact our support team within 48 hours of delivery. Please have your order number ready and a description of what items are missing. We'll resolve this issue as quickly as possible.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      faqs: [
        {
          id: "return-policy",
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items in new, unused condition with original packaging and tags. Some products like intimate apparel, personalized items, and sale merchandise may have different return eligibility. Please check the product page for specific return information.",
        },
        {
          id: "refund-time",
          question: "How long do refunds take to process?",
          answer:
            "Once we receive your returned items, it typically takes 3-5 business days to inspect and process the return. After approval, refunds are issued to your original payment method and may take an additional 5-10 business days to appear on your statement, depending on your financial institution.",
        },
        {
          id: "return-shipping",
          question: "Do I have to pay for return shipping?",
          answer:
            "For standard returns, customers are responsible for return shipping costs unless the return is due to our error (wrong item shipped, defective product, etc.). If you're exchanging an item, we'll provide a free return shipping label. Premium members receive free return shipping on all orders.",
        },
        {
          id: "damaged-items",
          question: "What if my item arrives damaged?",
          answer:
            "If your item arrives damaged, please take photos of the damage and contact our support team within 48 hours of delivery. We'll arrange for a replacement or refund, and you won't need to pay for return shipping in this case.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Payments",
      faqs: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' or 'My Account' button at the top of our website. You'll need to provide your email address and create a password. You can also sign up during the checkout process.",
        },
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For select regions, we also offer payment installment options through Affirm and Klarna.",
        },
        {
          id: "password-reset",
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on 'My Account' and then 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. The link is valid for 24 hours.",
        },
        {
          id: "order-without-account",
          question: "Can I order without creating an account?",
          answer:
            "Yes, we offer a guest checkout option that allows you to complete your purchase without creating an account. However, creating an account makes future purchases faster and allows you to track orders and access your order history.",
        },
      ],
    },
    {
      id: "products",
      title: "Products & Inventory",
      faqs: [
        {
          id: "product-availability",
          question: "How do I know if a product is in stock?",
          answer:
            "Product pages display real-time inventory status. If an item is in stock, you'll see the available quantity or simply 'In Stock'. Out-of-stock items will be marked as 'Out of Stock' or 'Temporarily Unavailable'. You can sign up for back-in-stock notifications on product pages.",
        },
        {
          id: "product-specifications",
          question: "Where can I find detailed product specifications?",
          answer:
            "Detailed product specifications can be found on each product page under the 'Specifications' or 'Details' tab. This includes dimensions, materials, care instructions, and other relevant information. If you need additional details, please contact our customer support.",
        },
        {
          id: "size-guides",
          question: "Do you have size guides for clothing and shoes?",
          answer:
            "Yes, we provide comprehensive size guides for all apparel and footwear. Look for the 'Size Guide' link near the size selection on product pages. Our guides include measurements in both inches and centimeters, as well as conversion charts for international sizing.",
        },
        {
          id: "product-restocks",
          question: "When will out-of-stock items be restocked?",
          answer:
            "Restock timelines vary by product. You can sign up for back-in-stock notifications on product pages to be alerted when specific items are available again. For popular items, we typically restock within 2-4 weeks, but seasonal products may have longer wait times.",
        },
      ],
    },
  ];

  // Initialize all FAQs as collapsed
  useEffect(() => {
    const initialExpandedState: { [key: string]: boolean } = {};
    faqCategories.forEach((category) => {
      category.faqs.forEach((faq) => {
        initialExpandedState[faq.id] = false;
      });
    });
    setExpandedFaqs(initialExpandedState);

    // Initialize filtered FAQs with all FAQs
    const allFaqs = faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({ ...faq, category: category.title }))
    );
    setFilteredFaqs(allFaqs);
  }, []);

  // Filter FAQs based on search query
  useEffect(() => {
    if (faqSearchQuery.trim() === "") {
      const allFaqs = faqCategories.flatMap((category) =>
        category.faqs.map((faq) => ({ ...faq, category: category.title }))
      );
      setFilteredFaqs(allFaqs);
      return;
    }

    const query = faqSearchQuery.toLowerCase();
    const filtered = faqCategories.flatMap((category) =>
      category.faqs
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
        .map((faq) => ({ ...faq, category: category.title }))
    );

    setFilteredFaqs(filtered);
  }, [faqSearchQuery]);

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const handleTicketFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToastNotification(
      "Ticket Submitted",
      "We'll get back to you as soon as possible."
    );
    setTicketForm({
      name: "",
      email: "",
      orderNumber: "",
      subject: "",
      message: "",
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Add user message
    const userMessage = messageInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { type: "user", message: userMessage },
    ]);
    setMessageInput("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      // Simple keyword-based response system
      const lowerCaseMessage = userMessage.toLowerCase();
      let botResponse =
        "I'm not sure I understand. Could you please provide more details or try asking about orders, shipping, returns, or products?";

      if (
        lowerCaseMessage.includes("order") ||
        lowerCaseMessage.includes("tracking")
      ) {
        botResponse =
          "You can track your order by logging into your account and visiting the 'Order History' section. If you need more help with your order, please provide your order number.";
      } else if (
        lowerCaseMessage.includes("return") ||
        lowerCaseMessage.includes("refund")
      ) {
        botResponse =
          "Our return policy allows returns within 30 days of purchase. To initiate a return, go to your order history and select 'Return Item'. Would you like me to guide you through the process?";
      } else if (
        lowerCaseMessage.includes("shipping") ||
        lowerCaseMessage.includes("delivery")
      ) {
        botResponse =
          "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery. International shipping may take 7-14 days depending on the destination.";
      } else if (
        lowerCaseMessage.includes("payment") ||
        lowerCaseMessage.includes("card")
      ) {
        botResponse =
          "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. Your payment information is securely encrypted. Is there a specific payment issue you're experiencing?";
      } else if (
        lowerCaseMessage.includes("hello") ||
        lowerCaseMessage.includes("hi") ||
        lowerCaseMessage.includes("hey")
      ) {
        botResponse =
          "Hello! How can I help you today? Feel free to ask about orders, returns, products, or account issues.";
      } else if (lowerCaseMessage.includes("thank")) {
        botResponse =
          "You're welcome! Is there anything else I can help you with today?";
      } else if (
        lowerCaseMessage.includes("product") ||
        lowerCaseMessage.includes("item")
      ) {
        botResponse =
          "We have a wide range of products available. For specific product questions, please provide the product name or category you're interested in.";
      } else if (
        lowerCaseMessage.includes("account") ||
        lowerCaseMessage.includes("login") ||
        lowerCaseMessage.includes("password")
      ) {
        botResponse =
          "For account issues, you can reset your password through the 'Forgot Password' link on the login page. If you're having trouble accessing your account, please provide more details.";
      }

      setChatMessages((prev) => [
        ...prev,
        { type: "bot", message: botResponse },
      ]);
    }, 1000);
  };

  const showToastNotification = (title: string, message: string) => {
    setToastMessage({ title, message });
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform translate-y-0 opacity-100">
          <div className="flex p-4">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {toastMessage.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {toastMessage.message}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Live Chat Widget */}
      {showChat && (
        <div className="fixed bottom-20 right-4 z-40 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-96">
          <div className="bg-orange-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Live Chat Support</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.type === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.type === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleChatSubmit}
            className="border-t border-gray-200 p-4"
          >
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-8 z-30 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-gray-600 md:text-xl mb-8">
              Find answers, get support, and resolve issues quickly.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search for help with orders, returns, account..."
              />
              <button
                type="button"
                className="absolute right-2.5 bottom-2.5 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Orders & Shipping
              </h3>
              <p className="text-gray-600 mb-4">
                Track your order, shipping information, and delivery status.
              </p>
              <a
                href="#orders"
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Returns & Refunds
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about our return policy and how to request a refund.
              </p>
              <a
                href="#returns"
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Account & Payments
              </h3>
              <p className="text-gray-600 mb-4">
                Manage your account, payment methods, and security settings.
              </p>
              <a
                href="#account"
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get help with product specifications, usage, and
                troubleshooting.
              </p>
              <a
                href="#products"
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab("help")}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === "help"
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Self-Help Resources
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === "contact"
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Contact Support
                  </button>
                  <button
                    onClick={() => setActiveTab("ticket")}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === "ticket"
                        ? "border-b-2 border-orange-600 text-orange-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Submit a Ticket
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {activeTab === "help" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Help Resources
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Find answers to common questions in our knowledge base,
                    watch tutorial videos, or browse our help articles.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <a
                      href="#"
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        Knowledge Base
                      </span>
                    </a>

                    <a
                      href="#"
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        Video Tutorials
                      </span>
                    </a>

                    <a
                      href="#"
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        Getting Started Guides
                      </span>
                    </a>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Popular Help Topics
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        How to track your order
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        Return policy and process
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        Shipping methods and delivery times
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        Payment methods and security
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        Account management and password reset
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "contact" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Contact Support
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our support team is here to help. Choose your preferred
                    contact method below.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Email Support
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Send us an email and we&apos;ll respond within 24 hours.
                      </p>
                      <a
                        href="mailto:support@example.com"
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        support@example.com
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Phone Support
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Call us Monday-Friday, 9am-5pm EST.
                      </p>
                      <a
                        href="tel:+18001234567"
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        1-800-123-4567
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Live Chat
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Chat with our support team in real-time.
                      </p>
                      <button
                        onClick={() => setShowChat(true)}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Start Chat
                      </button>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Support Hours
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Our customer support team is available during the
                      following hours:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Monday - Friday:</span>
                        <span>9:00 AM - 8:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>10:00 AM - 6:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "ticket" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Submit a Support Ticket
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Fill out the form below to submit a support ticket. We&apos;ll
                    respond to your inquiry as soon as possible.
                  </p>

                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={ticketForm.name}
                          onChange={handleTicketFormChange}
                          required
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={ticketForm.email}
                          onChange={handleTicketFormChange}
                          required
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="orderNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Order Number (if applicable)
                      </label>
                      <input
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={ticketForm.orderNumber}
                        onChange={handleTicketFormChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="e.g. ORD-12345"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={ticketForm.subject}
                        onChange={handleTicketFormChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="order-issue">Order Issue</option>
                        <option value="return-refund">Return or Refund</option>
                        <option value="product-question">
                          Product Question
                        </option>
                        <option value="account-issue">Account Issue</option>
                        <option value="website-issue">Website Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={ticketForm.message}
                        onChange={handleTicketFormChange}
                        required
                        rows={5}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Please describe your issue in detail"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12" id="faq">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-600">
                Find answers to our most commonly asked questions.
              </p>
            </div>

            {/* FAQ Search */}
            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Search FAQs..."
                />
              </div>
            </div>

            {/* FAQ Results */}
            {faqSearchQuery ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {filteredFaqs.length}{" "}
                  {filteredFaqs.length === 1 ? "result" : "results"} for &quot;
                  {faqSearchQuery}&quot;
                </h3>

                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No FAQs found matching your search. Try different keywords
                      or browse all categories below.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          <div>
                            <span className="text-sm text-orange-600 font-medium">
                              {faq.category}
                            </span>
                            <h4 className="text-base font-medium text-gray-900 mt-1">
                              {faq.question}
                            </h4>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform ${expandedFaqs[faq.id] ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {expandedFaqs[faq.id] && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* FAQ Categories */}
                <div className="space-y-8">
                  {faqCategories.map((category) => (
                    <div
                      key={category.id}
                      id={category.id}
                      className="scroll-mt-20"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        {category.title}
                      </h3>
                      <div className="space-y-4">
                        {category.faqs.map((faq) => (
                          <div
                            key={faq.id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleFaq(faq.id)}
                              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                            >
                              <h4 className="text-base font-medium text-gray-900">
                                {faq.question}
                              </h4>
                              <svg
                                className={`w-5 h-5 text-gray-500 transform ${expandedFaqs[faq.id] ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                            {expandedFaqs[faq.id] && (
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-gray-600">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Still Need Help */}
            <div className="mt-12 bg-orange-50 rounded-lg p-6 border border-orange-100 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Still Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Can&apos;t find what you&apos;re looking for? Our support team is here to
                assist you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setActiveTab("contact")}
                  className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => setShowChat(true)}
                  className="inline-flex items-center justify-center rounded-md border border-orange-600 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
