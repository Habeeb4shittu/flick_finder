'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Default style
import '../../src/app/nprogress.css'; // Your custom styles

NProgress.configure({ showSpinner: false });

export default function ProgressProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        NProgress.done();
    }, [pathname]);

    return <>{children}</>;
}
