import { EmptyState, LinkButton, PageHeader } from '@/components/ui';
import { useDocumentTitle } from '@/lib/use-document-title';

export function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <>
      <PageHeader
        title="Page not found"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Not found' }]}
      />
      <EmptyState
        title="That page does not exist"
        description="The address may have changed, or the screen may not have been built yet."
        action={
          <LinkButton to="/" variant="primary">
            Return home
          </LinkButton>
        }
      />
    </>
  );
}
