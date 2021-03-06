import Head from "next/head";

function Header({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <title>Redox - More than anonymous messaging</title>
      <meta name="title" content="Redox - More than anonymous messaging" />
      <meta
        name="description"
        content="Create anonymous messages and questions, share to friends and earn from every message or answer you receive from them. Also earn from referrals."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://resox-m.vercel.app/" />
      <meta
        property="og:title"
        content="Redox - More than anonymous messaging"
      />
      <meta
        property="og:description"
        content="Create anonymous messages and questions, share to friends and earn from every message or answer you receive from them. Also earn from referrals."
      />
      <meta
        property="og:image"
        content="https://resox-m.vercel.app/undraw_New_message_re_fp03.png"
      />
      <meta
        name="keywords"
        content="resox, anonymous messaging, messages, anonymous questions, create and earn, refer and earn, message, messaging, anonymous"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://resox-m.vercel.app/" />
      <meta
        property="twitter:title"
        content="Redox - More than anonymous messaging"
      />
      <meta
        property="twitter:description"
        content="Create anonymous messages and questions, share to friends and earn from every message or answer you receive from them. Also earn from referrals."
      />
      <meta
        property="twitter:image"
        content="https://resox-m.vercel.app/undraw_New_message_re_fp03.png"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9998565672672812"
        crossOrigin="anonymous"
      ></script>
    </Head>
  );
}

export default Header;
