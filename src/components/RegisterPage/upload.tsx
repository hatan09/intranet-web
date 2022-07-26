import { Formik } from "formik";

interface IUpload{

}

const initialValues: IUpload = {}

function upload() {
  const onSubmit = () => {};
  return (
    <div className="upload">
        <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                handleSubmit,
              }) => (
                <form className="form" onSubmit={handleSubmit}>
                  <input type="file" name="file" id="file" />
                  <input type="submit" />
                </form>
              )}
            </Formik>
    </div>
  );
}

export default upload;
