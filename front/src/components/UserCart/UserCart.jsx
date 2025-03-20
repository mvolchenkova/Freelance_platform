import './UserCart.css'

export default function UserCart(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user.user);
    const skills = user.user.skills
    return(
        <article className='user-cart flex-row align-center'>
              <div className='con-img'>
                    <div className='user-img'>
                    <img 
                        src={user && user.img ? user.img : './images/unauthorazedUser.avif'} 
                        alt="User-avatar" 
                    />
                    </div>
              </div>
              <div>
                    <div className='user-information'>
                        <p className='ReadexFont parametrs'>Name: {user.user.name}</p>
                        <p className='ReadexFont parametrs'>Age: {user.user.age}</p>
                        <p className='ReadexFont parametrs'>Nickname: {user.user.login}</p>
                        <p className='ReadexFont parametrs'>Email: {user.user.email}</p>
                    </div>
                    {user.user.role==='freelancer' ?
                        (
                            <div className='skills'>
                                {skills.map(skill =>(
                                    <div id=''>

                                    </div>
                                ))}
                            </div>
                        ):(
                            <></>
                        )
                    } 
              </div>
        </article>
    )
}