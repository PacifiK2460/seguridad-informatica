import { Avatar, Badge, Box, Button, Callout, Card, Code, DataList, Em, Flex, Grid, Heading, IconButton, Inset, Quote, Separator, Spinner, Strong, Tabs, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import BG from "@/public/bg.jpg";
import ThemeButton from "./components/ThemeButton";
import Form from "next/form";

import {
  ConsultlyLogo,
} from "@/images/logos";

import { GitHubIcon, LinkedInIcon, CibCisco, LogosMicrosoftIcon } from "@/app/components/icons";
import { CopyIcon, EnvelopeClosedIcon, ExternalLinkIcon, GlobeIcon, InfoCircledIcon, LightningBoltIcon, MobileIcon } from "@radix-ui/react-icons";
import ContactForm from "./components/ContactForm";

const _RESUME_DATA = {
  name: "Santiago de la cruz Martinez Lara",
  initials: "SL",
  location: "San Luis Potosí, México",
  locationLink: "https://www.google.com/maps/place/san-luis-potosi",
  about: {
    en: "Retired competitive programmer. Software Engineer, Full Stack Developer. Keen on attention to details.",
    es: "Programador competitivo retirado. Ingeniero de Software, Desarrollador Full Stack. Detallista.",
  },

  summary: {
    en:
      "Experienced in Java, Linux, NextJS (Typescript), Python, C/C++, and I am always eager to learn new skills and explore new domains. I love to solve problems and help others with my coding abilities, which helps me ensure the quality and accuracy of my work. I am looking for opportunities to collaborate with other passionate developers and create innovative and impactful solutions.",
    es:
      "Experiencia en Java, Linux, NextJS (Typescript), Python, C/C++, y siempre estoy ansioso por aprender nuevas habilidades y explorar nuevos dominios. Me encanta resolver problemas y ayudar a otros con mis habilidades de codificación, lo que me ayuda a garantizar la calidad y precisión de mi trabajo. Estoy buscando oportunidades para colaborar con otros desarrolladores apasionados y crear soluciones innovadoras e impactantes.",
  },
  avatarUrl: "https://avatars.githubusercontent.com/u/42554588?v=4",
  personalWebsiteUrl: "https://santiago-lara.dev",
  contact: {
    email: "me@santiago-lara.dev",
    tel: "+524441530136",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/PacifiK2460",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/santiago-martinez-lara/",
        icon: LinkedInIcon,
      },
      // {
      //   name: "X",
      //   url: "https://x.com/BartoszJarocki",
      //   icon: XIcon,
      // },
    ],
  },
  competitions: [
    {
      en:
        "International Olympiad in Informatics",
      es:
        "Olimpiada Internacional de Informática",
    },
    {
      en:
        "Mexican Informatics Olympiad",
      es:
        "Olimpiada Mexicana de Informática",
    }
  ],
  education: [
    {
      school: "Universidad Politécnica de San Luis Potosí",
      degree: "Bachelors of Science in Computer Science and Information Technology",
      start: "2021",
      end: "Present",
    },
  ],
  work: [
    {
      company: "Carrocerías Plus",
      link: "https://carroceriasplus.com.mx",
      badges: [],
      title: "Information Technology Support Engineer",
      logo: ConsultlyLogo,
      start: "2018",
      end: "2022",
      description:
        "Leading the development of the web site, critical business servers & services. Technologies: React, TypeScript, Node.js",
    }, {
      company: "ABB Technologies",
      link: "https://new.abb.com/mx",
      badges: [],
      title: "Information System Continuous Improvement Engineer",
      logo: ConsultlyLogo,
      start: "2025",
      end: "Present",
      description:
        "Leading the development of critical businessservices. Technologies: Microsoft Power Plataform, Git, React",
    },
  ],
  skills: [
    "Java",
    "TypeScript",
    "React/Next.js",
    "C/C++", "Python", "Linux", "Software Developer", "English", "Spanish",
  ],
  projects: [
    {
      title: "Carrocerías Plus Site",
      techStack: [
        "Full Stack Developer",
        "TypeScript",
        "React",
        "Node.js",
      ],
      description:
        "The oficial site for the Carrocerías Plus Business",
      link: "https://carroceriasplus.com.mx/",
      repo: undefined
    },
    // {
    //   title: "The Hype Company (Demo Site)",
    //   techStack: [
    //     "Full Stack Developer",
    //     "TypeScript",
    //     "React",
    //     "Node.js",
    //   ],
    //   description:
    //     "A demo store for a StreetWear Company: The Hype Company",
    //   link: "https://streetwear.santiago-lara.dev/",
    //   repo: "https://streetwear.santiago-lara.dev/"
    // },
  ],
  certifications: [
    {
      title: "introduction to Data Science",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "October 13, 2023",
      credentialURL: "https://www.credly.com/badges/714afb20-ff7b-4abd-8dc7-f3bd265e1a95/linked_in_profile",
    },
    {
      title: "Cisco Certified Support Technician Cybersecurity [CCST Cybersecurity]",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "April 19, 2023",
      credentialURL: "https://www.credly.com/badges/5f7cf963-35cf-4884-965e-4584c263ec20/linked_in_profile",
    },
    {
      title: "Cyber Threat Management",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "January 09, 2023",
      credentialURL: "https://www.credly.com/badges/f5f5ebb3-5672-4245-92b6-e6364e822cf7/linked_in_profile"
    },
    {
      title: "IT Specialist - Cybersecurity",
      issuer: "Certiport",
      issuerIcon: LightningBoltIcon,
      issueDate: "January 20, 2023",
      credentialURL: "https://www.credly.com/badges/beca4002-b9be-4bc3-aa48-1dcb90116910/linked_in_profile"
    },
    {
      title: "Network Defense",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "December 18, 2022",
      credentialURL: "https://www.credly.com/badges/729ff8b7-4a8f-4d87-9671-7a5a83a9a603/linked_in_profile"
    },
    {
      title: "Endpoint Security",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "November 06, 2022",
      credentialURL: "https://www.credly.com/badges/7948a946-4542-422e-bfa0-36859ead44c2/linked_in_profile"
    },
    {
      title: "Networking Basics",
      issuer: "Cisco",
      issuerIcon: CibCisco,
      issueDate: "September 30, 2022",
      credentialURL: "https://www.credly.com/badges/1bdeee86-d75a-4bf0-8db9-7a2ca227a314/linked_in_profile"
    },
    {
      title: "Microsoft Office Specialist: Associate (Office 2019)",
      issuer: "Microsoft",
      issuerIcon: LogosMicrosoftIcon,
      issueDate: "November 19, 2021",
      credentialURL: "https://www.credly.com/badges/61f9ef22-8486-40b1-a295-f83edf79aaf0/linked_in_profile"
    },
    {
      title: "Microsoft Office Specialist: Excel Associate (Office 2019)",
      issuer: "Microsoft",
      issuerIcon: LogosMicrosoftIcon,
      issueDate: "November 19, 2021",
      credentialURL: "https://www.credly.com/badges/9fab7720-e11e-4e87-980a-d74f1bd4dedf/linked_in_profile"
    },
    {
      title: "Microsoft Office Specialist: Word Associate (Office 2019)",
      issuer: "Microsoft",
      issuerIcon: LogosMicrosoftIcon,
      issueDate: "October 15, 2021",
      credentialURL: "https://www.credly.com/badges/16a1d92d-2436-447d-9cbb-b3d931af2d27/linked_in_profile"
    },
    {
      title: "Microsoft Office Specialist: PowerPoint Associate (Office 2019)",
      issuer: "Microsoft",
      issuerIcon: LogosMicrosoftIcon,
      issueDate: "September 24, 2021",
      credentialURL: "https://www.credly.com/badges/cc61d3b6-b2c3-4de3-9799-6f25bbcdeff6/linked_in_profile"
    }
  ]
};

// Define Projects type
export type ResumeData = typeof _RESUME_DATA.projects[0];

const user_repos = await fetch("https://api.github.com/users/PacifiK2460/repos", {
  cache: "no-cache",
});
const user_repos_json = await user_repos.json();
const user_repos_with_cv_in_topics = user_repos_json.filter((repo: any) => repo.topics.includes("cv"));
const repos: ResumeData[] = user_repos_with_cv_in_topics.map((repo: any) => ({
  title: repo.name,
  techStack: repo.topics,
  description: repo.description,
  link: repo.homepage,
  repo: repo.html_url,
}));

_RESUME_DATA.projects.push(...repos);

const RESUME_DATA = _RESUME_DATA;

export default function Home() {


  return (
    <Flex direction="column">
      <Grid columns={
        {
          initial: "1",
          lg: "2",
        }
      } gap="5" align="center" justify="between" className="min-h-screen lg:h-screen" px={{
        initial: "0",
        lg: "5",
      }} py={{
        initial: "0",
        lg: "5",
      }}>
        <Flex style={{ position: 'relative' }} className="h-screen lg:h-full overflow-hidden">
          <Image
            src={BG}
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
          />

          <Flex direction="column" justify="end" style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
          >
            <Inset>
              <Card className="border-0">
                <Flex direction="column" >
                  <Grid columns={
                    {
                      initial: "1",
                      sm: "2",
                    }
                  } align="center" gap="2" justify="center">
                    <Flex direction="column" gap="1">
                      <Heading size="8" weight="bold" wrap="pretty">
                        <Em>
                          Martinez Lara<wbr /> Santiago de la cruz
                        </Em>
                      </Heading>
                      <Text size="4">
                        <Text weight="light">aka</Text> <Quote>Lara</Quote>
                      </Text>
                    </Flex>
                    <Flex direction="column" gap="1" align={
                      {
                        initial: "start",
                        sm: "end",
                      }
                    }>
                      <Text size="3" weight="bold">
                        Universidad Politécnica de San Luis Potosí
                      </Text>
                      <Flex gap="2" align="center">
                        <Text size="3" weight="light">
                          CNO V - Seguridad Informática
                        </Text>
                        <Separator orientation="vertical" />
                        <Text size="3" weight="light">
                          9° Semestre
                        </Text>
                      </Flex>
                    </Flex>
                  </Grid>
                  <Flex justify="end" align="center" >
                    <ThemeButton variant="ghost"/>
                  </Flex>
                </Flex>
              </Card>
            </Inset>
          </Flex>
        </Flex>

        <Flex className="h-full min-w-full w-full lg:min-h-0" justify="start" align="stretch" direction="column" px={{
          initial: "5",
          lg: "0",
        }}>
          <Tabs.Root defaultValue="intro">
            <Tabs.List>
              <Tabs.Trigger value="intro">Intro</Tabs.Trigger>
              <Tabs.Trigger value="lara">Lara</Tabs.Trigger>
              <Tabs.Trigger value="nerd">Nerd Insights</Tabs.Trigger>
              <Tabs.Trigger value="contact">Get In Touch</Tabs.Trigger>
            </Tabs.List>


            <Box pt="3">
              <Tabs.Content value="intro">
                <Flex my="5" direction="column" gap="3">
                  <Heading as="h2">
                    Proposito
                  </Heading>
                  <Text>
                    {/* // Proposito de la pagina */}

                    El propósito de esta página es servir como un portafolio digital que documenta mi aprendizaje y progreso en el campo de la seguridad informática. A través de este sitio, comparto mis proyectos, experiencias y conocimientos adquiridos durante mi formación académica y práctica en este ámbito.
                  </Text>

                  <Heading as="h2">
                    Enfoque
                  </Heading>
                  <Text>
                    {/* // seguridad informática, pruebas de penetración, análisis de vulnerabilidades */}
                    El enfoque principal de este portafolio está en la seguridad informática, incluyendo áreas como pruebas de penetración y análisis de vulnerabilidades. A través de mis proyectos y experiencias documentadas aquí, demuestro mi capacidad para identificar y mitigar riesgos de seguridad en sistemas informáticos, así como mi compromiso con las mejores prácticas en ciberseguridad.
                  </Text>

                  <Heading as="h2">
                    Importancia
                  </Heading>
                  <Text>
                    {/* // Importancia del portafolio como evidencia del proceso de aprendizaje. */}
                    Este portafolio no solo muestra mis habilidades y conocimientos, sino que también sirve como evidencia tangible de mi proceso de aprendizaje y desarrollo profesional en el campo de la seguridad informática.
                  </Text>

                </Flex>
              </Tabs.Content>

              <Tabs.Content value="lara">
                <section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                      <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
                      <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
                        {RESUME_DATA.about["en"]}
                      </p>
                      <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
                        <a
                          className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                          href={RESUME_DATA.locationLink}
                          target="_blank"
                        >
                          <GlobeIcon className="size-3" />
                          {RESUME_DATA.location}
                        </a>
                      </p>
                      <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                        {RESUME_DATA.contact.email ? (
                          <Button
                            className="size-8"
                            variant="outline"
                            // size="icon"
                            asChild
                          >
                            <a href={`mailto:${RESUME_DATA.contact.email}`}>
                              <EnvelopeClosedIcon className="size-4" />
                            </a>
                          </Button>
                        ) : null}
                        {RESUME_DATA.contact.tel ? (
                          <Button
                            className="size-8"
                            variant="outline"
                            // size="icon"
                            asChild
                          >
                            <a href={`tel:${RESUME_DATA.contact.tel}`}>
                              <MobileIcon className="size-4" />
                            </a>
                          </Button>
                        ) : null}
                        {RESUME_DATA.contact.social.map((social) => (
                          <Button
                            key={social.name}
                            className="size-8"
                            variant="outline"
                            // size="icon"
                            asChild
                          >
                            <a href={social.url}>
                              <social.icon className="size-4" />
                            </a>
                          </Button>
                        ))}
                      </div>
                      <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px]">
                        {RESUME_DATA.contact.email ? (
                          <a href={`mailto:${RESUME_DATA.contact.email}`} key={RESUME_DATA.contact.email}>
                            <span className="underline">{RESUME_DATA.contact.email}</span>
                          </a>
                        ) : null}
                        {RESUME_DATA.contact.tel ? (
                          <a href={`tel:${RESUME_DATA.contact.tel}`} key={RESUME_DATA.contact.tel}>
                            <span className="underline">{RESUME_DATA.contact.tel}</span>
                          </a>
                        ) : null}
                        {RESUME_DATA.contact.social.map((social) => (
                          <a href={`${social.url}`} key={social.url}>
                            <span className="underline">{social.url}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <Avatar className="size-28" src={RESUME_DATA.avatarUrl} fallback={"Lara"} />
                  </div>
                  <section>
                    <h2 className="text-xl font-bold">About</h2>
                    <p className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
                      {RESUME_DATA.summary["en"]}
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                      {RESUME_DATA.skills.map((skill) => {
                        return (
                          <Badge className="print:text-[10px]" key={skill}>
                            {skill}
                          </Badge>
                        );
                      })}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold">Competitions</h2>
                    <div className="flex flex-wrap gap-1">
                      {RESUME_DATA.competitions.map((skill) => {
                        return (
                          <Badge className="print:text-[10px]" key={skill["en"]}>
                            {skill["en"]}
                          </Badge>
                        );
                      })}
                    </div>
                  </section>

                  <section>
                    <Link href="https://cv.santiago-lara.dev/" target="_blank" rel="noopener noreferrer">
                      <Button size="1" variant="soft">
                        Ver CV Completo
                        <ExternalLinkIcon />
                      </Button>
                    </Link>
                  </section>
                </section>
              </Tabs.Content>

              <Tabs.Content value="nerd">
                <DataList.Root>
                  <DataList.Item align="center">
                    <DataList.Label minWidth="88px">Estatus</DataList.Label>
                    <DataList.Value>
                      <Badge color="jade" variant="soft" radius="full">
                        Online
                      </Badge>
                    </DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label minWidth="88px">URL</DataList.Label>
                    <DataList.Value>
                      <Link href="https://si.santiago-lara.dev/" target="_blank" rel="noopener noreferrer">
                        <Button size="1" variant="soft">
                          si.santiago-lara.dev
                          <ExternalLinkIcon />
                        </Button>
                      </Link>
                    </DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>Deployment Infraestructure</DataList.Label>
                    <DataList.Value>Vercel</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>Network Infraestructure</DataList.Label>
                    <DataList.Value>Cloudflare</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>NodeJS Version</DataList.Label>
                    <DataList.Value>24.4.0</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>pnpm Version</DataList.Label>
                    <DataList.Value>10.28.1</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>React Version</DataList.Label>
                    <DataList.Value>19.2.3</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>NexJS Version</DataList.Label>
                    <DataList.Value>16.1.4</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>RadixUI Library Version</DataList.Label>
                    <DataList.Value>3.2.1</DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label>GitHub Repository Link</DataList.Label>
                    <Link href="https://github.com/PacifiK2460/seguridad-informatica" target="_blank" rel="noopener noreferrer">
                      <Button size="1" variant="soft">
                        PacifiK2460/seguridad-informatica
                        <ExternalLinkIcon />
                      </Button>
                    </Link>
                  </DataList.Item>
                </DataList.Root>

              </Tabs.Content>

              <Tabs.Content value="contact">
                <ContactForm />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>
      </Grid>

      <Flex px="5" className="w-full" direction="column"> 
        <Separator orientation="horizontal" className="w-full" my="3" size="4" />
        <Flex>
           // Table of contents
        </Flex>
        <Flex>
          // Content
        </Flex>
      </Flex>
    </Flex>
  );
}
