/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogPosts, getJSONData } from "@/lib/serverUtils";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GlobeIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

export default async function Home() {
  const data = await getJSONData();
  const posts = await getBlogPosts();
  const sections = data.visual.home.sections;

  return (
    <main>
      {/* Banner Section */}
      {sections.banner && (
        <section
          id="home"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className="w-1/2 mx-auto lg:w-1/3">
              <Image
                src="/assets/profile.jpg"
                width={280}
                height={280}
                alt={data.personalInfo.name}
                priority
                className="mx-auto aspect-square overflow-hidden object-cover object-center rounded-full ring-4 ring-[#FF6342]/30"
              />
            </div>
            <div className="w-full lg:w-2/3 space-y-4">
              <div className="space-y-2">
                <p className="text-[#FF6342] font-medium">
                  {data.personalInfo.title} · {data.personalInfo.location}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  Hey, I&apos;m {data.personalInfo.name}
                </h1>
              </div>
              <p className="max-w-[600px] lg:text-lg text-gray-500 dark:text-gray-400">
                {data.personalInfo.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {data.contactInfo.github && (
                  <Link href={data.contactInfo.github} prefetch={false}>
                    <Button variant="secondary" size="icon">
                      <GitHubLogoIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {data.contactInfo.twitter && (
                  <Link href={data.contactInfo.twitter} prefetch={false}>
                    <Button variant="secondary" size="icon">
                      <TwitterLogoIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {data.contactInfo.linkedin && (
                  <Link href={data.contactInfo.linkedin} prefetch={false}>
                    <Button variant="secondary" size="icon">
                      <LinkedInLogoIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {data.contactInfo.email && (
                  <Link href={`mailto:${data.contactInfo.email}`}>
                    <Button variant="secondary" size="icon">
                      <EnvelopeClosedIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {data.contactInfo.resume && (
                  <Link href={data.contactInfo.resume} prefetch={false}>
                    <Button>
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {sections.experience && (
        <section
          id="experience"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-12">
            Work Experience
          </h2>
          <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="grid gap-1 relative">
                <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

                <h4 className="text-xl font-medium">
                  {exp.role} @
                  {exp.companyWebsite && exp.companyWebsite !== "#!" ? (
                    <Link
                      href={exp.companyWebsite}
                      className="ml-2 text-[#FF6342]"
                    >
                      {exp.company}
                    </Link>
                  ) : (
                    <span className="ml-2 text-[#FF6342]">{exp.company}</span>
                  )}
                </h4>
                <div className="text-gray-500 dark:text-gray-400">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2">
                  <h6 className="font-medium">Key Responsibilities:</h6>
                  <ul className="text-gray-500 text-sm list-disc pl-4">
                    {exp.keyResponsibilities.map((resp) => (
                      <li key={resp}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section
        id="skills"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">Skills</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {(
            [
              ["Languages & Scripting", data.skills.languages],
              ["IaC & CI/CD", data.skills.frameworks],
              ["Databases & Storage", data.skills.databases],
              ["Cloud, Containers & Tools", data.skills.tools],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <h3 className="font-medium mb-3">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      {sections.project && (
        <section
          id="projects"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-12">
            Highlighted Work
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            {data.projects.map((project) => (
              <Card key={project.title} className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 p-2 flex items-center">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    height={200}
                    width={300}
                    className="rounded-md object-cover w-full"
                  />
                </div>

                <div className="w-full lg:w-2/3">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-3">
                      {project.live_url && (
                        <Link
                          href={project.live_url}
                          prefetch={false}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm">
                            <GlobeIcon className="h-3 w-3 mr-2" />
                            Visit Site
                          </Button>
                        </Link>
                      )}
                      {project.code_repo_url && (
                        <Link
                          href={project.code_repo_url}
                          prefetch={false}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <GitHubLogoIcon className="h-3 w-3 mr-2" />
                            GitHub
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {sections.education && (
        <section
          id="education"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-12">
            Education & Certifications
          </h2>
          <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
            {data.education.map((ed) => (
              <div key={ed.id} className="grid gap-1 relative">
                <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

                <h4 className="text-xl font-medium">{ed.degree}</h4>
                <h5 className="font-medium">{ed.institution}</h5>
                <div className="text-gray-500 dark:text-gray-400">
                  {ed.startDate} - {ed.endDate}
                </div>
                <p className="mt-2 text-sm text-gray-500">{ed.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {sections.testimonial && data.testimonials.length > 0 && (
        <section
          id="testimonials"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-12">Testimonials</h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {data.testimonials.map((t) => (
              <Card className="p-6 text-left" key={t.id}>
                <blockquote className="font-medium lg:text-og">
                  &ldquo;{t.feedback}.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <Image
                      height={50}
                      width={50}
                      alt="testimonial avatar"
                      src={t.avatar}
                    />
                  </Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {t.title} @ {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {posts.length > 0 && (
        <section
          id="blogs"
          className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
        >
          <h2 className="font-bold text-3xl md:text-5xl mb-12">Blogs</h2>

          <div className="flex flex-col space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`}>
                <h3 className="text-xl md:text-3xl font-semibold">
                  {post.title}
                </h3>
                <p className="md:text-lg font-light">{post.description}</p>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  Published at: {post.publishDate}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
