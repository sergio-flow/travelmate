
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface OriginSelectorProps {
  currentOrigin: string;
  onOriginChange: (origin: string) => void;
}

const OriginSelector = ({ currentOrigin, onOriginChange }: OriginSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
        <span>From: {currentOrigin}</span>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/70 border-white/10 text-white">
        <DropdownMenuItem 
          className="hover:bg-white/10 cursor-pointer" 
          onClick={() => onOriginChange("Cluj-Napoca")}
        >
          Cluj-Napoca
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="hover:bg-white/10 cursor-pointer" 
          onClick={() => onOriginChange("Bucharest")}
        >
          Bucharest
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="hover:bg-white/10 cursor-pointer" 
          onClick={() => onOriginChange("Chisinau")}
        >
          Chisinau
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OriginSelector;
