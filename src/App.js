import { useState, useRef } from "react";

import { Popover, Overlay, Button } from "react-bootstrap";
import { useFocusElement } from "./useFocusElement";
import { useOnClickOutside } from "./useOnClickOutside";
import "./styles.css";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const elementRef = useFocusElement({ deps: [isOpen], condition: isOpen });
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div>
      <Button ref={ref} variant="success" onClick={() => setIsOpen(true)}>
        Click me to see
      </Button>
      <Overlay
        target={ref}
        placement="right-start"
        containerPadding={20}
        show={isOpen}
      >
        <Popover id="popover-basic">
          <Popover.Header ref={elementRef} as="h3">
            Popover right
          </Popover.Header>
          <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very
            engaging. right?
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Example />
    </div>
  );
}
