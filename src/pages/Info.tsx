
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
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["about"] = el)}
          id="about"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">About</h2>
          <p>
            Welcome to the Web IDE! This platform enables you to build, edit, and preview web projects directly in your browser. Whether you are learning, prototyping, or shipping features, our IDE supports you all the way—from HTML/CSS/JS to deploying projects live.
          </p>
        </section>
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["blog"] = el)}
          id="blog"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Blog</h2>
          <p>
            Stay tuned for product updates, best practices, use-cases, and user spotlights. Our blog is coming soon!
          </p>
        </section>
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["contact"] = el)}
          id="contact"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p>
            Have questions or feedback? Reach out to us at support@webide.com. We love helping users and improving the platform.
          </p>
        </section>
        <section
          ref={(el: HTMLDivElement | null) => (sectionRefs.current["terms"] = el)}
          id="terms"
          className="pt-8 -mt-8"
        >
          <h2 className="text-2xl font-bold mb-3">Terms</h2>
          <p>
            By using Web IDE, you agree to comply with our terms of service. Please use the platform responsibly and respect our community guidelines.
          </p>
        </section>
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

