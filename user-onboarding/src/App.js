import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Field, withFormik, setNestedObjectValues } from "formik";

const OnboardingForm = ({ touched, errors, status, values }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <div className="App">
      <h1>New User Sign Up</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error"> {errors.name}</p>}
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <label className="checkbox">
          I have Read and Accept the Terms of Service
          <Field
            type="checkbox"
            name="serviceTerms"
            checked={values.serviceTerms}
          />
        </label>
        <button type="submit">Submit</button>;
      </Form>
    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || "",
      password: values.password || "",
      email: values.email || ""
    };
  }
})(OnboardingForm);
export default OnboardingForm;
