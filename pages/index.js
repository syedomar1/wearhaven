import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WearHaven - Your Haven for clothes</title>
        <meta name="description" content="WearHaven.com - Your Haven for clothes" />
      </Head>
      <div className="mx-4">This is my website</div>
    </div>
  );
}
