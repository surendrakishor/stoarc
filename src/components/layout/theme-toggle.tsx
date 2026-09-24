import { useTheme, type ThemePreference } from '@/app/providers';
import {
  MonitorIcon,
  MoonIcon,
  SegmentedControl,
  SunIcon,
  type SegmentedOption,
} from '@/components/ui';

const OPTIONS: readonly SegmentedOption<ThemePreference>[] = [
  { value: 'light', label: 'Light', icon: <SunIcon size={15} /> },
  { value: 'dark', label: 'Dark', icon: <MoonIcon size={15} /> },
  { value: 'system', label: 'Match system', icon: <MonitorIcon size={15} /> },
];

export function ThemeToggle({ iconOnly = true }: { iconOnly?: boolean }) {
  const { preference, setPreference } = useTheme();
  return (
    <SegmentedControl
      label="Appearance"
      options={OPTIONS}
      value={preference}
      onChange={setPreference}
      iconOnly={iconOnly}
    />
  );
}
