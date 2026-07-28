'use client';

import { X } from 'lucide-react';
import { Flex, Button, Typography, TypographyH2 } from '@mysuf1020/mylib-ui';

export interface DetailField {
  label: string;
  value: React.ReactNode;
}

export interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fields: DetailField[];
  badge?: React.ReactNode;
  footerActions?: React.ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  fields,
  badge,
  footerActions,
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="start" className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <Flex alignItems="center" gap="2.5" className="mb-1">
              <TypographyH2 className="text-xl font-bold text-slate-900">{title}</TypographyH2>
              {badge}
            </Flex>
            {subtitle && <Typography level="sm" className="text-slate-500">{subtitle}</Typography>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </Flex>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {fields.map((field, idx) => (
              <div key={idx} className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {field.label}
                </div>
                <div className="text-sm font-medium text-slate-900">
                  {field.value || '-'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Flex justifyContent="end" gap="3" className="p-4 border-t border-slate-100 bg-slate-50/50">
          {footerActions}
          <Button variant="outline" onClick={onClose} className="px-5">
            Tutup
          </Button>
        </Flex>
      </div>
    </div>
  );
}
