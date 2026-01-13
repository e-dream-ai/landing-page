import ContentBox from "@/components/common/ContentBox/ContextBox";
import ExternalLink from "@/components/common/ExternalLink/ExternalLink";
import Title from "@/components/common/Title/Title";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const contentBoxes = [
  {
    id: "video-upload",
    content:
      "It can be as simple as uploading videos the same way you would to YouTube or Instagram, but with a deeper experience for your audience.",
  },
  {
    id: "python-api",
    content: (
      <>
        Collaborate with AI by using our{" "}
        <ExternalLink href={ROUTES.api}>Python API</ExternalLink> to create
        infinite artworks.
      </>
    ),
  },
  {
    id: "crowdsourcing",
    content:
      "Use Infinidream to tap into crowdsourcing or social interaction for participatory artworks.",
  },
  {
    id: "open-source",
    content: (
      <>
        Infinidream is{" "}
        <ExternalLink href={ROUTES.github}>open source</ExternalLink> and we
        invite collaboration of all kinds. Build on our platform, share your own
        art, or just{" "}
        <ExternalLink href={ROUTES.issues}>report a bug</ExternalLink>.
      </>
    ),
  },
  {
    id: "collective-intelligence",
    content: (
      <>
        Infinidream is an experiment in <em>collective intelligence</em>: Human
        artists and AIs working together with complementary strengths.
      </>
    ),
  },
  {
    id: "creators-program",
    content: (
      <div className="flex flex-col items-center gap-4 w-full">
        <span className="text-center">
          Join our creators program and get paid.
        </span>
        <ExternalLink href={ROUTES.creators}>
          <Button
            variant="reusable"
            size="reusable"
            className="w-full whitespace-normal h-auto py-1"
          >
            Creators Program
          </Button>
        </ExternalLink>
      </div>
    ),
    className: "flex flex-col items-center gap-4",
  },
];

export default function CollaborationSection() {
  return (
    <section className="flex flex-col gap-7">
      <Title>artist and open source collaborators</Title>
      <p className="font-secondary text-base text-primary">
        Infinidream is a free platform for generative artists, programmers,
        prompters, and dreamers of all stripes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {contentBoxes.map((box) => (
          <ContentBox key={box.id} className={box.className}>
            {box.content}
          </ContentBox>
        ))}
      </div>
    </section>
  );
}
