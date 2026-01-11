import { permanentRedirect } from 'next/navigation';

// 301 Permanent redirect for SEO - preserves link juice
export default function RegistrerPage() {
  permanentRedirect('/meld-interesse');
}

