import Button from '../../materialuiComponents/Button';
import './StartHiring.css';

export default function StartHiring() {
  return (
    <div className="StartHiringDiv ReadexFont">
      <div className="centerDiv">
        <div>
          <p className="boostupText">
            Let’s <span className="greenText">boost up</span> your hiring process
          </p>
          <p className="boostupDescription">
            We are nost efficient and reliable souce of hiring perocess and two time faster than any
            other companies
          </p>
          <div className="StartHiringButtons">
            <Button
              text="Start hiring"
              showArrow
              backgroundColor="rgb(61,66,90)"
              color="rgb(255,255,255)"
            />
            <Button
              text="Post a job"
              showArrow
              backgroundColor="rgb(255,255,255)"
              color="rgb(127,135,100)"
            />
          </div>
        </div>
        <img src="/images/homePeople.svg" alt="" className="people" />
      </div>
    </div>
  );
}
