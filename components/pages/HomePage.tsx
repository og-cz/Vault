import { ArrowRight, Shield, CheckCircle2, Zap, Globe, Lock, Eye, Cpu, ScanLine, FileSearch } from 'lucide-react';
import type { Page } from '../../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="text-red-600 uppercase tracking-widest text-xs md:text-sm font-medium">
                Multimedia Artificial Detection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight font-light leading-tight">
              "Our business is <br />
              <span className="text-red-600 font-normal">security</span> of life itself..."
            </h1>
            
            <p className="mb-12 text-gray-400 text-lg max-w-xl font-light leading-relaxed">
              Verify the authenticity of digital media with ease. Detect content and uncover the truth behind every file.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => onNavigate('upload')}
                className="bg-red-600 text-white px-8 py-4 hover:bg-red-700 transition-colors flex items-center gap-2 uppercase text-xs md:text-sm tracking-widest font-medium"
              >
                Upload Image
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="border border-red-900/50 text-red-600 px-8 py-4 hover:border-red-600 transition-colors uppercase text-xs md:text-sm tracking-widest font-medium"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Operations / Statistics Section */}
      <section className="bg-zinc-900/20 border-y border-red-900/20 py-20 relative overflow-hidden">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-red-600 animate-pulse" />
                    <h2 className="text-2xl text-white uppercase tracking-widest font-light">Global Operations</h2>
                  </div>
                  <p className="text-gray-400 mb-8 font-light leading-relaxed max-w-xl">
                      VAULT systems are currently monitoring digital traffic across 142 countries. Our neural networks process petabytes of data daily to ensure global authenticity and neutralize digital deception.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      <div className="border-l border-red-900/30 pl-4">
                          <div className="text-3xl text-white font-light mb-1">1.2M+</div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Daily Scans</div>
                      </div>
                      <div className="border-l border-red-900/30 pl-4">
                          <div className="text-3xl text-white font-light mb-1">99.9%</div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Accuracy Rate</div>
                      </div>
                      <div className="border-l border-red-900/30 pl-4">
                          <div className="text-3xl text-white font-light mb-1">0%</div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Compromise</div>
                      </div>
                  </div>
              </div>
              
              {/* Visual Element - Radar */}
              <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 border border-red-900/20 rounded-full flex items-center justify-center">
                      {/* Spinning Outer Ring */}
                      <div className="absolute inset-0 border-t border-red-600/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
                      {/* Spinning Inner Ring */}
                      <div className="absolute inset-4 border-r border-red-600/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                      {/* Static Crosshairs */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-full h-px bg-red-900"></div>
                          <div className="h-full w-px bg-red-900 absolute"></div>
                      </div>
                      {/* Pulse Center */}
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                      
                      <div className="absolute bottom-8 right-8 text-[10px] text-red-600 font-mono uppercase tracking-widest">
                        System Status: <span className="text-white">Active</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE / METHODOLOGY (NEW) */}
      <section className="bg-black py-20 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 border-l-4 border-red-600 pl-6">
                <h2 className="text-3xl text-white uppercase tracking-widest font-light mb-2">System Architecture</h2>
                <p className="text-gray-500 text-sm tracking-wide">Technical specifications of the MADE detection protocol.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Method 1: CNN */}
                <div className="group relative bg-zinc-900/30 border border-zinc-800 p-8 hover:bg-zinc-900/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Cpu className="w-8 h-8 text-red-900 group-hover:text-red-600 transition-colors" />
                    </div>
                    <h3 className="text-red-600 text-sm uppercase tracking-widest mb-4 font-bold">Neural Core</h3>
                    <h4 className="text-white text-xl mb-3">CNN Pattern Recognition</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        Advanced machine learning models trained on GAN and Diffusion outputs. Our Convolutional Neural Networks detect microscopic noise patterns invisible to the human eye, distinguishing between natural sensor noise and algorithmic generation artifacts (Wang et al., 2021).
                    </p>
                    <div className="w-full bg-zinc-800 h-px"></div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                        <span className="text-green-500">●</span> STATUS: DEPLOYED
                    </div>
                </div>

                {/* Method 2: ELA */}
                <div className="group relative bg-zinc-900/30 border border-zinc-800 p-8 hover:bg-zinc-900/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <ScanLine className="w-8 h-8 text-red-900 group-hover:text-red-600 transition-colors" />
                    </div>
                    <h3 className="text-red-600 text-sm uppercase tracking-widest mb-4 font-bold">Compression Analysis</h3>
                    <h4 className="text-white text-xl mb-3">Error Level Analysis (ELA)</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        Synthetic images often lack natural JPEG inconsistencies. ELA highlights altered regions by analyzing compression levels, identifying artificially smooth textures that betray generative modification (Zou et al., 2025; Li & Wang, 2023).
                    </p>
                    <div className="w-full bg-zinc-800 h-px"></div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                        <span className="text-green-500">●</span> STATUS: DEPLOYED
                    </div>
                </div>

                {/* Method 3: Metadata */}
                <div className="group relative bg-zinc-900/30 border border-zinc-800 p-8 hover:bg-zinc-900/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <FileSearch className="w-8 h-8 text-red-900 group-hover:text-red-600 transition-colors" />
                    </div>
                    <h3 className="text-red-600 text-sm uppercase tracking-widest mb-4 font-bold">Digital Forensics</h3>
                    <h4 className="text-white text-xl mb-3">Metadata Verification</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        Extraction and cross-referencing of EXIF data. AI-generated content frequently lacks authentic camera signatures, lens info, and GPS tags. Absence of these footprints is a primary indicator of fabrication (Xu & Zhao, 2020).
                    </p>
                    <div className="w-full bg-zinc-800 h-px"></div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                        <span className="text-green-500">●</span> STATUS: DEPLOYED
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* R&D Teaser Section */}
      <section className="bg-gradient-to-r from-zinc-900 to-black py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div>
                    <h2 className="text-2xl text-white uppercase tracking-widest font-light mb-2">Future Research</h2>
                    <p className="text-gray-500 text-sm">Upcoming technologies from our R&D Division</p>
                </div>
                <button onClick={() => onNavigate('about')} className="text-red-600 hover:text-white transition-colors text-sm uppercase tracking-widest mt-4 md:mt-0 flex items-center gap-2">
                    View Roadmap <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 border border-zinc-800 p-6 flex items-start gap-4 hover:bg-zinc-900 transition-colors cursor-default">
                    <div className="p-3 bg-red-900/10 rounded border border-red-900/30">
                        <Lock className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white text-sm uppercase tracking-wider">Project: MIRROR</h3>
                            <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-900/50">CLASSIFIED</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Quantum image analysis designed to identify steganographic data hidden within standard image formats.
                        </p>
                    </div>
                </div>
                
                <div className="bg-black/50 border border-zinc-800 p-6 flex items-start gap-4 hover:bg-zinc-900 transition-colors cursor-default">
                    <div className="p-3 bg-red-900/10 rounded border border-red-900/30">
                        <Eye className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white text-sm uppercase tracking-wider">Project: OCULUS</h3>
                            <span className="text-[10px] bg-zinc-800 text-gray-400 px-2 py-0.5 rounded border border-zinc-700">IN DEVELOPMENT</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Retinal scanning integration for biometric user verification across decentralized networks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-red-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black"></div>
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at center, rgba(220, 38, 38, 0.15) 0%, transparent 70%)`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-6 uppercase tracking-widest font-light">
            Ready to upload your images?
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto font-light">
            Upload your images and get instant verification results to detect fabricated or AI-generated content.
          </p>
          <button 
            onClick={() => onNavigate('upload')}
            className="bg-red-600 text-white px-10 py-4 hover:bg-red-700 transition-colors inline-flex items-center gap-2 uppercase text-sm tracking-widest font-medium shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]"
          >
            Upload Image
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}