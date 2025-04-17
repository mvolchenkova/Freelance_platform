import './UserCart.css';
import { useSelector } from 'react-redux';
export default function UserCart() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { status } = useSelector((state) => state.users.users);
  const userinf = useSelector((state) => state.users.inf);
  // const { skills } = user.user;
  if (status === 'loading') {
    return <p>loading</p>;
  }
  return (
    <article className="user-cart flex-column align-center">
      <div className="main-cart flex-row align-center">
        <div className="con-img">
          <div className="user-img">
            <img
              src={user && user.img ? user.img : './images/unauthorazedUser.avif'}
              alt="User-avatar"
            />
          </div>
        </div>
        <div className="user-parametrs flex-row  justify-between">
          <div className="user-information">
            <p className="ReadexFont parametrs">
              Name:
              {user.user.name}
            </p>
            <p className="ReadexFont parametrs">
              Nickname:
              {user.user.login}
            </p>
            <p className="ReadexFont parametrs">
              Email:
              {user.user.email}
            </p>
            <p className="ReadexFont parametrs">
              Salary: {userinf.salary ? userinf.salary : 'empty'}
            </p>
            <p className="ReadexFont parametrs">
              Location: {userinf.location ? userinf.location : 'no location'}
            </p>
            <p className="ReadexFont parametrs">
              Account created: {new Date(user.user.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
          <div className="user-information">
            <p className="ReadexFont parametrs">
              Description: {userinf.description ? userinf.description : 'Empty'}
            </p>
          </div>
          <div className="flex-column justify-between align-center">
            <button className="edit-profile">
              <img className="edit-profile-img" src="./images/Editpen.png" alt="" />
            </button>
          </div>
        </div>
      </div>

      {/* {user.user.role === 'freelancer' ? (
        <div className="skills">
          {skills.map((skill) => (
            <div key={skill.id} id="">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )} */}
    </article>
  );
}
