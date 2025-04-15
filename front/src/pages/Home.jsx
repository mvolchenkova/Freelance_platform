import StartHiring from '../compFreelancer/StartHiring/StartHiring';
import Steps from '../compFreelancer/Steps/Steps';
import Opportunities from '../compFreelancer/Opportunities/Opportunities';
import PoweredBy from '../compFreelancer/PoweredBy/PoweredBy';
import Partners from '../compFreelancer/Partners/Partners';
import HireDream from '../compFreelancer/HireDream/HireDream';
import Header from '../compCustomer/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <StartHiring />
      <Steps />
      <PoweredBy />
      <Opportunities />
      <Partners />
      <HireDream />
    </>
  );
}
