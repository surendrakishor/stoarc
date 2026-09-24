import type { SVGProps } from 'react';

/**
 * Inline icon set.
 *
 * Line icons at a consistent 1.5px stroke on a 24px grid, drawn in
 * `currentColor` so they inherit their surrounding text colour. Kept in-repo
 * rather than pulled from a package: the set is small, and consistency of
 * weight matters more here than breadth.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 16, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const HomeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 10.5 12 4l8 6.5V20H4z" />
    <path d="M9.5 20v-5.5h5V20" />
  </Icon>
);

export const ArchitectureIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3.5 20 8v8l-8 4.5L4 16V8z" />
    <path d="M4 8l8 4.5L20 8" />
    <path d="M12 12.5V20.5" />
  </Icon>
);

export const AssessmentIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 3.5h9L19 7.5V20.5H6z" />
    <path d="M14.5 3.5V8H19" />
    <path d="M9 12.5l1.75 1.75L14.5 10.5" />
    <path d="M9 17h6" />
  </Icon>
);

export const ReviewsIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
    <circle cx="17" cy="9.5" r="2.5" />
    <path d="M16 14.6c2.6.2 4.5 2.3 4.5 4.9" />
  </Icon>
);

export const CalendarIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17" />
    <path d="M8 3.5v4M16 3.5v4" />
  </Icon>
);

export const DecisionsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3.5v13" />
    <path d="M5 8.5 12 6l7 2.5" />
    <path d="M5 8.5 2.8 14a3 3 0 0 0 4.4 0z" />
    <path d="M19 8.5 16.8 14a3 3 0 0 0 4.4 0z" />
    <path d="M8.5 20.5h7" />
  </Icon>
);

export const ProfilesIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3.5 19 6v6c0 4-3 7.2-7 8.5-4-1.3-7-4.5-7-8.5V6z" />
    <path d="M9.25 11.75 11.25 13.75 15 10" />
  </Icon>
);

export const SettingsIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h10M18 7h2" />
    <path d="M4 12h3M11 12h9" />
    <path d="M4 17h7M15 17h5" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="13" cy="17" r="2" />
  </Icon>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9.5 6 5.5 6-5.5" />
  </Icon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9.5 6 5.5 6-5.5 6" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const PanelLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M9.5 4.5v15" />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6" />
    <path d="m15.5 15.5 4 4" />
  </Icon>
);

export const SunIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </Icon>
);

export const MoonIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </Icon>
);

export const MonitorIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M9 20.5h6M12 17v3.5" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Icon>
);

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
  </Icon>
);

export const EvidenceIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 3.5h10v17l-5-2.5-5 2.5z" />
    <path d="M10 8h4M10 11.5h4" />
  </Icon>
);

export const InfoIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5M12 7.75v.5" />
  </Icon>
);

export const UserIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
  </Icon>
);

export const LogoutIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 5.5H6.5v13H14" />
    <path d="M11 12h9.5M17 8.5l3.5 3.5-3.5 3.5" />
  </Icon>
);
