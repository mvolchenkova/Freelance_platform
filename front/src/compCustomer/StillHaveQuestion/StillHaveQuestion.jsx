import './StillHaveQuestion.css';

export default function StillHaveQuestion() {
  return (
    <article className="have-question">
      <div className="header-faq question">
        <p className="title-faq ReadexFont">Still Have a question?</p>
        <p className="small-letters ReadexFont width">
          If you cannot find answer to your question in our FAQ, you can always contact us. We wil
          answer to you shortly!
        </p>
      </div>
      <div className="contact-blocks">
        <div>
          <img src="./images/telephone.png" alt="" />
          <p className="ReadexFont">00966 2 6676760</p>
          <p className="ReadexFont small-letters">Our 24/7 Customer Services</p>
        </div>
        <div>
          <img src="./images/mail.png" alt="" />
          <p className="ReadexFont">support@developli.com</p>
          <p className="ReadexFont small-letters">Alternative way to get anwser faster.</p>
        </div>
        <div>
          <img src="./images/chat.png" alt="" />
          <p className="ReadexFont">Online-Chat</p>
          <p className="ReadexFont small-letters">Our community ready to help you</p>
        </div>
      </div>
    </article>
  );
}
