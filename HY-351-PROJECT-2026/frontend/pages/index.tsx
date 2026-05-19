import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>HY351 APP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <div>
        <h1>Home</h1>
        <Link href="/events">Go To Events Page</Link>
      </div>
    </>
  );
}
