import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/90 dark:bg-[#0F0F15]/90 rounded-lg p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Privacy Policy' : '隐私政策'}
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-base leading-relaxed">
            PlayJoy Games values the privacy of our users. This privacy policy explains in detail how we use and protect 
            the information we collect when you visit our website, playjoy.com, as well as our media channels and other 
            applications. Please read this privacy policy carefully. If you do not agree with the terms outlined below, 
            we advise you to refrain from using our site.
          </p>

          <p className="text-base leading-relaxed">
            We reserve the right to modify this policy at any time. Changes will be listed in the "Updates" section of 
            the policy. By using this site, you acknowledge that we will not personally notify users of policy changes. 
            We encourage you to review this privacy policy frequently to stay informed of updates. Your continued use of 
            the site constitutes acceptance of the posted policy and all its changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Information Collected by PlayJoy Games
          </h2>
          <p className="text-base leading-relaxed">We may collect personal information through the following methods:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Personal Identifiers:</strong> Name, address, email, phone number, age, gender, and other personal data.</li>
            <li><strong>Server Data:</strong> IP address, browser type, operating system, access time, and site activity.</li>
            <li><strong>Financial Information:</strong> Payment method and transaction details (e.g., credit card information). Note: We do not store financial data directly. Payment information is securely processed by third-party providers.</li>
            <li><strong>Social Network Data:</strong> Information from platforms like Facebook if you log in via social media.</li>
            <li><strong>Mobile Device Information:</strong> Device ID, model, and location (if accessing via our mobile app).</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            How We Use This Information
          </h2>
          <p className="text-base leading-relaxed">Information collected is used to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Manage your account and purchases.</li>
            <li>Personalize ads, promotions, and site experience.</li>
            <li>Send account confirmations, updates, and product notifications.</li>
            <li>Prevent fraud, resolve disputes, and respond to service requests.</li>
            <li>Improve site functionality and request feedback.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Information Disclosure
          </h2>
          <p className="text-base leading-relaxed">Your information remains confidential unless shared under the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Legal Requirements:</strong> To comply with laws or prevent fraud.</li>
            <li><strong>Third-Party Providers:</strong> Payment processors, hosting services, or advertisers.</li>
            <li><strong>With Consent:</strong> For marketing purposes or partnerships.</li>
            <li><strong>Public Content:</strong> Information you post publicly (e.g., comments).</li>
            <li><strong>Business Transfers:</strong> If PlayJoy undergoes bankruptcy or merger.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Cookies, Trackers, and Online Ads
          </h2>
          <p className="text-base leading-relaxed">
            We use cookies, web beacons, and similar technologies to enhance your experience. These tools do not access 
            personal data and can be disabled via browser settings. Third-party advertisers may use tracking for ad 
            optimization. We also use analytics services to track site usage. These vendors do not receive personal data.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Third-Party Links
          </h2>
          <p className="text-base leading-relaxed">
            Our site may link to external websites. We are not responsible for their privacy practices. Review their 
            policies before sharing information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Information Security
          </h2>
          <p className="text-base leading-relaxed">
            We implement technical and administrative safeguards to protect your data. However, no system is entirely 
            immune to risks. Use our site at your discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Do-Not-Track
          </h2>
          <p className="text-base leading-relaxed">
            Some browsers offer "Do-Not-Track" settings. As industry standards for this feature are not yet established, 
            we currently do not respond to these signals.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Your Choices
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Account Management:</strong> Update or delete your account via settings. Note: Some data may be retained for fraud prevention.</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from emails or communications at any time.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="text-base leading-relaxed">
            For questions or concerns about this policy, contact us at:
            <br />
            Email: <a href="mailto:962900862@qq.com" className="text-blue-500 hover:text-blue-600">962900862@qq.com</a>
          </p>
        </div>
      </div>
    </div>
  );
} 