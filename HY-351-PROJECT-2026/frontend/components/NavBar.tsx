// import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css'
type NavItem = {
    label: string;
    path: string;
};

export function NavBtn(navItem: NavItem) {
    return (
        <>
            <Link href={navItem.path} className={styles.navbtn}>{navItem.label}</Link>
        </>
    );
}

export default function NavBar() {
    // const [user, setUser] = useState<UserState>({
    //     isLoggedIn: false,
    //     role: 'Guest',
    //     username: null
    // });
    return(
        <>
            <header className={styles.navbar}>
                <div className={styles.leftside}>
                    <div className={styles.logo}></div>
                    <div className={styles.title}>Travel<br></br>Heraklion</div>
                    <nav className={styles.leftbtns}>
                        <NavBtn label='Home' path='/' />
                        <NavBtn label='Events' path='/events' />
                    </nav>
                </div>
                <nav className={styles.rightbtns}>
                    {/* <NavBtn label='Favourites' path='/' />
                    <NavBtn label='History' path='/' />
                    <NavBtn label='Favourites' path='/' /> */}
                </nav>
            </header>
        </>
    );
}