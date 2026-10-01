import { getJSONData } from "@/lib/serverUtils";

const siteUrl = "https://shafeeq.colorkloud.us";

export async function JsonLd() {
  const data = await getJSONData();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.personalInfo.name,
    jobTitle: data.personalInfo.title,
    description: data.personalInfo.bio,
    url: siteUrl,
    image: `${siteUrl}/assets/profile.jpg`,
    email: data.contactInfo.email,
    telephone: data.contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      data.contactInfo.linkedin,
      data.contactInfo.github,
    ].filter(Boolean),
    knowsAbout: [
      "DevOps",
      "AWS",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "CI/CD",
      "GPU infrastructure",
      "Cloudflare Workers",
      "Site Reliability Engineering",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${data.personalInfo.name} Portfolio`,
    url: siteUrl,
    description: data.personalInfo.bio,
    author: {
      "@type": "Person",
      name: data.personalInfo.name,
    },
    inLanguage: "en-US",
  };

  const projects = data.projects.map((project) => ({
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.siteDown ? siteUrl : project.live_url || siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
  }));

  const portfolio = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    itemListElement: projects.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolio) }}
      />
    </>
  );
}
