import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  status: AsyncStatus;
  isLoading: boolean;
  /** Re-runs the task, e.g. from a retry action in an error state. */
  reload: () => void;
}

/**
 * Runs an asynchronous read and tracks its state.
 *
 * Results from superseded runs are discarded, so a fast filter change cannot
 * leave stale data on screen. Deliberately small: the data layer is behind
 * repositories, so this only needs to cover request lifecycle.
 */
export function useAsync<T>(
  task: () => Promise<T>,
  deps: unknown[],
): AsyncState<T> {
  const [state, setState] = useState<{
    data: T | undefined;
    error: Error | undefined;
    status: AsyncStatus;
  }>({ data: undefined, error: undefined, status: 'idle' });

  const [nonce, setNonce] = useState(0);
  const runIdRef = useRef(0);

  // The task closure changes on every render by design; the caller's `deps`
  // are the contract for when the read should re-run.
  const taskRef = useRef(task);
  taskRef.current = task;

  useEffect(() => {
    const runId = ++runIdRef.current;
    let active = true;

    setState((previous) => ({ ...previous, status: 'loading', error: undefined }));

    taskRef
      .current()
      .then((data) => {
        if (!active || runId !== runIdRef.current) return;
        setState({ data, error: undefined, status: 'success' });
      })
      .catch((error: unknown) => {
        if (!active || runId !== runIdRef.current) return;
        setState({
          data: undefined,
          error: error instanceof Error ? error : new Error(String(error)),
          status: 'error',
        });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  return {
    ...state,
    isLoading: state.status === 'loading' || state.status === 'idle',
    reload,
  };
}
