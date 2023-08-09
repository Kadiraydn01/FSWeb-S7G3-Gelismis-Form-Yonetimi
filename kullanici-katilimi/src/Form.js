import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";

const Form1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const schema = Yup.object().shape({
    name: Yup.string().required("İsim yazmanız gerekli"),
    email: Yup.string()
      .email("Geçersiz e-posta!")
      .required("Lütfen e-posta adresini giriniz!"),
    password: Yup.string().required("Lütfen şifrenizi giriniz!"),
    terms: Yup.boolean().oneOf([true]),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await schema.validate(
        { name, email, password, terms },
        { abortEarly: false }
      );

      const response = await axios.post("https://reqres.in/api/users", {
        name,
        email,
        password,
      });

      console.log("Response:", response.data);

      setUsers([...users, response.data]); // users dizisine yeni kullanıcıyı ekleyin
      setName("");
      setEmail("");
      setPassword("");
      setTerms(false);
      setErrors({});
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="login-form">
      <h1>Üyelik İçin ↓</h1>
      <Form className="form-data" onSubmit={handleSubmit}>
        <FormGroup className="name-form">
          <Label for="name">İsim:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.name}</span>
        </FormGroup>

        <FormGroup className="mail-form">
          <Label for="email">E-mail:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.email}</span>
        </FormGroup>

        <FormGroup>
          <Label for="password">Şifre:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.password}</span>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              id="terms"
              name="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Okudum anladım onaylıyorum!
          </Label>
          <span style={{ color: "red" }}>{errors.terms}</span>
        </FormGroup>

        <Button type="submit">Üye Ol</Button>
      </Form>

      <h2>Üyeler:</h2>
      <ul className="ullar">
        {users.map((user, index) => (
          <li key={index}>
            <p>İsim: {user.name}</p> <p>E-mail: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Form1;
