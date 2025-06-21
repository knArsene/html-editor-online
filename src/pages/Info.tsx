
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield, Users, Mail, Code, Zap, Globe } from "lucide-react";

const sections = [
  { key: "about", label: "About", icon: Code },
  { key: "blog", label: "Blog", icon: Users },
  { key: "contact", label: "Contact", icon: Mail },
  { key: "privacy", label: "Privacy Policy", icon: Shield },
];

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Info: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const selected = query.get("section") || "about";
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const ref = sectionRefs.current[selected];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            HTML Editor Online
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your powerful web development playground in the browser
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-12 border-b border-border overflow-x-auto bg-card/50 rounded-t-lg p-2">
          {sections.map((s) => {
            const IconComponent = s.icon;
            return (
              <button
                key={s.key}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 -mb-2 rounded-t-md",
                  selected === s.key
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
                onClick={() => navigate(`/info?section=${s.key}`)}
                type="button"
              >
                <IconComponent className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-20">
          {/* About Section */}
          <section
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["about"] = el)}
            id="about"
            className="pt-8 -mt-8"
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">About HTML Editor Online</h2>
              </div>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  Welcome to <span className="font-semibold text-primary">html-editor.online</span> - the most powerful web development environment that runs entirely in your browser. Whether you're a beginner learning your first HTML tag or a seasoned developer prototyping your next big idea, our platform provides everything you need to create, edit, and deploy web projects instantly.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900 dark:text-blue-300">Lightning Fast</h3>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      No setup required. Start coding immediately with our instant preview system that updates in real-time as you type.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900 dark:text-green-300">Deploy Anywhere</h3>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Download your projects or deploy them live with just one click. Share your creations with the world instantly.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-secondary/30 to-accent/30 p-6 rounded-lg border mt-8">
                  <h3 className="font-semibold mb-3 text-lg">✨ Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Live preview with instant updates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Syntax highlighting & auto-completion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Single file or multi-file projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Image upload and management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Dark/Light theme support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Mobile-responsive design
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["blog"] = el)}
            id="blog"
            className="pt-8 -mt-8"
          >
            <div className="w-full flex flex-col lg:flex-row gap-0 lg:gap-8 rounded-xl bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-violet-950/30 dark:via-background dark:to-blue-950/30 shadow-xl border border-border overflow-hidden">
              {/* Profile Image - left side */}
              <div className="lg:w-2/5 flex justify-center items-center bg-gradient-to-b from-violet-100/60 via-white to-blue-100/30 dark:from-violet-900/20 dark:via-background dark:to-blue-900/20 p-6 lg:p-0">
                <img
                  src="/lovable-uploads/a7e51775-73f3-4652-aa91-7b401f13bca6.png"
                  alt="Kn Arsene"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl mt-4 mb-4 lg:mt-8 lg:mb-8"
                />
              </div>
              {/* Description - right side */}
              <div className="flex-1 flex flex-col justify-center p-6 lg:p-10">
                <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  Meet Kn Arsene
                </h2>
                <div className="text-violet-600 dark:text-violet-400 text-lg mb-4 font-semibold">
                  Entrepreneur • Builder • AI Innovator
                </div>
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  I'm an entrepreneur on a mission to build powerful tools, websites, and software products using AI. 
                  After launching multiple digital projects, I've realized the importance of coding in accelerating my journey—so now, 
                  I'm diving into programming to scale my ideas and grow my businesses even faster.
                </p>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
                  <div className="flex items-center gap-3">
                    <img
                      src="/lovable-uploads/a7e51775-73f3-4652-aa91-7b401f13bca6.png"
                      alt="Kn Arsene"
                      className="w-12 h-12 rounded-full border-2 border-violet-200 dark:border-violet-800 shadow"
                    />
                    <div>
                      <div className="font-semibold text-lg text-violet-900 dark:text-violet-200">Kn Arsene</div>
                      <div className="text-sm text-violet-600 dark:text-violet-400">
                        Digital creator & AI-first entrepreneur
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["contact"] = el)}
            id="contact"
            className="pt-8 -mt-8"
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Get in Touch</h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground/90">
                  Have questions, feedback, or need support? We'd love to hear from you! Our team is dedicated to helping you succeed with your web development projects.
                </p>
                <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 rounded-lg border border-primary/20">
                  <p className="text-foreground/90">
                    📧 Email us at <a href="mailto:imbugazange@gmail.com" className="text-primary font-semibold underline hover:text-primary/80 transition-colors">imbugazange@gmail.com</a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We typically respond within 24 hours and love helping users improve their coding experience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["privacy"] = el)}
            id="privacy"
            className="pt-8 -mt-8"
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Privacy Policy</h2>
              </div>
              
              <div className="space-y-6 text-foreground/90">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    🔒 Your privacy is our top priority. We believe in transparency and your right to control your data.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Data Collection</h3>
                    <p>We collect minimal data necessary to provide our service:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm ml-4">
                      <li>Code files and projects you create (stored locally in your browser)</li>
                      <li>Basic usage analytics to improve our platform (anonymized)</li>
                      <li>Error logs to fix bugs and improve performance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Data Storage</h3>
                    <p>Your projects are stored locally in your browser's storage. We do not store your code on our servers unless you explicitly choose to save or share your projects.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Third-Party Services</h3>
                    <p>We do not share your personal data with third parties. Any analytics data is anonymized and used solely for improving our platform.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Your Rights</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Access and download your data at any time</li>
                      <li>Delete your data by clearing your browser storage</li>
                      <li>Opt-out of analytics by using your browser's Do Not Track setting</li>
                      <li>Contact us for any privacy-related concerns</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString()} | 
                    <strong> Questions?</strong> Contact us at <a href="mailto:imbugazange@gmail.com" className="underline hover:no-underline">imbugazange@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Info;
