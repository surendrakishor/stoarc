import { useCurrentUser } from '@/app/providers';
import { prototypeFeatures } from '@/app/config/app.config';
import {
  Avatar,
  ChevronDownIcon,
  LogoutIcon,
  Menu,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  SettingsIcon,
  Skeleton,
  UserIcon,
} from '@/components/ui';
import { PersonaSwitcherMenuSection, usePersona } from '@/features/personas';
import { USER_ROLE_LABEL } from '@/lib/status';
import { useNavigate } from 'react-router-dom';

/**
 * The account menu.
 *
 * Also the single place the prototype persona switcher is mounted, behind a
 * flag, so that removing it later touches one import.
 */
export function UserMenu() {
  const { user, isLoading } = useCurrentUser();
  const { persona } = usePersona();
  const navigate = useNavigate();

  if (isLoading || !user) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <Menu
      label="Account"
      renderTrigger={(props) => (
        <button
          {...props}
          type="button"
          // The avatar is decorative and the name is hidden on small
          // viewports, so the control names itself explicitly.
          aria-label={`Account menu for ${user.name}`}
          className="flex items-center gap-2 rounded-md py-1 pr-1.5 pl-1 transition-colors hover:bg-surface-muted"
        >
          <Avatar name={user.name} src={user.avatar} size="md" />
          <span className="hidden min-w-0 text-left md:block">
            <span className="block truncate text-[0.8125rem] leading-tight font-medium text-ink">
              {user.name}
            </span>
            <span className="block truncate text-2xs leading-tight text-ink-muted">
              {USER_ROLE_LABEL[user.role]}
            </span>
          </span>
          <ChevronDownIcon size={15} className="shrink-0 text-ink-faint" />
        </button>
      )}
    >
      <MenuLabel>Signed in as</MenuLabel>
      <div className="px-2.5 pb-2">
        <p className="text-[0.8125rem] font-medium text-ink">{user.name}</p>
        <p className="text-2xs text-ink-muted">
          {user.jobTitle ?? USER_ROLE_LABEL[user.role]}
        </p>
        {prototypeFeatures.personaSwitcher ? (
          <p className="mt-1 text-2xs text-ink-faint">
            Viewing as {persona.name}
          </p>
        ) : null}
      </div>

      <MenuSeparator />
      <MenuItem
        leadingIcon={<UserIcon size={15} />}
        onSelect={() => navigate('/settings')}
      >
        Profile
      </MenuItem>
      <MenuItem
        leadingIcon={<SettingsIcon size={15} />}
        onSelect={() => navigate('/settings')}
      >
        Settings
      </MenuItem>

      {prototypeFeatures.personaSwitcher ? (
        <PersonaSwitcherMenuSection />
      ) : null}

      <MenuSeparator />
      <MenuItem leadingIcon={<LogoutIcon size={15} />} disabled>
        Sign out
      </MenuItem>
    </Menu>
  );
}
