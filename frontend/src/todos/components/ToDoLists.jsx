import React, { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import taskService from '../../services/task-service';
import { ToDoListForm } from './ToDoListForm'

const STATUSES = {
  OPEN: 'open',
  DONE: 'done'
};

const getPersonalTodos = () => {
  return taskService.fetchTaskLists();
}

const areAllTasksDone = (list) => {
  const tasks = list && list.tasks;
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].status === STATUSES.OPEN)
      return false;
  }
  return true;
}

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setToDoLists)
  }, [])
  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
            {areAllTasksDone(toDoLists[key]) && <CheckboxIcon color='primary' />}
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { tasks }) => {
        const listToUpdate = toDoLists[id]
        taskService.updateTaskToList(id, { ...listToUpdate, tasks })
          .then(data => {
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, tasks }
            });
          });
      }}
    />}
  </Fragment>
}
