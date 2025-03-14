
import StartHiring from '../components/StartHiring/StartHiring'
import Steps from '../components/Steps/Steps'
import Opportunities from '../components/Opportunities/Opportunities'
import PoweredBy from '../components/PoweredBy/PoweredBy'
import Partners from '../components/Partners/Partners'
import HireDream from '../components/HireDream/HireDream'
import Header from '../components/Header/Header'
export default function Home(){
    return(
        <>
            <Header/>
            <StartHiring />
            <Steps />
            <PoweredBy />
            <Opportunities/>
            <Partners />
            <HireDream />
        </>
    )
}