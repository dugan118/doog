import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer'





const Layout = ({ children = null }) => {



    return (
        <>
            <Head>
                <title>Doog - Do Good</title>
                <meta></meta>
                <link href= "/favicon.ico" rel="icon"/>
            </Head>
            <div>
                <Header />
                <main>
                    <div className= "bg-gray-100  w-full h-min-fit ">
                        {typeof children === 'function' ? children(openModal) : children}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;