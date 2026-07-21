import React, { useEffect, useRef, useState } from "react";
import { 
  FaTrophy, 
  FaMedal, 
  FaFutbol, 
  FaCrown, 
  FaStar, 
  FaShieldAlt, 
  FaBolt, 
  FaBullseye,
  FaMoon,
  FaSun,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

// کامپوننت پرچم واقعی آرژانتین
function ArgentinaFlag({ size = "large", className = "" }) {
  const sizes = {
    small: { width: 80, height: 53 },
    medium: { width: 150, height: 100 },
    large: { width: 240, height: 160 },
  };
  const { width, height } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* سه نوار افقی */}
      <rect width="240" height="53.33" fill="#74ACDF" />
      <rect y="53.33" width="240" height="53.33" fill="#FFFFFF" />
      <rect y="106.66" width="240" height="53.34" fill="#74ACDF" />

      {/* خورشید مِی */}
      <g transform="translate(120, 80)">
        {/* پرتوهای مستقیم (16 تا) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={`ray-${i}`} transform={`rotate(${i * 22.5})`}>
            <polygon
              points="0,-38 -3,-22 3,-22"
              fill="#F6B40E"
              stroke="#C68900"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* پرتوهای موج‌دار (16 تا بین پرتوهای مستقیم) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={`wave-${i}`} transform={`rotate(${i * 22.5 + 11.25})`}>
            <path
              d="M 0,-36 Q 2,-30 0,-24 Q -2,-18 0,-22"
              fill="none"
              stroke="#F6B40E"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* دایره مرکزی خورشید */}
        <circle r="16" fill="#F6B40E" stroke="#C68900" strokeWidth="1" />
        <circle r="12" fill="#F6B40E" />

        {/* صورت خورشید (چشم‌ها و دهان) */}
        <circle cx="-4" cy="-2" r="1.5" fill="#845100" />
        <circle cx="4" cy="-2" r="1.5" fill="#845100" />
        <path
          d="M -4,4 Q 0,6 4,4"
          fill="none"
          stroke="#845100"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function ArgentinaUltimate() {
  const [visibleSections, setVisibleSections] = useState({});
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("argentina-theme") || "dark";
    }
    return "dark";
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({
    worldCups: 0,
    copaAmerica: 0,
    finalissima: 0,
    olympics: 0,
  });
  const statsAnimated = useRef(false);

  useEffect(() => {
    localStorage.setItem("argentina-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.dataset.section;
          
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [section]: true,
            }));

            if (section === "stats" && !statsAnimated.current) {
              statsAnimated.current = true;
              animateCounters();
            }
          } else {
            setVisibleSections((prev) => ({
              ...prev,
              [section]: false,
            }));
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { worldCups: 3, copaAmerica: 15, finalissima: 2, olympics: 2 };
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 4);

      setCounters({
        worldCups: Math.round(targets.worldCups * eased),
        copaAmerica: Math.round(targets.copaAmerica * eased),
        finalissima: Math.round(targets.finalissima * eased),
        olympics: Math.round(targets.olympics * eased),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const themes = {
    dark: {
      bg: "bg-gradient-to-br from-gray-950 via-slate-900 to-black",
      text: "text-white",
      card: "bg-gray-950/90",
      border: "border-white/10",
      muted: "text-gray-400",
      accent: "text-sky-400",
    },
    light: {
      bg: "bg-gradient-to-br from-sky-50 via-white to-blue-50",
      text: "text-gray-900",
      card: "bg-white/90",
      border: "border-gray-200",
      muted: "text-gray-600",
      accent: "text-sky-600",
    },
  };

  const t = themes[theme];

  const achievements = [
    {
      title: "جام جهانی",
      count: 3,
      years: ["1978", "1986", "2022"],
      icon: <FaTrophy className="text-4xl md:text-6xl" />,
      color: "from-yellow-400 to-amber-600",
      description: "سه ستاره روی پیراهن آسمانی",
    },
    {
      title: "کوپا آمریکا",
      count: 15,
      years: ["1921", "1925", "1927", "1929", "1937", "1941", "1945", "1946", "1947", "1955", "1957", "1959", "1991", "1993", "2021"],
      icon: <FaMedal className="text-4xl md:text-6xl" />,
      color: "from-sky-400 to-blue-600",
      description: "رکورددار قهرمانی در آمریکای جنوبی",
    },
    {
      title: "فینالیسیما",
      count: 2,
      years: ["1993", "2022"],
      icon: <FaStar className="text-4xl md:text-6xl" />,
      color: "from-white to-gray-300",
      description: "قهرمان بین قهرمانان اروپا و آمریکای جنوبی",
    },
    {
      title: "المپیک",
      count: 2,
      years: ["2004", "2008"],
      icon: <FaMedal className="text-4xl md:text-6xl" />,
      color: "from-amber-400 to-orange-600",
      description: "طلای المپیک آتن و پکن",
    },
  ];

  const legends = [
    {
      name: "لیونل مسی",
      nickname: "La Pulga",
      years: "2005-اکنون",
      goals: 106,
      apps: 187,
      trophies: "جام جهانی 2022، کوپا آمریکا 2021",
      icon: <FaCrown className="text-4xl md:text-6xl" />,
      quote: "بهترین بازیکن تاریخ",
    },
    {
      name: "دیگو مارادونا",
      nickname: "El Pibe de Oro",
      years: "1977-1994",
      goals: 34,
      apps: 91,
      trophies: "جام جهانی 1986",
      icon: <FaStar className="text-4xl md:text-6xl" />,
      quote: "دست خدا و گل قرن",
    },
    {
      name: "گابریل باتیستوتا",
      nickname: "Batigol",
      years: "1991-2002",
      goals: 56,
      apps: 78,
      trophies: "کوپا آمریکا 1991 و 1993",
      icon: <FaFutbol className="text-4xl md:text-6xl" />,
      quote: "مرد گل‌های مهم",
    },
    {
      name: "خاویر ماسچرانو",
      nickname: "El Jefecito",
      years: "2003-2018",
      goals: 3,
      apps: 147,
      trophies: "نایب قهرمان جام جهانی 2014",
      icon: <FaShieldAlt className="text-4xl md:text-6xl" />,
      quote: "قلب دفاعی آرژانتین",
    },
    {
      name: "آنخل دی ماریا",
      nickname: "El Fideo",
      years: "2008-2024",
      goals: 31,
      apps: 135,
      trophies: "گل فینال جام جهانی 2022",
      icon: <FaBolt className="text-4xl md:text-6xl" />,
      quote: "مرد لحظات سرنوشت‌ساز",
    },
    {
      name: "ماریو کمپس",
      nickname: "El Matador",
      years: "1973-1982",
      goals: 19,
      apps: 43,
      trophies: "جام جهانی 1978، کفش طلا",
      icon: <FaBullseye className="text-4xl md:text-6xl" />,
      quote: "قهرمان جام جهانی 78",
    },
  ];

  const matches = [
    { year: 1952, score: "6-0", winner: "argentina", event: "دوستانه", city: "بوئنوس آیرس" },
    { year: 1962, score: "3-2", winner: "argentina", event: "دوستانه", city: "مادرید" },
    { year: 1966, score: "1-2", winner: "argentina", event: "دوستانه", city: "مادرید" },
    { year: 1980, score: "0-1", winner: "argentina", event: "دوستانه", city: "مادرید" },
    { year: 1988, score: "2-2", winner: "draw", event: "دوستانه", city: "مادرید" },
    { year: 1999, score: "2-0", winner: "argentina", event: "دوستانه", city: "والنسیا" },
    { year: 2001, score: "2-1", winner: "argentina", event: "دوستانه", city: "اویدو" },
    { year: 2014, score: "2-0", winner: "argentina", event: "دوستانه", city: "بوئنوس آیرس" },
    { year: 2018, score: "6-1", winner: "spain", event: "دوستانه", city: "مادرید" },
    { year: 2022, score: "1-0", winner: "argentina", event: "دوستانه", city: "مادرید" },
  ];

  const h2hStats = {
    total: matches.length,
    argentinaWins: matches.filter((m) => m.winner === "argentina").length,
    spainWins: matches.filter((m) => m.winner === "spain").length,
    draws: matches.filter((m) => m.winner === "draw").length,
  };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} overflow-x-hidden transition-colors duration-500`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-yellow-400 to-sky-400 transition-all duration-150 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`group relative w-12 h-12 md:w-16 md:h-16 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-white"} border-2 ${t.border} shadow-2xl hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden`}
        >
          <div className={`absolute inset-0 flex items-center justify-center text-xl md:text-2xl transition-all duration-500 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-180"}`}>
            <FaMoon />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center text-xl md:text-2xl transition-all duration-500 ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}>
            <FaSun />
          </div>
        </button>
      </div>

      {/* پس‌زمینه متحرک */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-20 left-10 w-64 md:w-96 h-64 md:h-96 ${theme === "dark" ? "bg-sky-500/20" : "bg-sky-300/30"} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 ${theme === "dark" ? "bg-yellow-500/10" : "bg-yellow-300/20"} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[600px] h-96 md:h-[600px] ${theme === "dark" ? "bg-sky-400/5" : "bg-sky-200/30"} rounded-full blur-3xl`}></div>
      </div>

      {/* Hero Section */}
      <section
        data-section="hero"
        className={`relative min-h-screen flex items-center justify-center px-4 md:px-6 transition-all duration-1000 ${
          visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative z-10 text-center max-w-5xl">
          {/* پرچم واقعی آرژانتین */}
          <div className="mb-6 md:mb-8 inline-block relative">
            <div className="absolute inset-0 bg-sky-400/30 blur-3xl animate-pulse"></div>
            <div className="relative animate-[float_3s_ease-in-out_infinite]">
              <ArgentinaFlag 
                size="large" 
                className={`mx-auto drop-shadow-[0_0_40px_rgba(56,189,248,0.6)] rounded-lg ${theme === "light" ? "drop-shadow-[0_0_40px_rgba(56,189,248,0.4)]" : ""}`}
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-4 md:mb-6">
            <span className={`bg-gradient-to-r ${theme === "dark" ? "from-sky-300 via-white to-sky-400" : "from-sky-600 via-sky-500 to-blue-600"} bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]`}>
              ARGENTINA
            </span>
          </h1>
          <p className={`text-xl md:text-2xl lg:text-3xl ${theme === "dark" ? "text-sky-300" : "text-sky-600"} font-light mb-3 md:mb-4 tracking-widest`}>
            La Albiceleste
          </p>
          <p className={`text-base md:text-lg ${t.muted} max-w-2xl mx-auto leading-relaxed px-4`}>
            سرزمین تانگو، فوتبال و اسطوره‌ها — از مارادونا تا مسی،
            <br className="hidden md:block" />
            آرژانتین همیشه در قلب تاریخ فوتبال می‌درخشد
          </p>

          <div className="mt-12 md:mt-16 animate-bounce">
            <div className={`text-3xl md:text-4xl ${t.accent}`}>↓</div>
            <p className="text-xs text-gray-500 mt-2 tracking-widest">SCROLL DOWN</p>
          </div>
        </div>
      </section>

      {/* آمار کلی دستاوردها */}
      <section
        data-section="stats"
        className={`relative py-16 md:py-24 px-4 md:px-6 transition-all duration-1000 ${
          visibleSections.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-center mb-3 md:mb-4 bg-gradient-to-r ${theme === "dark" ? "from-sky-300 via-yellow-400 to-sky-400" : "from-sky-600 via-blue-500 to-sky-600"} bg-clip-text text-transparent`}>
            افتخارات آرژانتین
          </h2>
          <p className={`text-center ${t.muted} mb-12 md:mb-16 text-base md:text-lg`}>
            پرافتخارترین تیم آمریکای جنوبی
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {achievements.map((ach, idx) => (
              <div
                key={ach.title}
                className="group relative"
                style={{
                  transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s`,
                  transform: visibleSections.stats ? "translateY(0) scale(1)" : "translateY(60px) scale(0.8)",
                  opacity: visibleSections.stats ? 1 : 0,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ach.color} blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500`}></div>
                <div className={`relative ${t.card} backdrop-blur-xl border ${t.border} rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:border-sky-400/50 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-2xl`}>
                  <div className={`mb-3 md:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 ${theme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                    {ach.icon}
                  </div>
                  <div className={`text-4xl md:text-6xl font-black bg-gradient-to-b ${theme === "dark" ? "from-white to-gray-400" : "from-gray-900 to-gray-600"} bg-clip-text text-transparent mb-2`}>
                    {ach.title === "جام جهانی" ? counters.worldCups :
                     ach.title === "کوپا آمریکا" ? counters.copaAmerica :
                     ach.title === "فینالیسیما" ? counters.finalissima :
                     counters.olympics}
                  </div>
                  <div className="text-base md:text-xl font-bold mb-1 md:mb-2">{ach.title}</div>
                  <div className={`text-xs ${t.muted} leading-relaxed hidden md:block`}>
                    {ach.description}
                  </div>
                  <div className="mt-3 md:mt-4 flex flex-wrap gap-1 justify-center">
                    {ach.years.slice(-3).map((year) => (
                      <span key={year} className={`text-xs ${theme === "dark" ? "bg-white/5" : "bg-gray-100"} px-2 py-1 rounded`}>
                        {year}
                      </span>
                    ))}
                    {ach.years.length > 3 && (
                      <span className="text-xs text-gray-500">+{ach.years.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* بازیکنان افسانه‌ای */}
      <section
        data-section="legends"
        className={`relative py-16 md:py-24 px-4 md:px-6 transition-all duration-1000 ${
          visibleSections.legends ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-center mb-3 md:mb-4 bg-gradient-to-r ${theme === "dark" ? "from-sky-300 via-white to-sky-400" : "from-sky-600 via-blue-500 to-sky-600"} bg-clip-text text-transparent`}>
            اسطوره‌های آسمانی
          </h2>
          <p className={`text-center ${t.muted} mb-12 md:mb-16 text-base md:text-lg`}>
            بازیکنانی که تاریخ فوتبال را نوشتند
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {legends.map((legend, idx) => (
              <div
                key={legend.name}
                className="group relative"
                style={{
                  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s`,
                  transform: visibleSections.legends ? "translateY(0) scale(1) rotate(0deg)" : "translateY(80px) scale(0.85) rotate(-5deg)",
                  opacity: visibleSections.legends ? 1 : 0,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-blue-700 blur-xl opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className={`relative ${t.card} backdrop-blur-xl border ${t.border} rounded-2xl md:rounded-3xl p-4 md:p-6 hover:border-sky-400/50 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl`}>
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className={`group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 ${theme === "dark" ? "text-sky-400" : "text-sky-600"}`}>
                      {legend.icon}
                    </div>
                    <div className="text-right">
                      <div className={`text-xs ${t.accent} tracking-widest`}>{legend.nickname}</div>
                      <div className="text-xs text-gray-500 mt-1">{legend.years}</div>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black mb-1">{legend.name}</h3>
                  <p className={`text-xs md:text-sm ${t.muted} italic mb-3 md:mb-4`}>"{legend.quote}"</p>

                  <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className={`${theme === "dark" ? "bg-white/5" : "bg-gray-100"} rounded-lg md:rounded-xl p-2 md:p-3`}>
                      <div className="text-xs text-gray-500">گل‌ها</div>
                      <div className={`text-xl md:text-2xl font-black ${t.accent}`}>{legend.goals}</div>
                    </div>
                    <div className={`${theme === "dark" ? "bg-white/5" : "bg-gray-100"} rounded-lg md:rounded-xl p-2 md:p-3`}>
                      <div className="text-xs text-gray-500">بازی</div>
                      <div className={`text-xl md:text-2xl font-black ${t.accent}`}>{legend.apps}</div>
                    </div>
                  </div>

                  <div className={`text-xs ${t.muted} leading-relaxed border-t ${t.border} pt-2 md:pt-3`}>
                    <FaTrophy className="inline mr-1 md:mr-2" /> {legend.trophies}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* تقابل با اسپانیا */}
      <section
        data-section="h2h"
        className={`relative py-16 md:py-24 px-4 md:px-6 transition-all duration-1000 ${
          visibleSections.h2h ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-center mb-3 md:mb-4 bg-gradient-to-r ${theme === "dark" ? "from-sky-300 via-yellow-400 to-red-400" : "from-sky-600 via-blue-500 to-red-500 text-amber-50"} bg-clip-text text-transparent`}>
            آرژانتین && اسپانیا
          </h2>
          <p className={`text-center ${t.muted} mb-8 md:mb-12 text-base md:text-lg`}>
            آمار واقعی تقابل‌های تاریخی
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            <StatBox label="کل بازی‌ها" value={h2hStats.total} color="white" theme={theme} />
            <StatBox label="برد آرژانتین" value={h2hStats.argentinaWins} color="sky" theme={theme} />
            <StatBox label="برد اسپانیا" value={h2hStats.spainWins} color="red" theme={theme} />
            <StatBox label="تساوی" value={h2hStats.draws} color="yellow" theme={theme} />
          </div>

          <div className={`${theme === "dark" ? "bg-white/5" : "bg-gray-100"} rounded-xl md:rounded-2xl p-4 md:p-6 mb-8 md:mb-12 border ${t.border}`}>
            <div className="flex justify-between text-xs md:text-sm mb-2 md:mb-3">
              <span className="text-sky-400 font-bold">آرژانتین {h2hStats.argentinaWins}</span>
              <span className="text-yellow-400 font-bold">تساوی {h2hStats.draws}</span>
              <span className="text-red-400 font-bold">اسپانیا {h2hStats.spainWins}</span>
            </div>
            <div className={`flex h-3 md:h-4 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
              <div
                className="bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-1500 ease-out"
                style={{ width: visibleSections.h2h ? `${(h2hStats.argentinaWins / h2hStats.total) * 100}%` : "0%" }}
              ></div>
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-1500 ease-out delay-200"
                style={{ width: visibleSections.h2h ? `${(h2hStats.draws / h2hStats.total) * 100}%` : "0%" }}
              ></div>
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1500 ease-out delay-400"
                style={{ width: visibleSections.h2h ? `${(h2hStats.spainWins / h2hStats.total) * 100}%` : "0%" }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            {matches.map((match, idx) => (
              <div
                key={match.year}
                className="group relative"
                style={{
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.08}s`,
                  transform: visibleSections.h2h ? "translateX(0) scale(1)" : "translateX(-80px) scale(0.9)",
                  opacity: visibleSections.h2h ? 1 : 0,
                }}
              >
                <div className={`${t.card} backdrop-blur-xl border rounded-xl md:rounded-2xl p-3 md:p-4 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl ${
                  match.winner === "argentina" ? "border-sky-500/30 hover:border-sky-400" :
                  match.winner === "spain" ? "border-red-500/30 hover:border-red-400" :
                  "border-yellow-500/30 hover:border-yellow-400"
                }`}>
                  <div className="flex items-center justify-between flex-wrap gap-2 md:gap-3">
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="text-lg md:text-2xl font-black text-yellow-400 w-12 md:w-16 flex items-center gap-1 md:gap-2">
                        <FaCalendarAlt className="text-xs md:text-sm" />
                        {match.year}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{match.event}</div>
                        <div className={`text-xs md:text-sm ${t.muted} flex items-center gap-1`}>
                          <FaMapMarkerAlt className="text-xs" /> {match.city}
                        </div>
                      </div>
                    </div>

                    <div className="text-xl md:text-3xl font-black">
                      <span className={match.winner === "argentina" ? "text-sky-400" : "text-gray-400"}>ARG</span>
                      <span className="text-gray-600 mx-1 md:mx-2">{match.score}</span>
                      <span className={match.winner === "spain" ? "text-red-400" : "text-gray-400"}>ESP</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className={`text-center text-xs ${theme === "dark" ? "text-gray-600" : "text-gray-500"} mt-6 md:mt-8 italic`}>
            * آمار بر اساس داده‌های تاریخی RSSSF و فیفا — تا سال 2024
          </p>
        </div>
      </section>

      {/* Footer با پرچم آرژانتین */}
      <section className="relative py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="mb-4 inline-block relative">
          <div className="absolute inset-0 bg-sky-400/20 blur-2xl animate-pulse"></div>
          <div className="relative">
            <ArgentinaFlag size="medium" className="mx-auto drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] rounded-lg" />
          </div>
        </div>
        <p className={`text-xl md:text-2xl font-light ${theme === "dark" ? "text-sky-300" : "text-sky-600"} mb-2`}>
          ¡Vamos Argentina!
        </p>
        <p className="text-xs md:text-sm text-gray-500">
          ساخته شده با ❤️ برای طرفداران آلبی‌سلسته
        </p>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}

function StatBox({ label, value, color, theme }) {
  const colors = {
    white: theme === "dark" ? "from-white/10 to-white/5 text-white border-white/20" : "from-gray-100 to-gray-50 text-gray-900 border-gray-200",
    sky: "from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/30",
    red: "from-red-500/20 to-red-500/5 text-red-400 border-red-500/30",
    yellow: "from-yellow-500/20 to-yellow-500/5 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl md:rounded-2xl p-3 md:p-4 text-center hover:scale-105 md:hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-xl`}>
      <div className="text-2xl md:text-4xl font-black mb-1">{value}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}