import * as React from "react";
import { useState } from "react";
import { taskType } from "@common/apis/types/task/taskType";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import {
  Add as AddIcon,
  DownloadForOffline as DownloadForOfflineIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import TaskList from "./List";
//import TaskForm from "./Form";
//import saveCompany from "@common/apis/services/companies/saveCompany";
//import updateCompany from "@common/apis/services/companies/updateCompany";
import getTasks from "@common/apis/services/task/getTasks";
import { useEffect } from "react";
import getErrorData from "@common/http/getErrorData";
import getErrorCode from "@common/http/getErrorCode";
import { SubmitHandler, useForm } from "react-hook-form";
import { list } from "@common/apis/types/list";
//import deleteCompany from "@common/apis/services/companies/deleteCompany";

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<list<taskType>>();
  const [taskToEdit, setTaskToEdit] = useState<taskType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskType>();
  const onSubmitSendEmail: SubmitHandler<taskType> = async (data) => {
    try {
      alert(JSON.stringify(data));
    } catch (error) {
      const code: number | null = getErrorCode(error);
      if (code === 400) {
        const data = getErrorData(error);
        if (data) {
          alert(data.detail);
        }
      } else {
        alert("Ha ocurrido un error interno");
      }
    }
  };

  const [_, set_] = useState();
  const refetchData = async () => {
    const data = await getTasks();
    if (data) {
      setTasks(data);
    }
  };

  useEffect(() => {
    refetchData();
  }, [_]);

  const onSubmit = async (item: taskType) => {
    try {
      alert("Guardado con exito");
    } catch (error) {
      const code: number | null = getErrorCode(error);
      if (code === 400) {
        const data = getErrorData(error);
        if (data) {
          alert(data.detail);
        }
      } else {
        alert("Ha ocurrido un error interno");
      }
    }
  };

  const removeTask = async (pk: string) => {
    try {
      if (confirm("¿Estas seguro de eliminar esta tarea?")) {
        //await deleteCompany(id, NIT);
        alert("Tarea eliminada correctamente");
        refetchData();
      }
    } catch (error) {
      const code: number | null = getErrorCode(error);
      if (code === 400) {
        const data = getErrorData(error);
        if (data) {
          alert(data.detail);
        }
      } else {
        alert("Ha ocurrido un error interno");
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Box
        m={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography variant="h3" style={{ color: "#5B5B5B" }}>
          Tareas
        </Typography>
      </Box>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="outlined"
          onClick={() => {
            setTaskToEdit(undefined);
            setOpenModal(true);
          }}
          startIcon={<AddIcon />}
        >
          Nueva Tarea
        </Button>
      </Box>

      {/*<TaskForm
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        companyToEdit={companyToEdit}
      />*/}
      <TaskList
        tasks={tasks}
        setOpenModal={setOpenModal}
        setTaskToEdit={setTaskToEdit}
        removeTask={removeTask}
      />
    </div>
  );
};

export default Tasks;
