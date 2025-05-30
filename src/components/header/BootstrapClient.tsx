// components/BootstrapClient.tsx
'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return null; // This component only loads the script
}
