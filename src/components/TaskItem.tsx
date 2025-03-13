import { Task } from "../types/task";
import { Avatar, Box, IconButton, ListItem, ListItemAvatar, TextField, Tooltip, Typography } from "@mui/material";
import { Check, Delete, Edit, KeyboardReturn } from "@mui/icons-material";
import { useState } from "react";

interface Props {
  data: Task;
  completeTask: (item: Task) => void;
  editTask: (item: Task, value: string) => void;
  deleteTask: (item: Task) => void;
  backTask: (item: Task) => void;
}

const TaskItem = ({ data, completeTask, editTask, deleteTask, backTask }: Props) => {
  const [value, setValue] = useState(data.text);
  return (
    <ListItem
      key={data.id}
      secondaryAction={
        <Box sx={{ display: "flex", gap: 1, minWidth: "140px", justifyContent: "flex-end" }}>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => deleteTask(data)}>
              <Delete />
            </IconButton>
          </Tooltip>
          {!data.done ? (
            <>
              <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => editTask(data, value)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Done" placement="top">
                <IconButton onClick={() => completeTask(data)}>
                  <Check />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Back" placement="top">
              <IconButton onClick={() => backTask(data)}>
                <KeyboardReturn />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: data.done ? "green" : "red" }}>
          <Check />
        </Avatar>
      </ListItemAvatar>
      {data.isEdit ? (
        <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      ) : (
        <Typography variant="body1" color="black">
          {data.text}
        </Typography>
      )}
    </ListItem>
  );
};

export default TaskItem;
