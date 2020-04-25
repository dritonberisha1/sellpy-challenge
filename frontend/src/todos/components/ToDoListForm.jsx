import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
});

const STATUSES = {
  OPEN: 'open',
  DONE: 'done'
};
let saveToDoListInterval;

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [tasks, setTasks] = useState(toDoList.tasks)

  const handleOnChange = (event, index) => {
    const updatedTasks = [ // immutable update
      ...tasks.slice(0, index),
      { ...tasks[index], description: event.target.value },
      ...tasks.slice(index + 1)
    ];
    setTasks(updatedTasks);

    //Only save when user stops typing for 0.5 seconds
    clearTimeout(saveToDoListInterval);
    saveToDoListInterval = setTimeout(() => saveToDoList(toDoList.id, { tasks: updatedTasks }), 500);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {tasks.map((task, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label={task.status === STATUSES.OPEN ? 'What to do?' : 'Done!'}
                disabled={task.status === STATUSES.DONE}
                value={task.description}
                onChange={event => handleOnChange(event, index)}
                className={classes.textField}
              />
              <Button
                size='small'
                color='primary'
                disabled={task.status === STATUSES.DONE}
                className={classes.standardSpace}
                onClick={() => {
                  const updatedTasks = [ // immutable delete
                    ...tasks.slice(0, index),
                    { ...tasks[index], status: STATUSES.DONE },
                    ...tasks.slice(index + 1)
                  ];
                  setTasks(updatedTasks);
                  saveToDoList(toDoList.id, { tasks: updatedTasks })
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                size='small'
                color='secondary'
                disabled={task.status === STATUSES.DONE}
                className={classes.standardSpace}
                onClick={() => {
                  const updatedTasks = [ // immutable delete
                    ...tasks.slice(0, index),
                    ...tasks.slice(index + 1)
                  ];
                  setTasks(updatedTasks);
                  saveToDoList(toDoList.id, { tasks: updatedTasks })
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTasks([...tasks, { status: STATUSES.OPEN, description: '' }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
