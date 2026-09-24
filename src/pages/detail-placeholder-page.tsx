import { useParams } from 'react-router-dom';
import { EmptyState, LinkButton, PageHeader } from '@/components/ui';
import { useDocumentTitle } from '@/lib/use-document-title';

/**
 * Stands in for a detail screen that is linked to but not yet built.
 *
 * Keeping the routes real means links from the overview surfaces already go
 * somewhere sensible, and the detail screens drop in without re-plumbing.
 */
export function DetailPlaceholderPage({
  title,
  parentLabel,
  parentTo,
}: {
  title: string;
  parentLabel: string;
  parentTo: string;
}) {
  const params = useParams();
  const id = Object.values(params)[0];
  useDocumentTitle(title);

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: parentLabel, to: parentTo },
          { label: id ?? 'Detail' },
        ]}
      />
      <EmptyState
        title="This screen is built in a later increment"
        description={`The record ${id ?? ''} is reachable through the repository layer; the detail view itself has not been designed yet.`}
        action={
          <LinkButton to={parentTo} variant="secondary">
            Back to {parentLabel}
          </LinkButton>
        }
      />
    </>
  );
}
