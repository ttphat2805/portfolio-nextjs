'use client';

import type { IconType } from 'react-icons';
import {
  FaFacebookF,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { FiGlobe } from 'react-icons/fi';

type Props = {
  title?: string;
  url: string;
};

// URL substring → icon, using the react-icons already in the bundle
const NETWORK_ICONS: Array<[string, IconType]> = [
  ['github.com', FaGithub],
  ['gitlab.com', FaGitlab],
  ['linkedin.com', FaLinkedinIn],
  ['facebook.com', FaFacebookF],
  ['instagram.com', FaInstagram],
  ['youtube.com', FaYoutube],
  ['twitter.com', FaXTwitter],
  ['x.com', FaXTwitter],
];

const iconFor = (url: string): IconType => {
  const match = NETWORK_ICONS.find(([host]) => url.includes(host));
  return match ? match[1] : FiGlobe;
};

const SocialIcon = ({ title, url }: Props) => {
  const Icon = iconFor(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={`Visit my ${title ?? 'social'} profile (opens in new tab)`}
      className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500 dark:text-gray-400
        hover:text-primary dark:hover:text-primary hover:bg-primary/10
        transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
    </a>
  );
};

export default SocialIcon;
