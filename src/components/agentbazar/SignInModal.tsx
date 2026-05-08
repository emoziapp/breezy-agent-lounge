import { X } from "lucide-react";
import { LoginCard } from "./LoginCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export function SignInModal({ open, onClose, onRegisterClick }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-[480px] animate-ab-scale-in">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <LoginCard
          onRegisterClick={() => {
            onClose();
            onRegisterClick();
          }}
        />
      </div>
    </div>
  );
}
