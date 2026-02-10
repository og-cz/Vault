import { User } from 'lucide-react';

export function AboutPage() {
  const leader = {
    name: 'Russel M. Galapin',
    role: 'Main Programmer 1',
    code: '001-A'
  };

  const teamMembers = [
    {
      name: 'Jarbie O. De Leon',
      role: 'Programmer 2',
      code: '002-B'
    },
    {
      name: 'Kashiofeya S. Adarlo',
      role: 'Designer',
      code: '003-C'
    },
    {
      name: 'Ashley A. Abante',
      role: 'Designer',
      code: '004-D'
    },
    {
      name: 'Security Systems',
      role: 'System Admin',
      code: '005-E'
    }
  ];

  return (
    <div className="bg-black min-h-screen pb-20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Header Section */}
      <section className="relative pt-12 pb-20">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-red-950/20 to-black pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-red-600 uppercase tracking-widest text-sm font-medium mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-6xl text-white mb-6 font-normal tracking-wide">
            Personnel Database
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm tracking-wide">
            Authorized Personnel Only - Clearance Level 5 Required
          </p>
        </div>
      </section>

      {/* Team Hierarchy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10">
        {/* Top Level - Leader */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-sm group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 p-8 flex flex-col items-center text-center overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-600/50"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-600/50"></div>
              
              <div className="w-24 h-24 bg-black border-2 border-red-900/50 rounded-full flex items-center justify-center mb-6 group-hover:border-red-600 transition-colors">
                <User className="w-10 h-10 text-gray-500 group-hover:text-red-600 transition-colors" />
              </div>
              
              <h3 className="text-white text-xl uppercase tracking-widest mb-1">{leader.name}</h3>
              <p className="text-red-600 text-xs uppercase tracking-wider mb-4">{leader.role}</p>
              
              <div className="w-full h-px bg-zinc-800 mb-4"></div>
              <p className="text-zinc-600 font-mono text-xs tracking-widest">ID: {leader.code}</p>
            </div>
          </div>
        </div>

        {/* Second Level - Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative bg-zinc-900/50 border border-zinc-800 p-6 flex flex-col items-center text-center overflow-hidden hover:bg-zinc-900 transition-colors">
                {/* Decorative Scan Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/50 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-linear"></div>
                
                <div className="w-16 h-16 bg-black border border-zinc-700 rounded-full flex items-center justify-center mb-4 group-hover:border-red-600/50 transition-colors">
                  <User className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
                </div>
                
                <h3 className="text-white text-sm uppercase tracking-widest mb-1">{member.name}</h3>
                <p className="text-red-600/80 text-[10px] uppercase tracking-wider mb-3">{member.role}</p>
                
                <div className="w-full bg-zinc-800/50 px-2 py-1 rounded">
                   <p className="text-zinc-600 font-mono text-[10px] tracking-widest">ID: {member.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Info Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 mb-20">
        <div className="border-l-4 border-red-600 pl-8 py-2">
            <h2 className="text-4xl text-white mb-2 font-light uppercase tracking-widest">
            VAULT Corporation
            </h2>
            <p className="text-red-600 text-sm tracking-[0.3em] uppercase mb-8">Classified Information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="prose prose-invert max-w-none text-gray-400 font-light leading-relaxed text-sm">
            <p className="mb-6">
                VAULT Corporation is a global mega-corporation in the information security sector, known for its advanced bio-metric research and surveillance technologies. Founded with the goal of advancing the security of life itself, VAULT's history is intertwined with the pursuit of absolute truth in the digital age.
            </p>
            <p>
                Leading to catastrophic consequences for those who wish to deceive, our algorithms ensure that reality remains objective. We are dedicated to the preservation of authenticity in an increasingly fabricated world.
            </p>
            </div>
            
            <div className="relative border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600"></div>
                
                <h3 className="text-red-600 uppercase tracking-widest text-xs mb-4">System Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs tracking-wide">
                        <span className="text-gray-500">Image Surveillance</span>
                        <span className="text-green-500">ONLINE</span>
                    </div>
                    <div className="flex justify-between text-xs tracking-wide">
                        <span className="text-gray-500">Neural Network</span>
                        <span className="text-green-500">ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-xs tracking-wide">
                        <span className="text-gray-500">Pattern Database</span>
                        <span className="text-green-500">SECURE</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 mt-4">
                        <div className="bg-red-600 h-full w-[85%] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Strategic Vision Roadmap (NEW) */}
      <section className="border-t border-zinc-900 py-20 relative z-10 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl text-white mb-16 uppercase tracking-widest font-light text-center"> 
                  Strategic Vision: <span className="text-red-600 font-medium">Project AURA</span>
              </h2>
              
              <div className="relative">
                  {/* Center Line */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-red-900/50 via-red-600/50 to-red-900/50"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-16">
                      {/* Item 1 - Left */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group">
                          <div className="md:w-5/12 text-left md:text-right md:pr-12 pl-12 md:pl-0 mb-4 md:mb-0 w-full">
                              <h3 className="text-red-600 text-lg uppercase tracking-widest mb-2 font-medium">Phase 1: Inception</h3>
                              <p className="text-gray-500 text-sm leading-relaxed">Establishment of core detection algorithms and global database infrastructure.</p>
                              <span className="text-[10px] text-zinc-500 font-mono mt-3 inline-block border border-zinc-800 px-2 py-1 rounded">STATUS: COMPLETED</span>
                          </div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full border-2 border-red-600 z-10 mt-1">
                              <div className="absolute inset-0 bg-red-600 rounded-full opacity-50 animate-ping"></div>
                          </div>
                          
                          <div className="md:w-5/12 md:pl-12"></div>
                      </div>

                      {/* Item 2 - Right */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group">
                          <div className="md:w-5/12 md:text-right md:pr-12 hidden md:block"></div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-black z-10 mt-1 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                          
                          <div className="md:w-5/12 text-left md:pl-12 pl-12 w-full">
                              <h3 className="text-white text-lg uppercase tracking-widest mb-2 font-medium">Phase 2: Global Image Scan</h3>
                              <p className="text-gray-500 text-sm leading-relaxed">Advanced AI-generated image pattern recognition and pixel-level fabrication detection for all uploaded media.</p>
                              <span className="text-[10px] text-green-500 font-mono mt-3 inline-block border border-green-900/30 bg-green-900/10 px-2 py-1 rounded">STATUS: ACTIVE</span>
                          </div>
                      </div>
                      
                      {/* Item 3 - Left */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group opacity-50 hover:opacity-100 transition-opacity duration-500">
                          <div className="md:w-5/12 text-left md:text-right md:pr-12 pl-12 md:pl-0 mb-4 md:mb-0 w-full">
                              <h3 className="text-gray-400 text-lg uppercase tracking-widest mb-2 font-medium">Phase 3: Integration</h3>
                              <p className="text-gray-600 text-sm leading-relaxed">Direct neural link verification for visual cortex authentication.</p>
                              <span className="text-[10px] text-zinc-600 font-mono mt-3 inline-block border border-zinc-800 px-2 py-1 rounded">STATUS: PENDING</span>
                          </div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-zinc-900 rounded-full border-2 border-zinc-700 z-10 mt-1"></div>
                          
                          <div className="md:w-5/12 md:pl-12"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}