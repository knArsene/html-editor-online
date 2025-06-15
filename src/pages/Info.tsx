
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
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["about"] = el)}
          id="about"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">About</h2>
          <p>
            Welcome to html-editor.online! This platform enables you to build, edit, and preview web projects directly in your browser. Whether you are learning, prototyping, or shipping features, html-editor.online supports you all the way—from HTML/CSS/JS to deploying projects live.
          </p>
        </section>
        {/* Blog */}
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["blog"] = el)}
          id="blog"
          className="pt-8 -mt-8"
        >
          <div className="w-full flex flex-col md:flex-row gap-0 md:gap-8 rounded-xl bg-gradient-to-br from-blue-50 via-secondary/60 to-fuchsia-50 shadow-xl border border-border overflow-hidden animate-fade-in">
            {/* Profile Image - left side */}
            <div className="md:w-2/5 flex justify-center items-center bg-gradient-to-b from-fuchsia-100/60 via-white to-blue-100/30 p-6 md:p-0">
              <img
                src="/lovable-uploads/a7e51775-73f3-4652-aa91-7b401f13bca6.png"
                alt="Kn Arsene"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg mt-4 mb-4 md:mt-8 md:mb-8"
              />
            </div>
            {/* Description - right side */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-10">
              <h2 className="text-3xl font-extrabold leading-tight mb-3 text-primary">
                Meet Kn Arsene
              </h2>
              <div className="text-muted-foreground text-base mb-3 font-medium">
                Entrepreneur, Builder, Future AI Innovator
              </div>
              <p className="text-lg text-foreground/90 mb-4">
                I’m an entrepreneur on a mission to build powerful tools, websites, and software products using AI.
                After launching multiple digital projects, I’ve realized the importance of coding in accelerating my journey—so now, I’m diving into programming to scale my ideas and grow my businesses even faster.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src="/lovable-uploads/a7e51775-73f3-4652-aa91-7b401f13bca6.png"
                  alt="Kn Arsene"
                  className="w-12 h-12 rounded-full border-2 shadow"
                />
                <div>
                  <div className="font-semibold text-md">Kn Arsene</div>
                  <div className="text-xs text-muted-foreground">
                    Digital creator & AI-first entrepreneur
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact */}
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["contact"] = el)}
          id="contact"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p>
            Have questions or feedback? Reach out to us at <a href="mailto:imbugazange@gmail.com" className="text-primary font-medium underline">imbugazange@gmail.com</a>. We love helping users and improving the platform.
          </p>
        </section>
        {/* Terms */}
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["terms"] = el)}
          id="terms"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Terms</h2>
          <p>
            By using html-editor.online, you agree to comply with our terms of service. Please use the platform responsibly and respect our community guidelines.
          </p>
        </section>
        {/* Privacy Policy */}
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["privacy"] = el)}
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
