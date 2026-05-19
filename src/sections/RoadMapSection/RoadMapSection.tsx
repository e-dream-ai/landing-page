import ContentBox from "@/components/common/ContentBox/ContextBox";
import ExternalLink from "@/components/common/ExternalLink/ExternalLink";
import Title from "@/components/common/Title/Title";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const RoadmapItem = [
  {
    id: "hosted-cloud-generation",
    text: 'Hosted cloud generation driven by AI and crowd signals. Put an "edit" button on each dream and allow you to change the prompts, restyle, and make your own version.',
  },
  {
    id: "multi-platform",
    text: "Running on more platforms such as Linux, Android, iOS, tvOS, and directly on TVs and set-top boxes.",
  },
  {
    id: "multiple-screens",
    text: "Managing multiple screens. Turn your home or space into an interactive gallery.",
  },
  {
    id: "social-control",
    text: "Social control: allowing the people around a screen to control it, not just the owner. Put a QR code next to a screen to make a video jukebox, or invent your own game.",
  },
  {
    id: "audio-reactive",
    text: "Using a microphone to make playback audioreactive, detect the ambient activity level, and even ID any song. Add realtime effects, more mixing, and become an AI VJ.",
  },
  {
    id: "patreon",
    text: (
      <div className="flex flex-col items-center gap-4">
        <span>
          Infinidream is free to use but maintaining and developing it costs
          real money. Please support our mission.
        </span>
        <ExternalLink href={ROUTES.patreon}>
          <Button variant="reusable" size="reusable">
            Patreon
          </Button>
        </ExternalLink>
      </div>
    ),
  },
];

export default function RoadMapSection() {
  return (
    <section className="flex flex-col gap-7">
      <Title>roadmap</Title>
      <p className="font-secondary text-base text-primary font-medium">
        There are so many ways to expand and improve Infinidream. Currently we
        are working on and thinking about:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {RoadmapItem.map((item) => (
          <ContentBox key={item.id}>{item.text}</ContentBox>
        ))}
      </div>
    </section>
  );
}
