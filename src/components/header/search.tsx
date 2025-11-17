// src/components/header/search-dialog.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const locale = pathname.split("/")[1] as "ar" | "en";

  const performSearch = () => {
    if (!query.trim()) return;
    const encoded = encodeURIComponent(query.trim());
    router.push(`/${locale}/search/${encoded}`);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") performSearch();
    if (e.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search className="w-5 h-5 cursor-pointer" />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[720px] p-0 top-[15%] border-0 shadow-2xl"
        showCloseButton={false}
      >
        <div className="flex items-center p-2">
          <Search 
            className="ml-4 w-5 h-5 text-muted-foreground cursor-pointer"
            onClick={performSearch}
          />
          <Input
            ref={inputRef}
            type="search"
            placeholder="ابحث عن منتجات، تصنيفات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="shadow-none border-0 focus-visible:ring-0 h-14 text-lg placeholder:text-muted-foreground"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}