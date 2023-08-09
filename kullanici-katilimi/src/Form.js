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
  const [dogum, setDogum] = useState("");
  const [tcKimlik, setTcKimlik] = useState("");
  const [role, setRole] = useState("");
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
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Lütfen şifrenizi giriniz!"),
    terms: Yup.boolean().oneOf([true]),
    dogum: Yup.string().required("Doğum tarihinizi giriniz!"),
    tcKimlik: Yup.string()
      .matches(/^\d{11}$/, "Geçerli bir TC Kimlik No giriniz")
      .required("TC Kimlik No gereklidir"),
    role: Yup.string().required("Lütfen bir rol seçiniz!"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await schema.validate(
        { name, email, password, terms, dogum, tcKimlik, role },
        { abortEarly: false }
      );

      const response = await axios.post("https://reqres.in/api/users", {
        name,
        email,
        password,
        dogum,
        tcKimlik,
        role,
      });

      console.log("Response:", response.data);

      setUsers([...users, response.data]);
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
        <FormGroup className="dogum-form">
          <Label for="dogum">Doğum Tarihi</Label>
          <Input
            type="date"
            id="dogum"
            name="dogum"
            value={dogum}
            onChange={(e) => setDogum(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.dogum}</span>
        </FormGroup>

        <FormGroup className="tc-form">
          <Label for="tcKimlik">TC Kimlik No:</Label>
          <Input
            type="text"
            id="tcKimlik"
            name="tcKimlik"
            value={tcKimlik}
            onChange={(e) => setTcKimlik(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.tcKimlik}</span>
        </FormGroup>

        <FormGroup className="role-form">
          <Label for="role">Mesleğiniz</Label>
          <Input
            type="select"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Mesleği Seçiniz</option>
            <option value="role 1">CS</option>
            <option value="role 2">Boardman</option>
            <option value="role 3">Mechanic</option>
            <option value="role 4"> Avionic</option>
            <option value="role 5">Uçak Bakım Mühendisi</option>
            <option value="role 6">Uçak Bakım Yrd. Müh.</option>
          </Input>

          <span style={{ color: "red" }}>{errors.role}</span>
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
            <p>İsim: {user.name}</p> <p>E-mail: {user.email}</p>{" "}
            <p>Doğum Tarihi: {user.dogum}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Form1;
