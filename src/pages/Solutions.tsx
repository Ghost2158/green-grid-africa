import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Database, Leaf, Expand, Download } from 'lucide-react';

const Solutions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const solutions = [
    {
      icon: Database,
      title: "Data-Driven Decisions",
      description: "Empowering stakeholders with actionable insights for better energy management.",
      points: [
        "Real-time energy demand analytics",
        "Predictive maintenance insights",
        "Customized reporting for NGOs and local leaders",
        "Performance optimization"
      ],
      color: "grid-yellow"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Supporting global sustainability goals through clean energy initiatives.",
      points: [
        "Alignment with UN SDG 7 (Affordable and Clean Energy)",
        "Reduced carbon footprint through renewable energy",
        "Community-focused sustainable practices",
        "Environmental impact monitoring"
      ],
      color: "grid-green"
    },
    {
      icon: Expand,
      title: "Scalability",
      description: "Flexible and adaptable solutions for growing energy needs.",
      points: [
        "Modular design for easy replication",
        "Cloud-based IoT and AI architecture",
        "Integration with mobile payments and alerts",
        "Open-source tools for community development"
      ],
      color: "grid-blue-light"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">Our </span>
                  <span className="text-grid-yellow">Solutions</span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-grid-yellow to-grid-green mx-auto rounded-full" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Innovative approaches to address Africa's energy challenges through data-driven decisions and sustainable practices.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We combine technology, community, and vision for a brighter future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div
                    key={solution.title}
                    className={`glass rounded-3xl p-8 hover:shadow-elegant transition-all duration-700 group animate-fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        solution.color === 'grid-yellow' ? 'bg-grid-yellow/20 text-grid-yellow' :
                        solution.color === 'grid-green' ? 'bg-grid-green/20 text-grid-green' :
                        'bg-grid-blue-light/30 text-white'
                      }`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-grid-yellow transition-colors duration-300">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {solution.description}
                      </p>

                      {/* Solution Points */}
                      <div className="space-y-3">
                        {solution.points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start space-x-3 text-left">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              solution.color === 'grid-yellow' ? 'bg-grid-yellow' :
                              solution.color === 'grid-green' ? 'bg-grid-green' :
                              'bg-white'
                            }`} />
                            <p className="text-gray-400 text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="glass rounded-3xl p-8 border-l-4 border-grid-yellow hover:shadow-glow transition-all duration-500">
                <h3 className="text-2xl font-bold text-grid-yellow mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To accelerate access to affordable, intelligent solar infrastructure across Africa, empowering communities with sustainable, data-driven energy solutions.
                </p>
              </div>

              {/* Vision */}
              <div className="glass rounded-3xl p-8 border-l-4 border-grid-green hover:shadow-glow transition-all duration-500">
                <h3 className="text-2xl font-bold text-grid-green mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To become Africa's leading platform for smart, clean energy management, fostering a future where every community thrives through innovation and sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Empowering People & Innovation */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Empowering People */}
              <div className="glass rounded-3xl p-8 space-y-6 hover:shadow-elegant transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,4C18.11,4 20.11,4.89 21.39,6.39C22.67,7.89 23.56,9.89 23.56,12C23.56,14.11 22.67,16.11 21.39,17.61C20.11,19.11 18.11,20 16,20H8C5.79,20 4,18.21 4,16C4,13.79 5.79,12 8,12H16C17.66,12 19,10.66 19,9C19,7.34 17.66,6 16,6H8C6.34,6 5,7.34 5,9"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-grid-yellow text-center">Empowering People</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  We put people at the heart of the energy revolution, connecting lives and powering dreams.
                </p>
              </div>

              {/* Innovative Solar Solutions */}
              <div className="glass rounded-3xl p-8 space-y-6 hover:shadow-elegant transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-grid-yellow to-grid-green rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.5,2L6,3.5L7.5,5L9,3.5L7.5,2M12.5,6L11,7.5L12.5,9L14,7.5L12.5,6M19.5,8L18,9.5L19.5,11L21,9.5L19.5,8M2.5,10L1,11.5L2.5,13L4,11.5L2.5,10M22.5,14L21,15.5L22.5,17L24,15.5L22.5,14Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-grid-green text-center">Innovative Solar Solutions</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Harnessing the sun with cutting-edge technology for a brighter, greener Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Presentation */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-12 text-center space-y-6 hover:shadow-elegant transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Download Our Presentation
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Get a detailed overview of our platform, technology, and impact. Click below to download our latest PowerPoint presentation and learn more about GreenGrid Africa's mission and solutions.
              </p>
              <div className="pt-4">
                <button className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-grid-yellow to-grid-green text-black font-semibold rounded-2xl hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Download PowerPoint</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors & Partnerships */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold text-grid-yellow">
                Our Sponsors & Partnerships
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We are currently seeking partnerships and sponsorships to accelerate our mission. If you are interested in supporting sustainable energy in Africa, please contact us!
              </p>
              <div className="border-2 border-dashed border-grid-yellow/50 rounded-2xl p-8 mt-8">
                <p className="text-grid-yellow font-medium">
                  No partnerships yet — your logo could be here!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;