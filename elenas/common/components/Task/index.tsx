import * as React from "react";
import { useState } from "react";
import { taskType } from "@common/apis/types/task/taskType";
import { Button, Box, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import TaskList from "./List";
import TaskForm from "./Form";
import newTask from "@common/apis/services/task/newTask";
import editTask from "@common/apis/services/task/editTask";
import deleteTask from "@common/apis/services/task/deleteTask";
import getTasks from "@common/apis/services/task/getTasks";
import { useEffect } from "react";
import getErrorData from "@common/http/getErrorData";
import getErrorCode from "@common/http/getErrorCode";
import { SubmitHandler, useForm } from "react-hook-form";
import { list } from "@common/apis/types/list";

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<list<taskType>>();
  const [taskToEdit, setTaskToEdit] = useState<taskType>();


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
      if (item.pk) {
        await editTask({
          title: item.title,
          description: item.description,
          state: item.state,
          pk: item.pk,
        });
        refetchData();
      } else {
        await newTask(item);
        refetchData();
      }
      setOpenModal(false);
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

  const removeTask = async (pk: number) => {
    try {
      if (confirm("¿Estas seguro de eliminar esta tarea?")) {
        await deleteTask(pk);
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

      <TaskForm
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        taskToEdit={taskToEdit}
      />
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
