import * as React from "react";
import { UserDTO } from "../../interfaces/AllInterfaces";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  ProgressIndicator,
  Dialog,
  DialogFooter,
  DialogContent,
  DatePicker,
} from "@fluentui/react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

const initialValues: UserDTO = {
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
  const handleSubmit = async (
    value: UserDTO,
    helper: FormikHelpers<UserDTO>
  ) => {
    const requestBody = {
      ...value,
    };

    try {
    } catch (e: any) {
      const response = e.response;
      if (response?.status === 400) {
        helper.setErrors(response.data.errors);
      } else alert("An error has occurred");
    }
  };

  return (
    <div className="registerPage">
      <div className="registerPanel">
        <div className="registerPanel__form">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              resetForm,
              submitForm,
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
                <PrimaryButton type="submit" onClick={submitForm} text="Sign up" />
                <DefaultButton onClick={() => resetForm()} text="Reset" />
              </form>
            )}
          </Formik>
        </div>
        <div className="registerPanel__logo"></div>
      </div>
    </div>
  );
}

const validationSchema = yup.object({
  projectName: yup.string().required("Project Name is required"),
});

export default RegisterPage;
