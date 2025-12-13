'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Analytics() {
    const pathname = usePathname()

    useEffect(() => {
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('config', 'G-606H5K3S67', {
                page_path: pathname,
            })
        }
    }, [pathname])

    return null
}
