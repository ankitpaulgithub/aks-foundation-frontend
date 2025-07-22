import React from "react";

const FeatureHighlight = ({
  image,
  title,
  description,
  checklist,
  primaryButton,
  secondaryButton,
  reverse = false,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 px-4 py-8 sm:px-6 sm:py-10 ${className}`}
    >
      <div className="flex-1 min-w-0 flex justify-center mb-6 md:mb-0">{image}</div>
      <div className="flex-1 min-w-0 flex flex-col items-start break-words w-full max-w-xl">
        <span className="text-xs font-medium text-gray-500 mb-2">Feature Highlight</span>
        <h3 className="text-2xl font-semibold text-blue-900 mb-2 leading-snug">{title}</h3>
        <p className="mb-4 text-gray-700 font-normal leading-relaxed">{description}</p>
        <ul className="mb-6 text-gray-700 space-y-2 pl-0">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-base font-normal">
              <span className="text-green-600 text-lg mt-0.5">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 flex-wrap w-full">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg shadow transition-colors"
            onClick={primaryButton.onClick}
          >
            {primaryButton.label}
          </button>
          <button
            className="border border-green-500 text-green-600 font-medium px-6 py-2 rounded-lg hover:bg-green-50 transition-colors"
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight; 