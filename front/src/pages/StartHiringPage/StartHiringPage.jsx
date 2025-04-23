import SearchBar from '../../compCustomer/SearchBar/SearchBar';
import PreferencesBar from '../../compCustomer/PreferencesBar/PreferencesBar';
import Vacancies from '../../compCustomer/Vacancies/Vacancies';
import './StartHiringPage.css';
import Header from '../../compCustomer/Header/Header';

export default function StartHiring() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="sidebarAndVacancies">
        <main className="main-candidate">
          <PreferencesBar />
          <Vacancies />
        </main>
      </div>
    </>
  );
}
