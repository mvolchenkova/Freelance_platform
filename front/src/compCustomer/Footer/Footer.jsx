import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="ReadexFont footerDiv">
        <div className="footerLinksDiv">
          <div className="footerLink">
            <img className="footerLogo" src="/images/headerLogo.svg" alt="" />
            <p>Rouwais Dist, Jeddah Rouwais Saudi Arabia</p>
            <p>00966 2 6676760</p>
          </div>
          <div className="footerLink">
            <p className="footerTitle">Employers</p>
            <p>Start Hiring</p>
            <p>Volunteer</p>
            <p>Diversity and Inclusion</p>
          </div>
          <div className="footerLink">
            <p className="footerTitle">Candidates</p>
            <Link to="/findFreelancers">
              <p>Get Hired</p>
            </Link>
            <p>Internships</p>
            <p>Temporary Employment</p>
            <p>Graduates</p>
            <p>Volunteer</p>
          </div>
          <div className="footerLink">
            <p className="footerTitle">Company</p>
            <p>For Students</p>
            <p>Careers</p>
            <p>Brand Ambassadors</p>
            <p>About</p>
            <p>Resources</p>
            <p>Blog</p>
          </div>
        </div>
        <hr />
        <div className="footerFeatures">
          <p>Copyright © 2022</p>
          <div className="langDiv">
            <img src="/images/global.svg" alt="" />
            <p>English</p>
          </div>
          <div className="termsDiv">
            <p>Terms of Service</p>
            <p>Privacy policy</p>
            <p>Offer terms</p>
            <div>
              <img src="/images/instIcon.svg" alt="" />
              <img src="/images/twitterIcon.svg" alt="" />
              <img src="/images/facebookIcon.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
