import { useRef, useEffect } from "react";

export const focusElement = async ({ element: selectedElement, selector }) => {
  const element = selectedElement || document.querySelector(selector);
  if (!element) return null;
  let isTabIndexAdded = false;
  if (element.tabIndex !== 0) {
    element.setAttribute("tabindex", 0);
    isTabIndexAdded = true;
  }
  element.focus();
  if (isTabIndexAdded) {
    element.setAttribute("tabindex", -1);
  }

  return element;
};

/**
 *
 * `useFocusElement` is used to focus the element based on parameters and returns a mutable ref object whose `.current` property is initialized to the passed argument
 *
 * @param deps If present, effect will only activate if the values in the list change.
 * @param selector a string passed to focusElement function
 * @param condition condition to run the focus
 * @param options additional options passed to focusElement function
 *
 */

export const useFocusElement = ({
  deps = [],
  condition = true,
  selector,
  options
} = {}) => {
  const ref = useRef();

  useEffect(() => {
    if (selector || (options && typeof options === "object")) {
      focusElement({ selector, ...options });
    } else if (condition && ref.current) {
      if (ref.current.tabIndex !== 0) {
        ref.current.tabIndex = 0;
      }
      ref.current.focus();
    }
  }, deps);

  return ref;
};
