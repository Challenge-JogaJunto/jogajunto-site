import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaX } from "react-icons/fa6";

export default function DefaultModal({
  children,
  onClose,
  isOpen,
  size = "lg",
}) {
  let maxWidth = `max-w-${size}`;
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-100">
        <div
          className="fixed inset-0 flex w-screen items-start justify-center p-4 overflow-auto"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <DialogPanel
            className={`relative w-full max-w-2xl ${maxWidth} space-y-4 border border-[var(--borda-container)] bg-[var(--container)] p-6 rounded-lg`}
          >
            {onClose && (
              <div onClick={onClose} className="absolute top-0 right-0 p-6 cursor-pointer">
                <FaX size={20} />
              </div>
            )}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
