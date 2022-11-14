import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import { taskType } from "@common/apis/types/task/taskType";
import { list } from "@common/apis/types/list";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface IProps {
  tasks?: list<taskType>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskToEdit: React.Dispatch<React.SetStateAction<taskType | undefined>>;
  removeTask: (pk: string) => void;
}

const TaskList = (props: IProps) => {
  const { tasks, setOpenModal, setTaskToEdit, removeTask } = props;

  const columns: GridColumns<taskType> = [
    { field: "title", headerName: "Titulo", flex: 2 },
    { field: "description", headerName: "Descripción", flex: 3 },
    { field: "createDate", headerName: "Fecha de creación", flex: 2 },
    { field: "updateDate", headerName: "Fecha de actualización", flex: 2 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setTaskToEdit(params.row);
            setOpenModal(true);
          }}
          label="Delete"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            removeTask(params.row.pk);
          }}
          label="Delete"
        />
      ],
    },
  ];

  return (
    <DataGrid
      rows={tasks?.results ?? []}
      columns={columns}
      getRowId={(row) => row.pk}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      autoHeight
    />
  );
};

export default TaskList;
