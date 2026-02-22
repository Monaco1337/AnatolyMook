import { Download, Play, FileText, Headphones, ArrowRight, Sparkles } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      id: 'momentum-blueprint',
      type: 'ebook',
      icon: FileText,
      title: 'The Momentum Blueprint',
      description: 'Complete 7-stage framework for engineering breakthrough performance. 120 pages of actionable strategies, exercises, and implementation guides.',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 'signal-thinking',
      type: 'pdf',
      icon: FileText,
      title: 'Signal Thinking Cheat Sheet',
      description: 'One-page reference guide for cutting through noise and identifying what truly matters in any situation.',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'peak-state',
      type: 'audio',
      icon: Headphones,
      title: 'Peak State Meditation Series',
      description: '7 guided meditations designed to master emotional states and build mental resilience. 10-20 minutes each.',
      thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'neural-leadership',
      type: 'video',
      icon: Play,
      title: 'Neural Leadership Masterclass',
      description: '90-minute deep dive into brain-based leadership principles. Includes workbook and implementation templates.',
      thumbnail: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 'momentum-tracker',
      type: 'pdf',
      icon: FileText,
      title: 'Weekly Momentum Tracker',
      description: 'Track your progress, identify patterns, and optimize your performance systems. Printable PDF template.',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'clarity-protocol',
      type: 'video',
      icon: Play,
      title: '30-Day Clarity Challenge',
      description: 'Daily video lessons and exercises to build unshakeable focus and strategic clarity. Includes community access.',
      thumbnail: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const challenges = [
    {
      title: '7-Day Performance Reset',
      description: 'Transform your operating system in one week',
      duration: '7 days',
      participants: '10,000+'
    },
    {
      title: '30-Day Momentum Challenge',
      description: 'Build unstoppable forward progress',
      duration: '30 days',
      participants: '5,000+'
    },
    {
      title: '90-Day Breakthrough Program',
      description: 'Complete transformation in 90 days',
      duration: '90 days',
      participants: '2,000+'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-7xl font-extralight text-white mb-6 tracking-tight">
              RESOURCES
            </h1>
            <p className="text-xl lg:text-2xl text-white/60 font-light max-w-4xl mx-auto">
              Free tools, frameworks, and training to accelerate your transformation
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {resources.filter(r => r.featured).map((resource) => (
            <div
              key={resource.id}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 overflow-hidden hover:border-yellow-500/50 transition-all duration-500"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black text-xs font-light tracking-wider">
                FEATURED
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <resource.icon className="text-yellow-500" size={20} />
                  </div>
                  <h3 className="text-2xl font-light text-white">{resource.title}</h3>
                </div>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {resource.description}
                </p>
                <button className="px-6 py-3 bg-yellow-500 text-black font-light tracking-wider hover:bg-yellow-400 transition-all duration-300 flex items-center group">
                  <Download className="mr-2" size={18} />
                  DOWNLOAD FREE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.filter(r => !r.featured).map((resource) => (
            <div
              key={resource.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <resource.icon className="text-yellow-500" size={20} />
                  <span className="text-xs text-white/40 font-light uppercase tracking-wider">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-light text-white mb-2">{resource.title}</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <button className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center text-sm font-light tracking-wider">
                  DOWNLOAD
                  <ArrowRight className="ml-2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extralight text-white mb-6 tracking-tight">
              TRANSFORMATION CHALLENGES
            </h2>
            <p className="text-xl text-white/60 font-light max-w-3xl mx-auto">
              Guided programs with daily content, accountability, and community support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="text-5xl font-extralight text-yellow-500 mb-2">
                    {challenge.duration.split(' ')[0]}
                  </div>
                  <div className="text-white/40 text-sm font-light tracking-wider">
                    {challenge.duration.split(' ')[1].toUpperCase()}
                  </div>
                </div>
                <h3 className="text-2xl font-light text-white mb-3">
                  {challenge.title}
                </h3>
                <p className="text-white/70 font-light leading-relaxed mb-4">
                  {challenge.description}
                </p>
                <p className="text-white/40 text-sm font-light mb-6">
                  {challenge.participants} participants
                </p>
                <button className="w-full px-6 py-3 border border-yellow-500/50 text-yellow-500 font-light tracking-wider hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center">
                  JOIN CHALLENGE
                  <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 lg:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-8">
              <Sparkles className="text-yellow-500" size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extralight text-white mb-6 tracking-tight">
              ASK ANATOLY AI
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              Get instant answers to your performance questions. Our AI trained on Anatoly's complete methodology provides personalized guidance 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Ask a question about performance..."
                className="flex-grow px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/40 font-light focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="px-8 py-4 bg-yellow-500 text-black font-light tracking-wider hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center whitespace-nowrap">
                ASK NOW
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
            <p className="text-white/40 text-sm font-light mt-6">
              Try asking: "How do I build momentum?" or "What's signal thinking?"
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-extralight text-white mb-6 tracking-tight">
            WANT MORE?
          </h2>
          <p className="text-lg text-white/70 font-light mb-12 leading-relaxed">
            Subscribe to receive weekly insights, new resources, and exclusive invitations to live training sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/40 font-light focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="px-8 py-4 bg-white text-black font-light tracking-wider hover:bg-gray-200 transition-all duration-300 flex items-center justify-center whitespace-nowrap">
              SUBSCRIBE
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
