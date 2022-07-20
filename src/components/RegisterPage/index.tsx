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
import "./RegisterPage.scss";

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

function RegisterPage() {
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
    <div className="registerPage">
      <div className="panel" style={{boxShadow: theme.effects.elevation8}}>
        <div className="panel__title">
          <Text variant="xxLarge"> Create your ToTechs Account</Text>
        </div>
        <div className="panel__register">
          <div className="panel__register__form">
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
                  <PrimaryButton
                    type="submit"
                    text="Sign up"
                  />
                  <DefaultButton onClick={() => resetForm()} text="Reset" />
                </form>
              )}
            </Formik>
          </div>
          <div className="panel__register__logo">
            <img src={Img} alt="none" />
            <Text variant="xxLarge" block>
              ToTechs Corp.
            </Text>
            <Text variant="large" block>
              One account. All services.
            </Text>
          </div>
        </div>
        <div className="panel__footer">
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

const validationSchema = yup.object({
});

export default RegisterPage;
