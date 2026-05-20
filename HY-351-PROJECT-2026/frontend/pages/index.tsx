import Head from "next/head";
import styles from "@/styles/Home.module.css"

export function AsideColumn() {
  return(
    <>
      <aside className={styles.asidesection}>
        <div className={styles.welcome}>
          <h1 className={styles.welcometext1}>Welcome To Heraklion</h1>
          <h2 className={styles.welcometext2}>Please Sign in to your account</h2>
        </div>
      </aside>
    </>
  );
}

export function Main() {
  return (
    <>
      <div className={styles.mainsection}>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>HY351 APP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className={styles.maincontainer}>
        <AsideColumn />
        <Main />
      </div>
    </>
  );
}
