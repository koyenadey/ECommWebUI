import { useState } from "react";

import MasterPage from "../components/master-page/MasterPage";

import ProfileEditForm from "../components/profile/ProfileEditForm";
import ProfileDisplayForm from "../components/profile/ProfileDisplayForm";
import useFetchToken from "../hook/useFetchUser";

const Profile = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  useFetchToken();

  const editProfileHandler = () => {
    setIsEditable((prev) => !prev);
  };
  const buttonText = isEditable ? "Save" : "Edit Profile";

  return (
    <MasterPage>
      {isEditable ? (
        <ProfileEditForm canEdit={setIsEditable} />
      ) : (
        <ProfileDisplayForm
          buttonText={buttonText}
          onSave={editProfileHandler}
        />
      )}
    </MasterPage>
  );
};

export default Profile;
