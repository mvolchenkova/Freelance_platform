// import './Portfolio.css';
import Button from '../../materialuiComponents/Button';

export default function Portfolio() {
  return (
    <>
      <h2>Create Your Portfolio</h2>
      <form className="portfolioForm">
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="formGroup">
          <label>Email:</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="formGroup">
          <label>Phone:</label>
          <input type="tel" name="phone" id="phone" required />
        </div>
        <div className="formGroup">
          <label>Skills:</label>
          <textarea name="skills" id="skills" required />
        </div>
        <div className="formGroup">
          <label>Experience:</label>
          <textarea name="experience" id="experience" required />
        </div>
        <div className="formGroup">
          <label>Education:</label>
          <textarea name="education" id="education" required />
        </div>
        <Button
          type="submit"
          text="Submit Portfolio"
          showArrow
          backgroundColor="rgb(61,66,90)"
          color="rgb(255,255,255)"
        />
      </form>
    </>
  );
}
