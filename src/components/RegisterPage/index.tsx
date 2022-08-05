import * as React from "react";
import Img from "../../assets/imgs/Project.png";
import { IUserDTO } from "../../interfaces/AllInterfaces";
import {
  ActionButton,
  Text,
  TextField,
  PrimaryButton,
  DefaultButton,
  ProgressIndicator,
  DatePicker,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  getTheme,
  Persona,
  PersonaSize,
  PersonaInitialsColor,
  Dialog,
  DialogContent,
  DialogType,
  DialogFooter,
  Stack,
  IStackStyles,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useUser } from "../../context/UserContext";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const options: IDropdownOption[] = [
  { key: "vn", text: "Vietnamese" },
  { key: "eng", text: "English" },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: "Preview Avatar",
  closeButtonAriaLabel: "Close",
};

const stackStyles: IStackStyles = {
  root: {
    width: "100%",
    overflow: "hidden",
  },
};

const openUploadDialog = () => {
  document.getElementById("uploadAvatar")!.click();
};

const initialValues: IUserDTO = {
  id: "",
  guid: "",
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePic: undefined,
  phoneNumber: "",
  requestServiceId: 1,
  roles: ["645b2d62-e2c5-4d7a-bb34-b70c468ac46b"],
  // roles: [""],
};

function RegisterPage() {
  const [avatar, setAvatar] = useState();
  const [avatarType, setAvatarType] = useState<string>("");
  const [avatarName, setAvatarName] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string | undefined>();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const { register } = useUser();
  let navigate = useNavigate();

  useEffect(() => {
    if (!avatar) {
      setPreviewURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(avatar);
    setPreviewURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const onAvatarUpload = (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.log("image undefined");
      return;
    }
    const file = event.target.files[0];
    console.log(file?.name);
    console.log(file?.type);
    

    setAvatar(file);
    setAvatarName(file.name);
    setAvatarType(file.type);
  };

  const onSubmit = async (value: IUserDTO, helper: FormikHelpers<IUserDTO>) => {
    const requestBody = {
      ...initialValues,
      ...value,
    };

    try {
      let formData = new FormData();

      if (avatar) {
        let blob = new Blob([avatar], {type: avatarType});

        formData.append("avatar", blob, avatarName);
      }

      const response = await register(
        requestBody,
        avatar ? formData : undefined
      );

      if (response === null) alert("Cannot load data");
      else {
        navigate("/projects");
      }
    } catch (e: any) {
      const response = e.response;
      if (response?.status === 400) {
        alert(`Errors occur: ${response.message}`);
      } else if (response?.status === 404) {
        alert(`Not found: ${response.message}`);
      } else alert("An error has occurred");
    }
  };
  const theme = getTheme();

  return (
    <div className="registerPage">
      <div
        className="registerPage__panel"
        style={{ boxShadow: theme.effects.elevation8 }}
      >
        <div className="registerPage__panel__title">
          <Text variant="xxLarge"> Create your ToTechs Account</Text>
        </div>
        <div className="registerPage__panel__register">
          <div className="registerPage__panel__register__form">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                resetForm,
                values,
                isValid,
                isSubmitting,
                errors,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => (
                <form className="form" onSubmit={handleSubmit}>
                  <TextField
                    label="User Name"
                    value={values.userName}
                    required={true}
                    errorMessage={errors.userName}
                    onChange={(_e, val) => setFieldValue("userName", val)}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Password"
                    value={values.password}
                    type="password"
                    required={true}
                    errorMessage={errors.password}
                    onChange={(_e, val) => setFieldValue("password", val)}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Firstname"
                    value={values.firstName}
                    required={true}
                    errorMessage={errors.firstName}
                    onChange={(_e, val) => setFieldValue("firstName", val)}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Lastname"
                    value={values.lastName}
                    required={true}
                    errorMessage={errors.lastName}
                    onChange={(_e, val) => setFieldValue("lastName", val)}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Email"
                    value={values.email}
                    inputMode="email"
                    required={true}
                    errorMessage={errors.email}
                    onChange={(_e, val) => setFieldValue("email", val)}
                    disabled={isSubmitting}
                  />
                  <TextField
                    label="Phone Number"
                    value={values.phoneNumber}
                    inputMode="decimal"
                    required={true}
                    errorMessage={errors.phoneNumber}
                    onChange={(_e, val) => setFieldValue("phoneNumber", val)}
                    disabled={isSubmitting}
                  />
                  <div className="form__avatar">
                    <ActionButton
                      onClick={openUploadDialog}
                      iconProps={{ iconName: "Photo2Add" }}
                      allowDisabledFocus
                    >
                      Upload Avatar
                    </ActionButton>
                    <Persona
                      size={PersonaSize.size120}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        toggleHideDialog();
                      }}
                      initialsColor={PersonaInitialsColor.blue}
                      {...{
                        imageUrl: previewURL ? previewURL : "",
                        imageInitials: "",
                        text: `${values.firstName + " " + values.lastName}`,
                        secondaryText: "Totechs User",
                      }}
                    ></Persona>
                    <input
                      placeholder="Upload Avatar"
                      type="file"
                      name="image"
                      id="uploadAvatar"
                      style={{ display: "none" }}
                      onChange={onAvatarUpload}
                      disabled={isSubmitting}
                      accept="image/jpeg, image/png, image/jpg, image/gif"
                    />
                  </div>
                  <PrimaryButton
                    type="submit"
                    text="Sign up"
                    disabled={isSubmitting}
                  />
                  <DefaultButton
                    onClick={() => {
                      resetForm();
                      setAvatar(undefined);
                    }}
                    text="Reset"
                    disabled={isSubmitting}
                  />
                </form>
              )}
            </Formik>
            <Dialog
              onDismiss={toggleHideDialog}
              hidden={hideDialog}
              dialogContentProps={dialogContentProps}
              styles={{
                main: {
                  selectors: {
                    ["@media (min-width: 0px)"]: {
                      width: 400,
                      minWidth: 400,
                    },
                    ["@media (min-width: 768px)"]: {
                      width: 680,
                      minWidth: 680,
                    },
                  },
                },
              }}
            >
              <DialogContent>
                <Stack styles={stackStyles}>
                  <Stack.Item align="center">
                    <img
                      src={previewURL ? previewURL : ""}
                      alt="No avatar selected"
                      style={{
                        maxWidth: "100%",
                        objectFit: "scale-down",
                      }}
                    />
                  </Stack.Item>
                </Stack>
              </DialogContent>
              <DialogFooter>
                <PrimaryButton
                  text="Choose Another Image"
                  onClick={() => {
                    toggleHideDialog();
                    openUploadDialog();
                  }}
                />
                <DefaultButton onClick={toggleHideDialog} text="Close" />
              </DialogFooter>
            </Dialog>
          </div>
          <div className="registerPage__panel__register__logo">
            <img src={Img} alt="none" />
            <Text variant="xxLarge" block>
              ToTechs Corp.
            </Text>
            <Text variant="large" block>
              One account. All services.
            </Text>
          </div>
        </div>
        <div className="registerPage__panel__footer">
          <div className="">
            <Text>Have an account? </Text>
            <a href="login">
              <Text>Sign in</Text>
            </a>
          </div>
          <div className="">
            <Dropdown
              options={options}
              defaultSelectedKey="vn"
              styles={dropdownStyles}
            ></Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

const validationSchema = yup.object({});

export default RegisterPage;
