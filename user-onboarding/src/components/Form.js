import React, { useState, useEffect } from "react"
import { Form, Field, withFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

const OnboardingForm = ({ touched, errors, status, values, handleSubmit }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    if (status) {
      setUser([...user, status])
    }
  }, [status])

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
        <button type="submit">Submit</button>

        {user.map(person => (
          <p key={person.id}>{person.name}</p>
        ))}
      </Form>
    </div>
  )
}

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, password, email }) {
    return {
      name: name || "",
      password: password || "",
      email: email || ""
    }
  },

  validateSchema: Yup.object().shape({
    password: Yup.string().required("ayye")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log("post api response", response)
        setStatus(response.data)
        console.log("current user", values)
      })
      .catch(error => console.log(error.response))
  }
})(OnboardingForm)

export default FormikOnboardingForm
