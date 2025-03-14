
import SearchBar from '../../components/SearchBar/SearchBar'
import PreferencesBar from '../../components/PreferencesBar/PreferencesBar'
import Vacancies from '../../components/Vacancies/Vacancies'
import '../FindJob/FindJob.css'

export default function FindJob(){
    return(
        <>
            <SearchBar/>
            <div className="sidebarAndVacancies">
                <PreferencesBar/>
                <Vacancies/>
            </div>
        </>
    )
}