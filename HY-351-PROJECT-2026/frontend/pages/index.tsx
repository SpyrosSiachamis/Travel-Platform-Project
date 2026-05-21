/* eslint-disable indent */
import Head from "next/head";
import styles from "@/styles/Home.module.css"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useRouter } from 'next/router'

type InputType = {
  id: string;
  iType: string;
  text: string;
}

type AuthUser = {
  user_id: number;
  username: string;
  role: string;
}

type AuthResponse = {
  message: string;
  user: AuthUser;
}

// type to send to backend from login form
type user = {
  username: string;
  password: string;
}

export function LoginForm() {

  const [passwordToggle, setPasswordToggle] = useState<string>("password");
  const [btnText, setBtnText] = useState<string>("Show");
  const { login } = useAuth();
  const router = useRouter();
  const setPasswordView = () => {
    if (passwordToggle === "password") {
      setPasswordToggle("text");
      setBtnText("Hide")
    }
    else {
      setPasswordToggle("password")
      setBtnText("Show")
    }
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const user = Object.fromEntries(new FormData(form)) as user;
    const result = await authenticate(user);
    if (result) {
      login(result.role, result.username);
      router.push('/events');
    }
    else {
      console.log('fail');
    }
  }

  return (
    <form onSubmit={submitHandler} className={styles.loginform} id="loginForm">
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
  const { user } = useAuth();
  const router = useRouter();


  if (user.isLoggedIn) {
    router.push('/events')
  }
  else {
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

export async function authenticate(userData: user) {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failure logging in');
    }
    const result: AuthResponse = await response.json();
    return result.user;
  } catch (error) {
    console.error(error);
  }
}