import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Text, PrimaryButton } from "@fluentui/react";
import { IUserDTO } from "../../interfaces/AllInterfaces";

function ProfilePage() {
  const [avatar, setAvatar] = useState();
  const [imageType, setImageType] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [user, setUser] = useState<IUserDTO | null>(null);
  const { getLocalUser, uploadTotechsProfilePic } = useUser();
  let navigate = useNavigate();

  const onAvatarUpload = (event: any) => {
    if (
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      console.log("image undefined");
      return;
    }
    const file = event.target.files[0];

    if (file) {
      setAvatar(file);
      setImageName(file.name);
      setImageType(file.type);
    }
  };

  const handleUpload = async () => {
    let formData = new FormData();

    if (avatar) {
      let blob = new Blob([avatar], { type: imageType });
      console.log("avatar info:");
      console.log(imageName);
      console.log(imageType);

      formData.append("avatar", blob, imageName);

      if (user)
        try {
          const url = await uploadTotechsProfilePic(user.guid!, formData);
          console.log(url && url);
        } catch {
          alert("some error appeared");
        }
    }
  };

  useEffect(() => {
    const localUser = getLocalUser();
    console.log("profile: ", localUser);

    if (localUser) setUser(localUser);
    console.log(user);
    
    //else navigate("/login");
  }, [getLocalUser, setUser]);

  return (
    <div className="profilePage">
      <Text variant="mega" block>
        {user?.firstName + " " + user?.lastName}
      </Text>
      {console.log(user)}
      <img src={user?.profilePic!} alt="" />
      <Text variant="mega" block>
        <input
          type="file"
          name="image"
          id="uploadAvatar"
          onChange={onAvatarUpload}
          accept="image/jpeg, image/png, image/jpg, image/gif"
        />
      </Text>
      <PrimaryButton onClick={handleUpload}>Update</PrimaryButton>
    </div>
  );
}

export default ProfilePage;
