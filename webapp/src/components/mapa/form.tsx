import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "0 auto",
    },
    input: {
      margin: "10px 0",
    },
    submit: {
      margin: "20px 0",
    },
  })
);

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={classes.input}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={classes.input}
        required
      />
      <TextField
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        name="message"
        value={formData.message}
        onChange={handleChange}
        className={classes.input}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<Send />}
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;