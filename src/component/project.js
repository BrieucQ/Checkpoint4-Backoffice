import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/project.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Project() {
  const classes = useStyles();
  const [projects, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      lien: "",
      front: "",
      back: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/Project")
      .then((response) => {
        setProject(response.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [isLoading]);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/Project", data)
      .then((response) => setProject([...projects, response.data]));
    setIsLoading(true);
    reset();
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/Project/${id}`)
      .then(setIsLoading(true))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" ref={register} placeholder="name" />
          <input name="image" ref={register} placeholder="image" />
          <input name="description" ref={register} placeholder="description" />
          <input name="lien" ref={register} placeholder="lien" />
          <input name="front" ref={register} placeholder="Front" />
          <input name="back" ref={register} placeholder="Back" />
          <Button variant="contained" color="primary" type="submit">
            Envoyer
          </Button>
        </form>
      </div>

      <div>
        {projects.map((project) => (
          <div className="projects">
            <p key={project.id}>{project.name}</p>
            <img src={project.image} alt={project.name} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDelete(project.id)}
            >
              Supprimer
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
