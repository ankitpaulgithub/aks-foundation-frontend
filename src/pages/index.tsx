import Head from "next/head";
import Navbar from "../components/Navbar";
import FeatureHighlight from "../components/FeatureHighlight";
import Footer from "../components/Footer";

const features = [
  {
    title: "Education system",
    description:
      "AI-powered education system that provides personalized learning experiences, adaptive quizzes, and real-time feedback to help students excel in their studies.",
    checklist: [
      "Personalized learning experiences",
      "Adaptive quizzes",
      "Real-time feedback",
    ],
    image: (
      <div className="w-[320px] h-[456px] bg-slate-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
        426 x 607
      </div>
    ),
    primaryButton: { label: "Get Started" },
    secondaryButton: { label: "Contact Us" },
    reverse: false,
    className: "",
  },
  {
    title: "Library Management System",
    description:
      "AI-powered library management system that provides personalized learning experiences, adaptive quizzes, and real-time feedback to help students excel in their studies.",
    checklist: [
      "Personalized learning experiences",
      "Adaptive quizzes",
      "Real-time feedback",
    ],
    image: (
      <div className="w-[320px] h-[456px] bg-slate-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
        426 x 607
      </div>
    ),
    primaryButton: { label: "Get Started" },
    secondaryButton: { label: "Contact Us" },
    reverse: true,
    className: "bg-gray-200 p-6 rounded-xl",
  },
  {
    title: "Construction Management System",
    description:
      "AI-powered construction management system that provides personalized learning experiences, adaptive quizzes, and real-time feedback to help students excel in their studies.",
    checklist: [
      "Personalized learning experiences",
      "Adaptive quizzes",
      "Real-time feedback",
    ],
    image: (
      <div className="w-[320px] h-[456px] bg-slate-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
        426 x 607
      </div>
    ),
    primaryButton: { label: "Get Started" },
    secondaryButton: { label: "Contact Us" },
    reverse: false,
    className: "",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Empowering Nation with AI Automation</title>
        <meta name="description" content="AKS Foundation is an AI-driven enterprise platform for MSMEs." />
      </Head>
      <Navbar />
      <main className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16 gap-8 md:gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 leading-tight">
            Empowering Nation<br />with AI Automation
          </h1>
          <p className="text-gray-700 mb-6">
            AKS Foundation is an AI-driven enterprise platform that simplifies business operations for MSMEs. From automated invoicing to predictive inventory and employee attendance tracking — we make your business smarter, faster, and credit-ready.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow mb-6 transition-colors">
            Get Started
          </button>
          <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg relative mt-4 max-w-md">
            <span className="absolute -left-4 -top-4 text-4xl text-yellow-400 font-bold">“</span>
            <p className="italic text-base">
              "AKS Foundation is revolutionizing the way small businesses manage finances. With seamless automation and real-time insights, MSMEs can now focus on growth instead of paperwork."
            </p>
            <span className="block text-yellow-400 text-right mt-2">— Business Today</span>
          </div>
        </div>
        {/* Right: Phone Images */}
        <div className="flex-1 flex items-center justify-center relative w-full max-w-md">
          {/* Placeholder for phone images */}
          <div className="w-[260px] h-[520px] bg-gray-200 rounded-3xl shadow-lg border-4 border-gray-300 relative z-10" />
          <div className="w-[200px] h-[400px] bg-gray-100 rounded-2xl shadow-lg border-4 border-gray-200 absolute  top-16 z-0 md:left-[-60px] md:top-16" />
        </div>
      </main>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6">
          What You Can Do with AKS Foundation
        </h2>
        {/* Add feature cards or content here */}
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {features.map((feature, idx) => (
            <FeatureHighlight key={idx} {...feature} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
