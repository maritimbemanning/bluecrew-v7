"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndex,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={cn(
          "w-full px-6 py-4 text-left",
          "flex items-center justify-between gap-4",
          "hover:bg-slate-50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky"
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-900">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-slate-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}


