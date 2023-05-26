import SecureLayout from '@/components/SecureLayout'
import AccountSettings from '@/components/ProfileSettings';
import TopPanelProfile from '@/components/TopPanelProfile';


export default function profile() {
    

    return(
    <>
    <SecureLayout>
        <div className="text-center bg-green-200 w-5/6 mx-auto">
            <div className='mx-auto content-center '>
                <p className='py-4'> Welcome to your Profile</p>
                <TopPanelProfile />
            </div>
        </div>
    </SecureLayout>
    </>
    );
}