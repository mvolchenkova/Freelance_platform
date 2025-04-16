import Header from '../../compCustomer/Header/Header';
import UserCart from '../../compCustomer/UserCart/UserCart';
import ConInfUser from '../../compCustomer/ContInfUser/ConInfUser';
import './Profile.css';

export default function Profile() {
  return (
    <>
      <Header />
      <main className="profile-main flex-column align-center justify-around">
        <UserCart />
        <ConInfUser />
      </main>
    </>
  );
}
