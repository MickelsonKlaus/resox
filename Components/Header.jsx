import Head from "next/head";

function Header({ title }) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}

export default Header;
