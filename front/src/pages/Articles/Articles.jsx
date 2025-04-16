
import Header from '../../compCustomer/Header/Header'
import '../Articles/Articles.css'
import art1 from '../../images/articles/art1.png'
import art2 from '../../images/articles/art2.png'
import art3 from '../../images/articles/art3.png'
import art4 from '../../images/articles/art4.png'
import art5 from '../../images/articles/art5.png'
import art6 from '../../images/articles/art6.png'
import art7 from '../../images/articles/art7.png'
import art8 from '../../images/articles/art8.png'
import art9 from '../../images/articles/art9.png'

export default function Articles(){
    return(
        <>
            <Header/>
            <main className='blogMain ReadexFont'>
                <p className="title">Recent Articles</p>
                <p className='subtitle'>Newest update article from developli</p>
                <div className='articleCards'>
                    <div>
                        <img src={art1} alt="" />
                        <div className='artdate'>
                            <p>16 May 2022</p>
                            <p>Career Tips</p>
                        </div>
                        <p>How intrapreneurship can help you stand out at work </p>
                    </div>
                    <div>
                        <img src={art2} alt="" />
                        <div className='artdate'>
                            <p>3 Sep 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>How to Know Your Resume Is Ready to be Submitted</p>
                    </div>
                    <div>
                        <img src={art3} alt="" />
                        <div className='artdate'>
                            <p>7 Feb 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>How to Sharpen Your Social Skills When You WFH</p>
                    </div>
                    <div>
                        <img src={art4} alt="" />
                        <div className='artdate'>
                            <p>15 Jun 2022</p>
                            <p>Career Tips</p>
                        </div>
                        <p>How to Use Your Resume to Tell a Story</p>
                    </div>
                    <div>
                        <img src={art5} alt="" />
                        <div className='artdate'>
                            <p>11 Apr 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>The 10 Best Global Cities for Digital Nomads</p>
                    </div>
                    <div>
                        <img src={art6} alt="" />
                        <div className='artdate'>
                            <p>31 Mar 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>How to End a Networking Conversation Tactfully</p>
                    </div>
                    <div>
                        <img src={art7} alt="" />
                        <div className='artdate'>
                            <p>15 Jun 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>How to Follow up on Freelance Pitches Without Being Annoying</p>
                    </div>
                    <div>
                        <img src={art8} alt="" />
                        <div className='artdate'>
                            <p>21 Aug 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>Girl Finds Career Advancement With Remote Job</p>
                    </div>
                    <div>
                        <img src={art9} alt="" />
                        <div className='artdate'>
                            <p>7 Feb 2022</p>
                            <p>Interviews</p>
                        </div>
                        <p>How to Avoid Overeating When You Work at Home</p>
                    </div>
                </div>
            </main>
        </>
        
    )
}
