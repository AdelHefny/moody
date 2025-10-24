'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface MoodData {
  row_number: number;
  date: string;
  image_url: string;
  description: string;
  averageMood: string;
  total_submissions: number;
}

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const moodsRef = useRef<HTMLDivElement>(null);
  const [moods, setMoods] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [todayMoodImage, setTodayMoodImage] = useState<string>('');
  const [submitProgress, setSubmitProgress] = useState(0);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    const handleMouseEnter = () => {
      gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    if (moodsRef.current) {
      gsap.fromTo(
        moodsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
      );
    }

    fetchMoods();

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

 const fetchMoods = async (): Promise<void> => {
  console.log('Starting fetchMoods');
  try {
    const response = await fetch('https://adelhefny.app.n8n.cloud/webhook/moods');
    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('Failed to fetch moods');
      setMoods([]);
      setTodayMoodImage('');
      return;
    }

    const data: MoodData[] = await response.json();
    setMoods(data);
    console.log('Moods data set:', data);

    const todayStr = new Date().toISOString().split('T')[0];
    console.log('Today string:', todayStr);

    // Helper: normalize a stored date string into the same formatted date string
    const normalizeStoredDate = (raw: string | undefined): string | null => {
      if (!raw) return null;
      const parsed = new Date(raw);
      if (isNaN(parsed.getTime())) return null;
      return parsed.toISOString().split('T')[0];
    };

    // Find first mood whose normalized date matches today
    const todayMood = data.find((m) => {
      const normalized = normalizeStoredDate(m.date);
      // Debug logging per item (comment out if noisy)
      console.log('Raw date:', m.date, 'Normalized:', normalized);
      return normalized === todayStr;
    });

    console.log('todayMood found:', todayMood ?? 'none');

    if (todayMood && todayMood.image_url) {
      console.log('setting image to ', todayMood.image_url);
      setTodayMoodImage(todayMood.image_url);
    } else {
      // Clear if none found
      setTodayMoodImage('');
    }
  } catch (error) {
    console.error('Error fetching moods:', error);
    setMoods([]);
    setTodayMoodImage('');
  } finally {
    setLoading(false);
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('mood') as string;

    if (!description.trim()) return;

    setSubmitting(true);
    setSubmitProgress(0);
    const progressInterval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);
    try {
      const formattedDate = new Date().toISOString();
      const response = await fetch('https://adelhefny.app.n8n.cloud/webhook/mood/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: description, date: formattedDate }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedMood = Array.isArray(data) ? data[0] : data;
        // Update moods with the new data
        setMoods(prev => {
          const today = new Date(Date.now()).toISOString();
          const existingIndex = prev.findIndex(m => m.date.startsWith(today.split('T')[0]));
          if (existingIndex >= 0) {
            const newMoods = [...prev];
            newMoods[existingIndex] = updatedMood;
            return newMoods;
          } else {
            return [updatedMood, ...prev];
          }
        });
        // Update background image
        setTodayMoodImage(updatedMood.image_url);
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        console.error('Failed to submit mood');
      }
    } catch (error) {
      console.error('Error submitting mood:', error);
    } finally {
      setSubmitting(false);
      setSubmitProgress(100);
      setTimeout(() => setSubmitProgress(0), 500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-8 fade-in" style={todayMoodImage ? { backgroundImage: `url(${todayMoodImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' } : { background: 'var(--background)' }}>
      <div className="flex items-center justify-center flex-1">
        <div
          ref={formRef}
          className="w-full max-w-md card p-8 text-center fade-in"
        >
          <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>How are you feeling?</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="mood"
              type="text"
              placeholder="Enter your mood..."
              className="input"
              required
            />
            <button
              ref={buttonRef}
              type="submit"
              disabled={submitting}
              className="btn relative"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Submitting...
                </span>
              ) : (
                'Submit Mood'
              )}
              {submitting && (
                <div className="progress-bar mt-2">
                  <div className="progress-fill" style={{ width: `${submitProgress}%` }}></div>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
      <div ref={moodsRef} className="w-full max-w-4xl mx-auto mt-8 fade-in">
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: 'var(--foreground)' }}>All Moods</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner mx-auto mb-2"></div>
            <p style={{ color: 'var(--muted)' }}>Loading moods...</p>
          </div>
        ) : moods.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood) => (
              <div key={mood.row_number} className="card p-4 bounce">
                <div className="relative h-32 mb-2">
                  {mood.image_url ? (
                    <Image
                      src={mood.image_url}
                      alt={mood.description}
                      fill
                      className="object-cover rounded"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full rounded" style={{ background: 'var(--border)' }}></div>
                  )}
                </div>
                <p style={{ color: 'var(--foreground)' }} className="mb-2">{mood.description}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Average Mood: {mood.averageMood}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Total Submissions: {mood.total_submissions}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Date: {new Date(mood.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center" style={{ color: 'var(--muted)' }}>No moods submitted yet.</p>
        )}
      </div>
    </div>
  );
}
