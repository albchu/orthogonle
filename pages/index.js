import Head from "next/head";
import Image from "next/image";
import { App } from "../components/App";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>wurd me</title>
        <meta
          name="description"
          content="Amaze your friends with your wordle picks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <App />
      </main>
    </div>
  );
}
