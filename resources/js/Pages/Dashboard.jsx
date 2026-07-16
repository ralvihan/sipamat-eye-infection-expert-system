import { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    useEffect(() => {
        if (auth.user?.role === 'admin') {
            router.replace(route('admin.dashboard'));
        } else {
            router.replace(route('diagnose'));
        }
    }, []);

    return null;
}