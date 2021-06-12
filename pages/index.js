import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import firebase from '../firebase/clientApp';

export const Home = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const data = { name, message };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // 未ログイン時は匿名ユーザーを作成する
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  });

  const createData = async () => {
    if (!name || !message) {
      alert('名前とメッセージを入力してください');
      return;
    }
    const db = firebase.firestore();
    await db.collection('profile').doc(name).set(data);
    alert('Firestoreにデータを作成できました！');
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js / Firestore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js / Firebase CSR</h1>
        <p className="description">名前とメッセージを入力してください。</p>
        <div className="labelBox">
          <label>
            名前：
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            メッセージ：
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
        </div>

        <button onClick={createData}>Firestoreにデータを作成</button>

        <Link href={`/profile/${data.name}`} passHref>
          <a>Go to SSR Page</a>
        </Link>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          font-size: 1.5em;
          margin: 1em 0;
        }

        a {
          color: blue;
          font-size: 1.5em;
        }

        label {
          margin: 10px;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .labelBox {
          display: flex;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
            Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
