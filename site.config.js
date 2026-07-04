const CONFIG = {
  // profile setting (required)
  profile: {
    name: "A-YO",
    image: "/avatar.png",
    role: "Frontend Developer",
    bio: "사용자 경험과 최적화를 항상 생각하며, 근거 있는 설계와 일관된 디자인 시스템으로 제품의 완성도를 높입니다.",
    email: "qutuzm@naver.com",
    linkedin: "",
    github: "eyo-25",
    instagram: "",
  },
  projects: [
    {
      name: "COCOA",
      href: "https://cocoa-sigma.vercel.app/",
    },
  ],
  // blog setting (required)
  blog: {
    title: "AyoDevlog",
    description:
      "사용자 경험, 성능 최적화, 디자인 시스템, 문서화를 깊게 고민하는 프론트엔드 개발자의 기술 블로그입니다.",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://github.com/eyo-25",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 3600, // revalidate time for [slug], index
}

module.exports = { CONFIG }
