import { useEffect } from 'react';
import { formatDocumentTitle } from '@/app/config/app.config';

/** Keeps the browser title in step with the current page and the app name. */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = formatDocumentTitle(pageTitle);
  }, [pageTitle]);
}
