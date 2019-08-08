import React, { useState, useEffect } from "react"
import { Form, Field, withFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import styled from "styled-components"

const Welcome = styled.h1`
  font-size: 4rem;
  color: purple;
`
const Name = styled.label`
  color: purple;
  display: inline-flex;
  justify-content: center;
  margin: 5px;
`

const Button = styled.button`
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 5px;
  margin-left: 75px;
  color: white;
  background-color: blue;
  display: flex;
  justify-content: center;
`

const CheckBox = styled.label`
  display: flex;
  color: green;
  font-size: 1.2rem;
  margin: 25px;
`

const OnboardingForm = ({ touched, errors, status, values, handleSubmit }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    if (status) {
      setUser([...user, status])
    }
  }, [status])

  return (
    <div className="App">
      <Welcome>Welcome to my Kingdom</Welcome>
      <Form>
        <Name>
          Name:
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error"> {errors.name}</p>
          )}
        </Name>

        <Name>
          Password:
          <Field type="text" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </Name>

        <Name>
          Email:
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </Name>

        <CheckBox className="checkbox">
          I have Read and Accept the Terms of Service
          <Field
            type="checkbox"
            name="serviceTerms"
            checked={values.serviceTerms}
          />
        </CheckBox>

        <Button type="submit">Submit</Button>

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
