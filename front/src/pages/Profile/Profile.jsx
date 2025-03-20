import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import UserCart from '../../components/UserCart/UserCart'
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