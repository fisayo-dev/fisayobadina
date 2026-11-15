import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Briefcase01Icon,
  CertificateIcon,
  CreditCardIcon,
  File01Icon,
  Invoice01Icon,
  PuzzleIcon,
  RssIcon,
  Search01Icon,
  SecurityCheckIcon,
  TestTube01Icon,
  UserGroupIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import type { FallbackIcon } from "@/lib/projects";

export const fallbackIcons: Record<FallbackIcon, IconSvgElement> = {
  briefcase: Briefcase01Icon,
  users: UserGroupIcon,
  puzzle: PuzzleIcon,
  search: Search01Icon,
  wallet: Wallet01Icon,
  ledger: Invoice01Icon,
  credit: CreditCardIcon,
  certificate: CertificateIcon,
  shield: SecurityCheckIcon,
  document: File01Icon,
  rss: RssIcon,
  lab: TestTube01Icon,
};

export function Icon({
  icon,
  size = 16,
  className,
}: {
  icon: IconSvgElement;
  size?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon icon={icon} size={size} strokeWidth={1.6} className={className} aria-hidden="true" />
  );
}
