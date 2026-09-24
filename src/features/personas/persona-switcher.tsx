import { MenuLabel, MenuRadioItem, MenuSeparator } from '@/components/ui';
import { usePersona } from './persona-context';

/**
 * PROTOTYPE ONLY.
 *
 * Renders the persona choices inside the user menu so the three experiences
 * can be inspected. Deleting this file and its single call site in
 * `UserMenu` removes the switcher entirely; nothing else references it.
 */
export function PersonaSwitcherMenuSection() {
  const { persona, personas, setPersona } = usePersona();

  return (
    <>
      <MenuSeparator />
      <MenuLabel>View as (prototype)</MenuLabel>
      {personas.map((option) => (
        <MenuRadioItem
          key={option.id}
          checked={option.id === persona.id}
          onSelect={() => setPersona(option.id)}
          description={option.summary}
        >
          {option.name}
        </MenuRadioItem>
      ))}
      <p className="px-2.5 pt-1 pb-2 text-2xs leading-relaxed text-ink-faint">
        Demonstration only. Replaced by role-based authorisation.
      </p>
    </>
  );
}
