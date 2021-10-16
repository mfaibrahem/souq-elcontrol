import { useEffect } from 'react';
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (ref.current && !ref.current?.contains(event.target)) {
          handler(event);
        }
      };
      document.addEventListener('click', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('click', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default useOnClickOutside;
