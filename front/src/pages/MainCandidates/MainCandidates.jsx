import './MainCandidates.css';
import Button from '../../materialuiComponents/Button';
import { Link } from 'react-router-dom';
import Header from '../../compCustomer/Header/Header';
import circle1 from '../../images/circle1.svg'
import circle2 from '../../images/circle2.png'
import circle3 from '../../images/circle3.png'


export default function MainCandidates() {
  return (
    <>
      <Header />
      <main className="mainCandidates ReadexFont">
        <p className="findJobTitle">
          Find Your
          <span className="greenText">Dream Job</span>
        </p>
        <p className="findJobDescr">289 jobs in 28 locations</p>
        <div className="findNcvDiv">
          <Link to='/findJob'>
            <Button
              text="Find a job"
              showArrow
              backgroundColor="rgb(61,66,90)"
              color="rgb(255,255,255)"
            />
          </Link>
          
          <Link to="/portfolio">
            <Button
              text="Create CV"
              showArrow
              backgroundColor="rgb(255,255,255)"
              color="rgb(127,135,100)"
            />
          </Link>
        </div>
        <div className="candMainImagesDiv">
          <div className="twoImgDiv">
            <img src="/images/img1div.png" alt="" />
            <img src="/images/img2div.png" alt="" />
          </div>
          <img className="manImg" src="/images/img3div.png" alt="" />
          <div className="twoImgDiv">
            <img src="/images/img4div.png" alt="" />
            <img src="/images/img5div.png" alt="" />
          </div>
          <img src="/images/img6div.png" alt="" />
        </div>
        <p className="fewEasyStepsText">Get Hired In A Few</p>
        <p className="greenText fewEasyStepsText">Easy Steps</p>
        <p className="findJobDescr">
          Our state of the art AI handles all the tough work for you. It helps you find the most
          desired jobs suited to your needs and saves you a lot of valuable time and energy
        </p>
        <div className="stepsHired">
          <div className="card1_1">
            <img className="cardImg" src={circle1} alt="" />
            <div className="cardText">
              <p className="cardTitle">Build your profile</p>
              <p className="cardDescr">
                We are nost efficient and reliable souce of hiring perocess and two time faster than
                any other companies
              </p>
            </div>
          </div>
          <div className="card2_1">
            <img className="cardImg" src={circle2} alt="" />
            <div className="cardText">
              <p className="cardTitle">Search for job openings</p>
              <p className="cardDescr">
                We are nost efficient and reliable souce of hiring perocess and two time faster than
                any other companies
              </p>
            </div>
          </div>
          <div className="card3_1">
            <img className="cardImg" src={circle3} alt="" />
            <div className="cardText">
              <p className="cardTitle">Apply for jobs you interested in</p>
              <p className="cardDescr">
                We are nost efficient and reliable souce of hiring perocess and two time faster than
                any other companies
              </p>
            </div>
          </div>
        </div>
        <p className="freshOpportText">
          <span className="greenText">Fresh </span>
          Opportunities
        </p>
        <p className="findJobDescr">Most people are looking for this kind of job</p>
        <div className="colorCategories">
          <p className="colorCat greenCat">Software Engeneering</p>
          <p className="colorCat blueCat">Product</p>
          <p className="colorCat orangeCat">Marketing</p>
          <p className="colorCat purpleCat">People, HR, Recruitment</p>
          <p className="colorCat purpleCat">Sales & Account Management</p>
          <p className="colorCat greenCat">Design</p>
          <p className="colorCat blueCat">Finance, Legal & Compliance</p>
          <p className="colorCat orangeCat">Operations & Strategy</p>
          <p className="colorCat greenCat">Data</p>
        </div>
        <Button
          text="Find a job"
          showArrow
          backgroundColor="rgb(61,66,90)"
          color="rgb(255,255,255)"
        />
        <div className="createResumeDiv">
          <div className="createResumeDescr">
            <p className="createResTitle">Create a Resume</p>
            <p className="createResDescr">
              Our hiring process is so simple and easy to do, just follow the steps and you’re done!
            </p>
            <Button
              text="Get started"
              showArrow
              backgroundColor="rgb(61,66,90)"
              color="rgb(255,255,255)"
            />
          </div>
          <img className="createResImg" src="/images/createResMan.png" alt="" />
        </div>
      </main>
    </>
  );
}
