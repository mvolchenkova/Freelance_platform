import './UserCart.css';
import BasicRating from '../../materialuiComponents/ReadOnlyRating';

export default function UserCart() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { skills } = user.user;
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
              Age:
              {user.user.age}
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
              Created account: {new Date(user.user.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
          <div className="flex-column justify-between align-center">
            <p className="ReadexFont parametrs">
              <BasicRating value={5} />
            </p>
            <button className="edit-profile">
              <img className="edit-profile-img" src="./images/Editpen.png" alt="" />
            </button>
          </div>
        </div>
      </div>

      {user.user.role === 'freelancer' ? (
        <div className="skills">
          {skills.map((skill) => (
            <div key={skill.id} id="">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </article>
  );
}
