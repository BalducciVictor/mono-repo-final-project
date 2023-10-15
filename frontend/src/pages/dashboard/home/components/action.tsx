import styled from 'styled-components';
import { space } from '../../../../styles/const';

interface ActionButtonProps {
  imageSrc: string;
  text: string;
  dataTestId?: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    dataTestId,  
    imageSrc,
    text,
    onClick,
}) => {
  return (
    <ActionButtonStyled onClick={onClick}>
      <img src={imageSrc} />
      <ButtonText data-testid={dataTestId}>{text}</ButtonText>
    </ActionButtonStyled>
  );
};

const ButtonText = styled.div`
  margin-left: ${space.s};
`;

const ActionButtonStyled = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: white;
  max-width: 310px;
  border-radius: 8px;
  padding: ${space.s};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

{
  /* <WrapperActions>
              <ActionButton text="Creer un nouveau utilisateur" imageSrc={AddUserIllustration} onClick={() => setIsModalCreateUserOpen(true)}/>
              <PopUp isOpen={isModalCreateUserOpen} onClose={() => {setIsModalCreateUserOpen(false)}}>
                <CreateUserForm onSubmit={handleSubmitForm}/>
              </PopUp>
              <Link to='/dashboard/create-chapter'>
              <ActionButton text="Creer un nouveau cours" imageSrc={NewLeconIllustration} />
              </Link>
              <PopUp isOpen={isModalNewCourseOpen} onClose={() => {setIsModalNewCourseOpen(false)}}>
                <p>Ici form new chapter</p>
              </PopUp>
            </WrapperActions> */
}
{
  /* <UsersAndCompanies> */
}
{
  /* <div>
            <TitleH2>Listes Utilisateurs</TitleH2>
            <UserList companyId={`${user.companyId}`} userAdded={userAdded} />
            </div> */
}
{
  /* <WrapperCompany> */
}
{
  /* <TitleH2 style={{marginBottom: space.sm}}>Les entreprises</TitleH2> */
}
{
  /* <ActionButton text="Creer une nouvelle company" imageSrc={AddUserIllustration} onClick={() => setIsModalOpenCompany(true)}/> */
}
{
  /* <PopUp isOpen={isModalOpenCompany} onClose={() => {setIsModalOpenCompany(false)}}>
              <CreateCompanyForm companyName={newCompany} setCompanyName={setNewCompnay} handleSubmit={handleSubmitNewCompany}/>
            </PopUp> */
}
{
  /* <ListCompany>
              {
                allCompany.map((value: any) => {
                  return (
                    <CompanyCard key={value._id} HandleDelete={HandleDeleteCompany} HandleModifier={HandleModiferCompany} CompanyName={value.name} CompanyId={value._id} companyData={value}/>
                  );
                })
              }
            </ListCompany> */
}
{
  /* <PopUp isOpen={isModalOpenCompanyModifier} onClose={() => {setIsModalOpenCompanyModifier(false)}}>
              <ModifierCompanyForm updatedCompany={HandleModifer} companyGroupe={companyToModify} />
            </PopUp>  */
}
{
  /* </WrapperCompany> */
}
{
  /* </UsersAndCompanies> */
}
//   </>
//   :
// <div>
<>
  {/* <TitleH2>Actions</TitleH2>
              <WrapperActions>
                <ActionButton text="Creer un nouveau utilisateur" imageSrc={AddUserIllustration} onClick={() => setIsModalCreateUserOpen(true)}/>
                <PopUp isOpen={isModalCreateUserOpen} onClose={() => {setIsModalCreateUserOpen(false)}}>
                  <CreateUserForm onSubmit={handleSubmitForm}/>
                </PopUp>
                <Link to='/dashboard/create-chapter'>
                <ActionButton text="Creer un nouveau cours" imageSrc={NewLeconIllustration} />
                </Link>
                <PopUp isOpen={isModalNewCourseOpen} onClose={() => {setIsModalNewCourseOpen(false)}}>
                  <p>Ici form new chapter</p>
                </PopUp>
              </WrapperActions>
              <TitleH2>Listes Utilisateurs</TitleH2>
              <UserList companyId={`${user.companyId}`} userAdded={userAdded} /> */}
</>;
// </div>
