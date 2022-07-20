import * as React from "react";
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

import { IProjectDTO } from "../../../interfaces/AllInterfaces";

interface CreateUpdateProjectFormProps {
  initialValue: IProjectDTO;
  isHidden: boolean;
  onClosePanel?: () => void;
  onSubmit?: (item: IProjectDTO) => Promise<any>;
}

const CreateUpdateProjectForm = ({
  initialValue,
  isHidden,
  onClosePanel,
  onSubmit,
}: CreateUpdateProjectFormProps) => {
  const handleSubmit = async (
    value: IProjectDTO,
    helper: FormikHelpers<IProjectDTO>
  ) => {
    const requestBody = {
      ...initialValue,
      ...value,
    };

    try {
      onSubmit && (await onSubmit(requestBody));
      onClosePanel && onClosePanel();
    } catch (e: any) {
      const response = e.response;
      if (response?.status === 400) {
        helper.setErrors(response.data.errors);
      } else alert("An error has occurred");
    }
  };
  return (
    <Formik
      initialValues={initialValue}
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
        <Dialog
          onDismiss={onClosePanel}
          hidden={isHidden}
          styles={{
            main: {
              selectors: {
                ["@media (min-width: 768px)"]: {
                  width: 720,
                  minWidth: 720,
                },
              },
            },
          }}
        >
          <DialogContent title="Create New Project">
            <form className="form" onSubmit={handleSubmit}>
              <TextField
                label="Project Name"
                placeholder="This will be Project's Title"
                value={values.projectName}
                required={true}
                errorMessage={errors.projectName}
                onChange={(_e, val) => setFieldValue("projectName", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Project Logo"
                placeholder="Logo's URL"
                value={values.projectLogo}
                required={true}
                errorMessage={errors.projectLogo}
                onChange={(_e, val) => setFieldValue("projectLogo", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Project Background"
                placeholder="Background's URL"
                value={values.projectBackground ? values.projectBackground : ""}
                required={false}
                errorMessage={errors.projectBackground}
                onChange={(_e, val) => setFieldValue("projectBackground", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Clients"
                placeholder="Clients"
                value={values.clients ? values.clients : ""}
                required={false}
                errorMessage={errors.clients}
                onChange={(_e, val) => setFieldValue("clients", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="GitHub Link"
                placeholder="GitHub"
                value={values.githubLink ? values.githubLink : ""}
                required={false}
                errorMessage={errors.githubLink}
                onChange={(_e, val) => setFieldValue("githubLink", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Figma Link"
                placeholder="Figma"
                value={values.figmaLink ? values.figmaLink : ""}
                required={false}
                errorMessage={errors.figmaLink}
                onChange={(_e, val) => setFieldValue("figmaLink", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Microsoft Store Link"
                placeholder="Microsoft Store"
                value={
                  values.microsoftStoreLink ? values.microsoftStoreLink : ""
                }
                required={false}
                errorMessage={errors.microsoftStoreLink}
                onChange={(_e, val) => setFieldValue("microsoftStoreLink", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Google Play Link"
                placeholder="Google Play"
                value={values.googlePlayLink ? values.googlePlayLink : ""}
                required={false}
                errorMessage={errors.googlePlayLink}
                onChange={(_e, val) => setFieldValue("googlePlayLink", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="App Store Link"
                placeholder="App Store"
                value={values.appStoreLink ? values.appStoreLink : ""}
                required={false}
                errorMessage={errors.appStoreLink}
                onChange={(_e, val) => setFieldValue("appStoreLink", val)}
                disabled={isSubmitting}
              />
              <DatePicker
                label="Starting Date"
                isRequired
                placeholder="Select starting date..."
                onSelectDate={(val) =>
                  setFieldValue("startTime", val?.toISOString())
                }
                disabled={isSubmitting}
              />
              <DatePicker
                label="Ending Date"
                placeholder="Select deadline..."
                onSelectDate={(val) =>
                  setFieldValue("deadLine", val?.toISOString())
                }
                disabled={isSubmitting}
              />
              <TextField
                label="Tech Lead"
                placeholder="Project Tech Lead's ID"
                type="number"
                value={values.techLead ? values.techLead.toString() : ""}
                required={true}
                errorMessage={errors.techLead}
                onChange={(_e, val) => setFieldValue("techLead", val)}
                disabled={isSubmitting}
              />
              <TextField
                label="Description"
                multiline
                rows={3}
                value={values.about ? values.about : ""}
                onChange={handleChange("about")}
                disabled={isSubmitting}
              />
            </form>
          </DialogContent>
          <DialogFooter>
            <PrimaryButton type="submit" onClick={submitForm} text="Save" />
            <DefaultButton onClick={() => resetForm()} text="Reset" />
            <DefaultButton onClick={onClosePanel} text="Cancel" />
          </DialogFooter>
        </Dialog>
      )}
    </Formik>
  );
};

const validationSchema = yup.object({
  projectName: yup.string().required("Project Name is required"),
});

export default CreateUpdateProjectForm;
