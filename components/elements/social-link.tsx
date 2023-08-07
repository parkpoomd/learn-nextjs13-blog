import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function SocialLink({
  platform,
  link,
  isShareURL = false,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size="18" />;
      case "twitter":
        return <Twitter size="18" />;
      case "instagram":
        return <Instagram size="18" />;
      case "youtube":
        return <Youtube size="18" />;
      case "linkedin":
        return <Linkedin size="18" />;
      case "github":
        return <Github size="18" />;
    }
  };

  return (
    <Link href={link}>
      <div
        className={`${
          isShareURL
            ? "rounded-md bg-neutral-200 px-3 py-2 text-neutral-600 transition-colors duration-100 ease-in-out hover:bg-neutral-600 hover:text-neutral-100"
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
}
