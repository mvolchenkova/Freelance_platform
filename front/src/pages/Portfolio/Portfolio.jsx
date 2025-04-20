import './Portfolio.css';
import Header from '../../compCustomer/Header/Header';
import Button from '../../materialuiComponents/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updPortfolio, getByUserId } from '../../store/Slices/portfolioSlice';

export default function Portfolio() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(()=>{
    dispatch(getByUserId(user.user.id))
    },[dispatch])
  
  const {portfolio, error, statusPort} = useSelector((state)=>state.portfolio)

  const [phone, setphone] = useState(portfolio.phone ? portfolio.phone : '');
  const [skills, setskills] = useState(portfolio.skills ?portfolio.skills : '');
  const [workExperience, setexperience] = useState(portfolio.workExperience ?portfolio.workExperience : '');
  const [education, seteducation] = useState(portfolio.education ? portfolio.education : '');

  const portId = portfolio.portfolioId
  
  useEffect(() => {
    if (portfolio) {
      setphone(portfolio.phone || '');
      setskills(portfolio.skills || '');
      setexperience(portfolio.workExperience || '');
      seteducation(portfolio.education || '');
    }
  }, [portfolio]);
  

  
  const handleChangePhone = (e) => {
    setphone(e.target.value);
  };
  const handleChangeSkills = (e) => {
    setskills(e.target.value);
  };
  const handleChangeExperience = (e) => {
    setexperience(e.target.value);
  };
  const handleChangeEducation = (e) => {
    seteducation(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(updPortfolio( {phone, skills, workExperience, education, portId} ))
  }
  return (
    <>
     <Header/>
     <section className='portDiv ReadexFont'>
      <h2>Fill Out Your Portfolio</h2>
        <form className="portfolioForm">
          <div className="formGroup">
            <label>Phone:</label>
            <input type="tel" name="phone" id="phone" required value={phone}
            onChange={handleChangePhone}/>
          </div>
          <div className="formGroup">
            <label>Skills:</label>
            <textarea name="skills" id="skills" required value={skills}
            onChange={handleChangeSkills}/>
          </div>
          <div className="formGroup">
            <label>Experience:</label>
            <textarea name="experience" id="experience" required value={workExperience}
            onChange={handleChangeExperience}/>
          </div>
          <div className="formGroup">
            <label>Education:</label>
            <textarea name="education" id="education" required value={education}
            onChange={handleChangeEducation}/>
          </div>
          <Button
            type="submit"
            text="Submit Portfolio"
            showArrow
            backgroundColor="rgb(61,66,90)"
            color="rgb(255,255,255)"
            func={handleSubmit}
          />
        </form>
     </section>
      
    </>
  );
}
