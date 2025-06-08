import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
const Modal = ({ children }: { children: React.ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");

    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
      document.body.style.overflowY = "hidden";
      return () => {
        modalRoot.removeChild(elRef.current!);
        document.body.style.overflowY = "auto";
      };
    }
  }, []);
  return createPortal(<div>{children}</div>, elRef.current!);
};
export default Modal;
