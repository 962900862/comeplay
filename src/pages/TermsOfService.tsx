import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TermsOfService() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/90 dark:bg-[#0F0F15]/90 rounded-lg p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {language === 'en' ? 'Terms of Service' : '服务条款'}
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-base leading-relaxed">
            Welcome to PlayJoy Games. By accessing our website and using our services, you agree to comply 
            with and be bound by the following terms and conditions. Please read these terms carefully 
            before using our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-base leading-relaxed">
            By accessing and using PlayJoy Games, you acknowledge that you have read, understood, and 
            agree to be bound by these terms. If you do not agree to these terms, please do not use 
            our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            2. User Accounts
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>You must be at least 13 years old to use our services.</li>
            <li>You are responsible for maintaining the confidentiality of your account information.</li>
            <li>You agree to provide accurate and complete information when creating an account.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            3. User Conduct
          </h2>
          <p className="text-base leading-relaxed">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Use our services for any unlawful purpose</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Post false, misleading, or offensive content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our services to distribute malware or viruses</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            4. Intellectual Property
          </h2>
          <p className="text-base leading-relaxed">
            All content on PlayJoy Games, including but not limited to games, graphics, text, and logos, 
            is the property of PlayJoy Games or its licensors and is protected by copyright and other 
            intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            5. Service Modifications
          </h2>
          <p className="text-base leading-relaxed">
            We reserve the right to modify, suspend, or discontinue any part of our services at any time 
            without notice. We shall not be liable to you or any third party for any modification, 
            suspension, or discontinuation of our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            6. Limitation of Liability
          </h2>
          <p className="text-base leading-relaxed">
            PlayJoy Games shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages arising out of or relating to your use of our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            7. Governing Law
          </h2>
          <p className="text-base leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
            8. Contact Information
          </h2>
          <p className="text-base leading-relaxed">
            For questions about these Terms of Service, please contact us at:
            <br />
            Email: <a href="mailto:962900862@qq.com" className="text-blue-500 hover:text-blue-600">962900862@qq.com</a>
          </p>
        </div>
      </div>
    </div>
  );
} 