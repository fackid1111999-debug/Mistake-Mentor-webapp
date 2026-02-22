import React from 'react';
import { 
  MapPin, 
  Send, 
  BookOpen, 
  Code, 
  Rocket, 
  Heart, 
  Globe,
  ExternalLink,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12 space-y-16"
    >
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold tracking-wide uppercase">
          Namaste! 👋
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          I'm <span className="text-emerald-600 dark:text-emerald-500">Sachin Bharti</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A Commerce student, self-taught Web Developer, and tech visionary based in Ghaziabad, India.
        </p>
        <div className="flex items-center justify-center gap-4 text-zinc-500 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>Ghaziabad, India</span>
          </div>
          <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Send className="w-4 h-4" />
            <span>@GEOMETRY13G</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-6">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold dark:text-zinc-100">Developing for Bharat</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I believe that skills are the backbone of a developing nation. My goal is to use my technical expertise to build tools that empower our country and provide accessible learning for everyone.
          </p>
        </div>
        <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden">
          <img 
            src="https://picsum.photos/seed/bharat/800/800" 
            alt="Developing for Bharat" 
            className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold dark:text-zinc-100">Core Philosophy</h2>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="bg-zinc-900 dark:bg-zinc-900/50 text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group border border-zinc-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-emerald-500/20 transition-colors" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Mission
              </div>
              <h3 className="text-2xl font-bold">Mistake Mentor</h3>
            </div>
            
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              Finding errors shouldn’t be stressful. Mistake Mentor is a safe digital space where you can check your work without feeling judged. We use smart AI to help you find mistakes and understand how to fix them, so you can learn and grow with every click.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Empathy
                </h4>
                <p className="text-sm text-zinc-500">AI that understands the struggle of learning and provides encouraging feedback.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                  <Code className="w-4 h-4" /> Precision
                </h4>
                <p className="text-sm text-zinc-500">Advanced algorithms to pinpoint errors in code, math, and logic with high accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-zinc-100">
            <GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            Education
          </h2>
          <div className="space-y-4">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-lg dark:text-zinc-100">Intermediate (Commerce)</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Dr. K. N. Modi Science and Commerce College</p>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                My background in commerce helps me understand the "business" side of tech—marketing, finance, and scaling a product.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-zinc-100">
            <Briefcase className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Web Development', 'UI/UX Design', 'AI Integration', 'Product Scaling', 'Digital Marketing', 'Commerce Strategy', 'Automation'].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the Code */}
      <section className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2.5rem] p-8 sm:p-12 space-y-8 border border-emerald-100 dark:border-emerald-900/20">
        <h2 className="text-3xl font-bold dark:text-zinc-100">Beyond the Code</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
              <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold dark:text-zinc-100">AI Trends</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Exploring the latest in AI and Automation to stay ahead.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
              <Rocket className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold dark:text-zinc-100">Scaling</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Learning how to scale digital products for the Indian market.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
              <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h4 className="font-bold dark:text-zinc-100">Networking</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Connecting with fellow developers to exchange ideas.</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center py-12 space-y-6">
        <h2 className="text-3xl font-bold dark:text-zinc-100">Let’s Connect!</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          I’m always open to collaborations or discussions about the future of EdTech in India.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://t.me/GEOMETRY13G" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Send className="w-5 h-5" />
            Message on Telegram
          </a>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            Back to Top
          </button>
        </div>
      </section>
    </motion.div>
  );
}
