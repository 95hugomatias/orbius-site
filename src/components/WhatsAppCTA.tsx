import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

interface WhatsAppCTAProps {
  text?: string;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppCTA({
  text = "Scrivici su WhatsApp",
  variant = "solid",
  size = "md",
  className = "",
}: WhatsAppCTAProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
  };

  const variantClasses = {
    solid:
      "bg-orbius-gold text-orbius-navy hover:bg-orbius-goldLight font-semibold",
    outline:
      "border-2 border-orbius-gold text-orbius-gold hover:bg-orbius-gold hover:text-orbius-navy font-semibold",
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-xl transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <MessageCircle size={size === "lg" ? 22 : size === "sm" ? 16 : 18} />
      {text}
    </a>
  );
}
