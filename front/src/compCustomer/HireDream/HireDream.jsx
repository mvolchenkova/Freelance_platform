import './HireDream.css';
import Button from '../../materialuiComponents/Button';

export default function HireDream() {
  return (
    <div className="hireMainDiv ReadexFont">
      <div className="hireDiv">
        <div className="hireButtonDiv">
          <p className="hireText">Hire your dream team today</p>
          <Button text="Get started" showArrow backgroundColor="rgb(61,66,90)" color="white" />
        </div>
        <img src="/images/woman.svg" alt="" />
      </div>
    </div>
  );
}
