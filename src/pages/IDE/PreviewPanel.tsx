
import React from 'react';
import { PreviewSection } from '@/components/PreviewSection';

interface PreviewPanelProps {
  htmlContent: string;
  previewKey: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = React.memo(({ htmlContent, previewKey }) => (
  <PreviewSection htmlContent={htmlContent} previewKey={previewKey} />
));
