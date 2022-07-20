import * as React from "react";
import Img from "../../assets/imgs/Project.png";
import { IUserDTO } from "../../interfaces/AllInterfaces";
import {
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
} from "@fluentui/react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useUser } from "../../context/UserContext";
import "./LoginPage.scss";

const options: IDropdownOption[] = [
  { key: "vn", text: "Vietnamese" },
  { key: "eng", text: "English" },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};

const initialValues: IUserDTO = {
  id: "",
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  requestServiceId: 1,
  roles: ["user"],
};

function LoginPage() {
  const { create } = useUser();

  const onSubmit = async (
    value: IUserDTO,
    helper: FormikHelpers<IUserDTO>
  ) => {
    const requestBody = {
      ...initialValues,
      ...value,
    };

    try {
      // await create(requestBody);
      console.log(requestBody);
      
    } catch (e: any) {
      const response = e.response;
      if (response?.status === 400) {
        helper.setErrors(response.data.errors);
      } else alert("An error has occurred");
    }
  };
  const theme = getTheme();
  
  return (
    <div className="loginPage">
      <div className="loginPage__panel" style={{boxShadow: theme.effects.elevation8}}>
        <div className="loginPage__panel__title">
          <Text variant="xxLarge"> Login with your ToTechs Account</Text>
        </div>
        <div className="loginPage__panel__login">
          <div className="loginPage__panel__login__form">
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
                  <PrimaryButton
                    type="submit"
                    text="Login"
                  />
                  <DefaultButton
                    text="Sign up"
                    href="register"
                  />
                </form>
              )}
            </Formik>
          </div>
          <div className="loginPage__panel__login__logo">
            <img src={Img} alt="none" />
          </div>
        </div>
        <div className="loginPage__panel__footer">
          <div className="">
            <a href="register">
              <Text>Forgot your account?</Text>
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

const validationSchema = yup.object({
});

export default LoginPage;