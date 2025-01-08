import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import styles from './styles/App.module.css';
import { useDebounce } from '@lib/hooks/useDebounce';

const countAtom = atom(0);

export default function App() {
  const [count, setCount] = useAtom(countAtom);
  const debouncedCount = useDebounce(count, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['example', debouncedCount],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return `Hello from React Query! Count: ${debouncedCount}`;
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React Template Touz</h1>
      <button type="button" className={styles.button} onClick={() => setCount((c) => c + 1)}>
        Count: {count} (Debounced: {debouncedCount})
      </button>
      <div className={styles.queryResult}>{isLoading ? 'Loading...' : data}</div>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </div>
  );
}
