/* eslint-disable indent */
import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css'
type NavItem = {
    label: string;
    path: string;
};

export function NavBtn({ label, path }: NavItem) {
    return (
        <>
            <Link href={path} className={styles.navbtn}>{label}</Link>
        </>
    );
}
type UserState = {
    isLoggedIn: boolean;
    role: string;
    username?: string;
}

export default function NavBar() {
    const [user, setUser] = useState<UserState>({
        isLoggedIn: false,
        role: 'Guest',
    });
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
                    </nav>
                </header>
            </>
        );
    }
    if(user.role ==='trip_creator'){
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
                        <NavBtn label='Add Event' path='/' />
                        <NavBtn label='Profile' path='/' />
                        <NavBtn label='Settings' path='/' />
                    </nav>
                </header>
            </>
        );
    }
    return null;
}