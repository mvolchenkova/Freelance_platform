import SearchBar from '../../compCustomer/SearchBar/SearchBar';
import PreferencesBar from '../../compCustomer/PreferencesBar/PreferencesBar';
import FreelancerVacancies from '../../compFreelancer/FreelancerVacancies/FreelancerVacancies';
import './FindJob.css';
import Header from '../../compCustomer/Header/Header';

export default function FindJob() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="sidebarAndVacancies">
        <main className="main-candidate">
          <PreferencesBar />
          <FreelancerVacancies />
        </main>
      </div>
    </>
  );
}
