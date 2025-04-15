import Button from '../../materialuiComponents/Button';
import '../PoweredBy/PoweredBy.css';
export default function PoweredBy() {
  return (
    <>
      <div className="poweredByContainer">
        <div className="PoweredByDiv ReadexFont">
          <div className="description">
            <img src="../images/tabletLogo.svg" className="tabletLogo" alt="" />
            <p className="powByTitle">Powered by Developli platform</p>
            <p className="powByText">
              We are offering an alternative route towards the traditional hiring process. What do
              we want in return? Sign up and leave the rest to us.
            </p>
            <Button
              showArrow="true"
              text="Get started"
              backgroundColor="rgb(61,66,90)"
              color="white"
            ></Button>
          </div>
          <div>
            <img src="../images/tablet.svg" className="tablet" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
