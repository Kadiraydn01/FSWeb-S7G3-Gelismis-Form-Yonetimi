import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Form1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

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
    <Form>
      <h1>Üyelik İçin ↓</h1>
      <FormGroup onSubmit={handleSubmit}>
        <Label htmlFor="name">İsim:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span style={{ color: "red" }}>{errors.name}</span>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">E-mail:</Label>
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
        <Label htmlFor="password">Şifre:</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span style={{ color: "red" }}>{errors.password}</span>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="terms">
          <Input
            type="checkbox"
            id="terms"
            name="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          Okudum onaylıyorum!
        </Label>
        <span style={{ color: "red" }}>{errors.terms}</span>
      </FormGroup>

      <Button type="submit">Kayıt Ol</Button>
      <FormGroup>
        <h2>Kayıt Olanlar:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              İsim: {user.name}, E-mail: {user.email}
            </li>
          ))}
        </ul>
      </FormGroup>
    </Form>
  );
};
export default Form1;
