'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Fade-in animation for the form on page load
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // Hover animation for the button
    if (buttonRef.current) {
      const handleMouseEnter = () => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      };
      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
      };

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        buttonRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        buttonRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4 py-8">
      <div
        ref={formRef}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">How are you feeling?</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your mood..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-gray-50 text-gray-700"
            required
          />
          <button
            ref={buttonRef}
            type="submit"
            className="w-full bg-pink-200 hover:bg-pink-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Submit Mood
          </button>
        </form>
      </div>
    </div>
  );
}
