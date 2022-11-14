import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { taskType } from "@common/apis/types/task/taskType";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskToEdit?: taskType;
  onSubmit: (companies: taskType) => void;
}

const TaskForm = (props: IProps) => {
  const { openModal, setOpenModal, taskToEdit } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<taskType>();
  const onSubmit: SubmitHandler<taskType> = (data) => {
    if (taskToEdit) data.pk = taskToEdit.pk;
    props.onSubmit(data);
  };

  React.useEffect(() => {
    if (taskToEdit) reset(taskToEdit);
    else
      reset({
        title: "",
        description: "",
      });
  }, [taskToEdit]);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`${taskToEdit ? "Editar" : "Crear"} tarea`}</DialogTitle>
        <DialogContent>
          {taskToEdit && (
            <FormControl error={errors.state ? true : false} variant="standard">
              <FormControlLabel
                control={
                  <Checkbox
                    id="state"
                    {...register("state", { required: false, value: taskToEdit.state })}
                  />
                }
                label="Tarea completa"
              />
            </FormControl>
          )}
          <br/>
          <FormGroup>
            <FormControl error={errors.title ? true : false} variant="standard">
              <InputLabel htmlFor="title">Titulo de la tarea</InputLabel>
              <Input
                id="name"
                maxRows={50}
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl
              error={errors.description ? true : false}
              variant="standard"
            >
              <InputLabel htmlFor="description">
                Descripción de la tarea
              </InputLabel>
              <Input
                id="description"
                maxRows={50}
                {...register("description", { required: true })}
              />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
