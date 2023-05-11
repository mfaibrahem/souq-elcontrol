import { useState } from 'react';

function useCopyToClipboard() {
  const [result, setResult] = useState(null);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setResult({ state: 'success' });
    } catch (e) {
      setResult({ state: 'error', message: e.message });
      throw e;
    } finally {
      // 👇 Show the result feedback for 2 seconds
      setTimeout(() => {
        setResult(null);
      }, 2000);
    }
  };

  // 👇 We want the result as a tuple
  return [copy, result];
}

export default useCopyToClipboard;
