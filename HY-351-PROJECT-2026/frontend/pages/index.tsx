/* eslint-disable indent */
import Head from "next/head";
import styles from "@/styles/Home.module.css"
import { useState } from "react";
import Link from "next/link";
type InputType = {
  id: string;
  iType: string;
  text: string;
}

export function LoginForm() {
  const [passwordToggle, setPasswordToggle] = useState<string>("password");
  const [btnText, setBtnText] = useState<string>("Show");

  const setPasswordView = () => {
    if (passwordToggle === "password") {
      setPasswordToggle("text");
      setBtnText("Hide")
    }
    else {
      setPasswordToggle("password");
      setBtnText("Show")
    }
  }
  return (
      <form action="/login" className={styles.loginform}>
        <InputField id="username" iType="text" text="Username" />
        <br></br>
        <InputField id="password" iType={passwordToggle} text="Password" />
        <button type="button" className={styles.passwordtoggle} onClick={setPasswordView}>{btnText} Password</button>
        <div className={styles.submitdiv}>
          <button type="submit" className={styles.submitbtn}>Login</button>
        </div>
      </form>
  );
}


export function InputField(type: InputType) {
  return (
    <>
      <div className={styles.inputdiv}>
        <label htmlFor={type.id} className={styles.inputlabel}>{type.text}:</label>
        <input id={type.id} name={type.id} type={type.iType} className={styles.inputfield}></input>
      </div>
    </>
  );
}

export function AsideColumn() {
  return (
    <>
      <aside className={styles.asidesection}>
        <div className={styles.welcome}>
          <h1 className={styles.welcometext1}>Welcome To Heraklion</h1>
          <h2 className={styles.welcometext2}>Please Sign in to your account</h2>
        </div>
        <div className={styles.logindiv}>
          <LoginForm />
        </div>
        <div className={styles.centercontainer}>
          <span>Don&apos;t have an account? <Link href='/'><b>Sign up here</b></Link></span>
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
