import { useState } from "react";
import "./App.css";
import { Box, Button, Container, Input, List, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SpaceBar } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import TaskItem from "./components/TaskItem";
import { Task } from "./types/task";

const dummyTasks: Task[] = [
  {
    id: 1,
    text: "ダミータスク",
    done: false,
    isEdit: false,
  },
  {
    id: 2,
    text: "ダミータスク2",
    done: true,
    isEdit: false,
  },
];
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function App() {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<Task[]>(dummyTasks);

  const notCompleteTasks = data.filter((item) => !item.done);
  const completeTasks = data.filter((item) => item.done);

  function addTask() {
    if (input === "") return;
    const newTask = {
      id: data.length + 1,
      text: input,
      done: false,
      isEdit: false,
    };
    setData((prevData) => [...prevData, newTask]);
    setInput("");
  }
  function editTask(item: Task, value: string) {
    setData((prevData) => prevData.map((task) => (task.id === item.id ? { ...task, text: value, isEdit: !item.isEdit } : task)));
    if (item.isEdit && value !== item.text) toast.success("編集しました");
  }
  function completeTask(item: Task) {
    setData((prevData) => prevData.map((task) => (task.id === item.id ? { ...task, done: !task.done } : task)));
    toast.success("完了しました");
  }
  function deleteTask(item: Task) {
    const newData = data.filter((prevData) => prevData.id !== item.id);
    setData(newData);
    toast.success("削除しました");
  }
  function backTask(item: Task) {
    setData((prevTask) => prevTask.map((task) => (task.id === item.id ? { ...task, done: !task.done } : task)));
    toast.success("完了しました");
  }

  return (
    <Container maxWidth="sm">
      <Toaster />
      <Typography variant="h1" gutterBottom>
        MUI
      </Typography>
      <Demo>
        <Box paddingBlock={2} paddingInline={4}>
          <Typography color="black" variant="h4" component={"h2"}>
            Task List
          </Typography>
          <SpaceBar />
          <Grid container spacing={2} gap={2} sx={{ paddingTop: 2 }}>
            <Grid size={8}>
              <Input color="primary" type="text" placeholder={"test"} value={input} onChange={(e) => setInput(e.target.value)} sx={{ width: "100%" }} />
            </Grid>
            <Grid size={4}>
              <Button type="button" onClick={addTask} variant="contained" sx={{ width: "100%" }}>
                Add
              </Button>
            </Grid>
            <Grid size={12}>
              <List sx={{ flexGrow: 1, width: "100%" }}>
                {notCompleteTasks.length > 0 ? (
                  notCompleteTasks.map((item) => <TaskItem key={item.id} data={item} completeTask={completeTask} editTask={editTask} deleteTask={deleteTask} backTask={backTask} />)
                ) : (
                  <Typography textAlign="center" color="gray" padding={2} width={"100%"}>
                    タスクがありません
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
          <SpaceBar />
          <Typography color="black" variant="h4" component={"h2"}>
            Complete Tasks
          </Typography>
          <SpaceBar />
          <Grid container spacing={2} gap={2} sx={{ paddingTop: 2 }}>
            <Grid size={12}>
              <List sx={{ width: "100%" }}>
                {completeTasks.map((item) => (
                  <TaskItem key={item.id} data={item} completeTask={completeTask} editTask={editTask} deleteTask={deleteTask} backTask={backTask} />
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Demo>
    </Container>
  );
}

export default App;
