import Header from '../../compCustomer/Header/Header'
import Footer from '../../compCustomer/Footer/Footer'
import UserCart from '../../compCustomer/UserCart/UserCart'
import './Profile.css'
export default function Profile (){
    return(
        <>
            <Header/>
                <main className='profile-main flex-column align-center justify-around'>
                   <UserCart/> 
                </main>
            <Footer/>
        </>
    )
}