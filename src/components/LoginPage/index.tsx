import * as React from "react";
import Img from "../../assets/imgs/Project.png";
import { ILoginModel } from "../../interfaces/AllInterfaces";
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

const initialValues: ILoginModel = {
  userName: "",
  password: "",
};

function LoginPage() {
  const { login } = useUser();

  const onSubmit = async (
    value: ILoginModel,
    helper: FormikHelpers<ILoginModel>
  ) => {
    const requestBody = {
      ...value,
    };

    try {
      const response = await login(requestBody);
      console.log(requestBody);
      console.log(`try: ${response}`);
    } catch (e: any) {
      const response = e.response;
      console.log(`catch: ${response}`);

      response?.status === 404
        ? alert("Incorrect user name or password")
        : alert("An error has occurred");
    }
  };
  const theme = getTheme();

  return (
    <div className="loginPage">
      <div
        className="loginPage__panel"
        style={{ boxShadow: theme.effects.elevation8 }}
      >
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
                    disabled={isSubmitting}
                  />
                  <DefaultButton text="Sign up" href="register" />
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

const validationSchema = yup.object({});

export default LoginPage;
