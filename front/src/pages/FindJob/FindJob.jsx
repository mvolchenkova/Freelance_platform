
import SearchBar from '../../components/SearchBar/SearchBar'
import PreferencesBar from '../../components/PreferencesBar/PreferencesBar'
import Vacancies from '../../components/Vacancies/Vacancies'
import '../FindJob/FindJob.css'
import Header from '../../components/Header/Header'
export default function FindJob(){
    return(
        <>
            <Header/>
            <SearchBar/>
            <div className="sidebarAndVacancies">
                <main className='main-candidate'>
                    <PreferencesBar/>
                    <Vacancies/>
                </main>
            </div>
        </>
    )
}