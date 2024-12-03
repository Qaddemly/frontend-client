import { useEffect, useRef } from "react";

type UseClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement>(
  handler: UseClickOutsideHandler,
  ignoreElementRef?: React.RefObject<HTMLElement>,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      const ignoreElement = ignoreElementRef?.current;

      if (
        element?.contains(event.target as Node) ||
        ignoreElement?.contains(event.target as Node)
      ) {
        return;
      }

      handler(event); // Call the handler when clicked outside
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ignoreElementRef]);

  return ref;
}
