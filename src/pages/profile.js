import Layout from '@/components/Layout'
import AccountSettings from '@/components/AccountSettings';


export default function profile() {

    return(
    <>
    <Layout>
        <div className="text-center bg-green-200 w-5/6 mx-auto">
            <div className='mx-auto content-center '>
                <p className='py-4'> Welcome to your Profile</p>
                <AccountSettings />
            </div>
        </div>
    </Layout>
    </>
    );
}