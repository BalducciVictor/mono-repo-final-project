import styled from 'styled-components';

export const Profile = () => {
  return(
    <>
      <h1>Profile</h1>
      <div>
        <ProfileElement>
          <label htmlFor="firstname">Prénom:</label>
          <p id="firstname">Hugues</p>
        </ProfileElement>
        <ProfileElement>
          <label htmlFor="lastname">Nom:</label>
          <p id="lastname">Romain</p>
        </ProfileElement>
        <ProfileElement>
          <label htmlFor="email">Email:</label>
          <p id="email">hugues.romain@gmail.com</p>
        </ProfileElement>
      </div>
      <InputButton>
        <a href="/dashboard/editProfile">Modifier</a>
      </InputButton>

    </>
  );
};

const ProfileElement = styled.div`
width: 100%;
display: flex;
align-items: center;
label {
  margin-right: 10px;
}
`;

const InputButton = styled.div`
position: absolute;
top: 50px;
right: 100px;
a {
  text-decoration: none;
  color: #58dbbc;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  background-color: #1c2b33;
  cursor: pointer;
  border: 1px solid #1c2b33;
  border-radius: 5px;
  padding: 10px;
}
a:hover {
  background-color: #58dbbc;
  color: #1c2b33;
}

`;