import styled from 'styled-components';

export const EditProfile = () => {
  return(
    <>
      <h1>Edit Profile</h1>
      <div>
        <form>
          <ProfileElement>
            <label htmlFor="firstname">Prénom:</label>
            <input type="text" id="firstname" />
          </ProfileElement>
          <ProfileElement>
            <label htmlFor="lastname">Nom:</label>
            <input type="text" id="lastname" />
          </ProfileElement>
          <ProfileElement>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
          </ProfileElement>
          <InputButton>
            <input type="button" value="Enregistrer" />
          </InputButton>
        </form>
      </div>
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
input {
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
input:hover {
  background-color: #58dbbc;
  color: #1c2b33;
}

`;