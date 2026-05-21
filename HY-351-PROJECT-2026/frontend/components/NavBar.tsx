/* eslint-disable indent */

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css'
import { useAuth, UserState } from '@/context/AuthContext';

type AuthUser = {
    user_id?: number;
    username: string;
    role: string;
};

type NavItem = {
    label: string;
    path: string;
};

type AuthResponse = {
    message: string;
    user?: AuthUser;
}

export function NavBtn({ label, path }: NavItem) {
    return (
        <>
            <Link href={path} className={styles.navbtn}>{label}</Link>
        </>
    );
}



export function NavLogout({ user }: { user: AuthUser }) {
    const router = useRouter();
    const { logout } = useAuth();
    async function handleLogout() {
        if (!user || user.role === 'Guest') {
            return;
        }
        try {
            const result = await logoutAuthenticate();
            if (!result) {
                throw new Error('Error logging out');
            }
            logout();
            router.replace('/');
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <>
            <button type="button" className={styles.navbtn} onClick={handleLogout}>Logout</button>
        </>
    )
}


export default function NavBar() {
    const { user } = useAuth();
    if (user.role === 'Guest') {
        return (
            <>
                <header className={styles.navbar}>
                    <div className={styles.leftside}>
                        <div className={styles.logo}></div>
                        <div className={styles.title}>Travel<br></br>Heraklion</div>
                        <nav className={styles.leftbtns}>
                        </nav>
                    </div>
                    <nav className={styles.rightbtns}>
                    </nav>
                </header>
            </>
        );
    }
    if (user.role === 'excursionist') {
        return (
            <>
                <header className={styles.navbar}>
                    <div className={styles.leftside}>
                        <div className={styles.logo}></div>
                        <div className={styles.title}>Travel<br></br>Heraklion</div>
                        <nav className={styles.leftbtns}>
                            <NavBtn label='Home' path='/events' />
                            <NavBtn label='Events' path='/events' />
                        </nav>
                    </div>
                    <nav className={styles.rightbtns}>
                        <NavBtn label='Favourites' path='/' />
                        <NavBtn label='History' path='/' />
                        <NavBtn label='Notifications' path='/' />
                        <NavBtn label='Profile' path='/' />
                        <NavBtn label='Settings' path='/' />
                        <NavLogout user={user as AuthUser}/>
                    </nav>
                </header>
            </>
        );
    }
    if (user.role === 'trip_creator') {
        return (
            <>
                <header className={styles.navbar}>
                    <div className={styles.leftside}>
                        <div className={styles.logo}></div>
                        <div className={styles.title}>Travel<br></br>Heraklion</div>
                        <nav className={styles.leftbtns}>
                            <NavBtn label='Home' path='/events' />
                            <NavBtn label='Events' path='/events' />
                        </nav>
                    </div>
                    <nav className={styles.rightbtns}>
                        <NavBtn label='Favourites' path='/' />
                        <NavBtn label='History' path='/' />
                        <NavBtn label='Notifications' path='/' />
                        <NavBtn label='Add Event' path='/events/add' />
                        <NavBtn label='Profile' path='/' />
                        <NavBtn label='Settings' path='/' />
                        <NavLogout user={user as AuthUser}/>
                    </nav>
                </header>
            </>
        );
    }
    return (
        <header className={styles.navbar}>
            <div className={styles.leftside}>
                <div className={styles.logo}></div>
                <div className={styles.title}>Travel<br></br>Heraklion</div>
                <nav className={styles.leftbtns}></nav>
            </div>
            <nav className={styles.rightbtns}></nav>
        </header>
    );
}

export async function logoutAuthenticate() {
    try {
        const response = await fetch('http://localhost:5000/auth/logout', {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Error logging out');
        }
        const result: AuthResponse = await response.json();
        return result.message;
    } catch (error) {
        console.error(error);
        return null;
    }
}