import React, { Suspense } from 'react';

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div />}>
            {children}
        </Suspense>
    );
}
