import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserState } from "../../hooks/useUserState";


//Horizontal steeper by material UI
const steps = ["Nombre y edad", "Sobre ti", "Tus expectativas", "Linkedin"];

export default function FormNewUser() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const {user, handleUserCreated} = useUserState();
  const { item: userToCreate, saveItem: saveUserToCreate } = useLocalStorage(
    "USER_V1",
    [
      {
        name: "",
        age: "",
        about: "",
        expectations: "",
        linkedin: ""
      },
    ]
  );


  const fullNameNewUser = useRef();
  const ageNewUser = useRef();
  const aboutNewUser = useRef();
  const expectationsNewUser = useRef();
  const linkedinNewUser = useRef();

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const next = () => {
      setShowAlert(false);
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    switch (activeStep) {
      case 0:
        if (fullNameNewUser.current.value && ageNewUser.current.value) {
          const newUser = [...userToCreate];
          newUser[0].name = fullNameNewUser.current.value;
          newUser[0].age = ageNewUser.current.value;
          saveUserToCreate(newUser);
          next();
        } else {
          setShowAlert(true);
        }
        break;

      case 1:
        if (aboutNewUser.current.value) {
          const newUser = [...userToCreate];
          newUser[0].about = aboutNewUser.current.value;
          next();
        } else {
          setShowAlert(true);
        }
        break;

      case 2:
        if (expectationsNewUser.current.value) {
          const newUser = [...userToCreate];
          newUser[0].expectations = expectationsNewUser.current.value;
          next();
        } else {
          setShowAlert(true);
        }
        break;

      case 3:
        if (linkedinNewUser.current.value) {
          const newUser = [...userToCreate];
          newUser[0].linkedin = linkedinNewUser.current.value;
        }
        next();
        handleNewUser();
        break;

      default:
        break;
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const coursesRedirection = () => {
    navigate("/courses");
  };

  const profileRedirection = () => {
    navigate("/profile");
  };

  const handleNewUser = () => {
    const createNewUser = async () => {
      console.log(
        userToCreate[0].name,
        userToCreate[0].age,
        userToCreate[0].about,
        userToCreate[0].expectations,
        userToCreate[0].linkedin,
        user.email,
        user.picture
      );
      
      const options = {
        method: 'POST',
        url: 'https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/createUser',
        headers: {'Content-Type': 'application/json'},
        data: {
          userEmail: user.email,
          name: userToCreate[0].name,
          about: userToCreate[0].about,
          expectations: userToCreate[0].expectations,
          linkedin: userToCreate[0].linkedin,
          age: userToCreate[0].age,
          avatar: user.picture,
        }
      };
      
      await axios.request(options).then(function (response) {
        handleUserCreated(response.data.userId);
      }).catch(function (error) {
        console.error(error);
      });

    }
    createNewUser();
  };

  const getStepComponent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              style={{ width: "100%", margin: "10px" }}
              type="text"
              label="Nombre completo"
              variant="outlined"
              required
              inputRef={fullNameNewUser}
            />
            <TextField
              style={{ width: "100%", margin: "10px" }}
              type="number"
              label="Edad"
              variant="outlined"
              required
              inputRef={ageNewUser}
            />
          </div>
        );
      case 1:
        return (
          <TextField
            style={{ width: "100%", margin: "10px" }}
            type="area"
            label="Sobre ti"
            variant="outlined"
            multiline
            rows={5}
            required
            inputRef={aboutNewUser}
          />
        );
      case 2:
        return (
          <TextField
            style={{ width: "100%", margin: "10px" }}
            type="area"
            label="Tus expectativas"
            variant="outlined"
            multiline
            rows={5}
            required
            inputRef={expectationsNewUser}
          />
        );
      case 3:
        return (
          <TextField
            style={{ width: "100%", margin: "10px" }}
            type="url"
            label="Linkedin"
            variant="outlined"
            required
            inputRef={linkedinNewUser}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const handleAlert = () => {
    return (
      <Collapse in={showAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Has de llenar todos los campos
        </Alert>
      </Collapse>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="hidden md:block">
        <Stepper activeStep={activeStep}>
          {/* Map through the steps array and create a step for each one in the top of the form */}
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Haz creado con éxito tu perfil
          </Typography>
          <Button onClick={coursesRedirection}>Ir a Cursos</Button>
          <Button onClick={profileRedirection}>Ir a Perfil</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepComponent(activeStep)}
          {showAlert ? handleAlert() : null}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Saltar
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
