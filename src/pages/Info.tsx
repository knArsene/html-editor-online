
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const sections = [
  { key: "about", label: "About" },
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
  { key: "terms", label: "Terms" },
  { key: "privacy", label: "Privacy Policy" },
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex gap-2 sm:gap-4 mb-8 border-b border-border overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.key}
            className={cn(
              "px-2 sm:px-4 py-3 font-medium transition-colors border-b-2 -mb-px",
              selected === s.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => navigate(`/info?section=${s.key}`)}
            type="button"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {/* About */}
        <section
          ref={(el) => (sectionRefs.current["about"] = el)}
          id="about"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">About</h2>
          <p>
            Welcome to the Web IDE! This platform enables you to build, edit, and preview web projects directly in your browser. Whether you are learning, prototyping, or shipping features, our IDE supports you all the way—from HTML/CSS/JS to deploying projects live.
          </p>
        </section>
        {/* Blog */}
        <section
          ref={(el) => (sectionRefs.current["blog"] = el)}
          id="blog"
          className="pt-8 -mt-8"
        >
          <div
            className="
              rounded-xl bg-gradient-to-br from-card via-secondary/60 to-muted/60 
              shadow-xl border border-border p-0 sm:p-0 
              overflow-hidden
              animate-fade-in
            "
          >
            <div className="flex flex-col md:flex-row">
              {/* Blog Cover Image */}
              <div className="md:w-1/2 w-full min-h-[220px] md:min-h-[320px] bg-muted-foreground/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=480&q=80"
                  alt="A futuristic workspace"
                  className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none w-full h-full max-h-[320px] transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Article content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-2 text-primary">
                    Unlocking Creativity with Modern Web Development
                  </h2>
                  <div className="text-muted-foreground text-sm mb-2">
                    By <span className="font-semibold">Aria Bennett</span> • June 15, 2025
                  </div>
                  <p className="text-lg text-foreground/90 mb-6">
                    Discover how intuitive tools, AI-assistance, and modern design empower everyone to bring their ideas to life on the open web. Whether you’re a beginner or seasoned creator, harness the newest workflows and build something extraordinary.
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Author avatar"
                    className="w-12 h-12 rounded-full border shadow"
                  />
                  <div>
                    <div className="font-semibold text-md">Aria Bennett</div>
                    <div className="text-xs text-muted-foreground">
                      Frontend developer & tech educator.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Highlight line */}
            <div className="h-2 bg-gradient-to-r from-fuchsia-400 via-blue-300 to-green-300 w-full mt-0"></div>
            {/* About the Author */}
            <div className="bg-muted/60 px-6 py-4 flex items-center gap-4 border-t border-border">
              <div className="hidden sm:block">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Aria Bennett author image"
                  className="w-16 h-16 rounded-full border-2 shadow"
                />
              </div>
              <div>
                <div className="font-bold text-primary text-lg">Aria Bennett</div>
                <div className="text-sm text-muted-foreground">
                  Aria helps people launch amazing web projects by sharing accessible guides and tips. Passionate about design systems, AI coding assistants, and empowering the next wave of makers.
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact */}
        <section
          ref={(el) => (sectionRefs.current["contact"] = el)}
          id="contact"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p>
            Have questions or feedback? Reach out to us at support@webide.com. We love helping users and improving the platform.
          </p>
        </section>
        {/* Terms */}
        <section
          ref={(el) => (sectionRefs.current["terms"] = el)}
          id="terms"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Terms</h2>
          <p>
            By using Web IDE, you agree to comply with our terms of service. Please use the platform responsibly and respect our community guidelines.
          </p>
        </section>
        {/* Privacy Policy */}
        <section
          ref={(el) => (sectionRefs.current["privacy"] = el)}
          id="privacy"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Privacy Policy</h2>
          <p>
            We respect your privacy and only collect necessary data to enhance your experience. No personal data is shared with third parties. Refer to our full privacy policy for details.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Info;
