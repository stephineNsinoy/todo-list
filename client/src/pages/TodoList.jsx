import { useEffect, useState } from "react";

import GLOBALS from "../app-globals";
import isEmpty from "lodash/isEmpty";
import { Formik } from "formik";
import { useCreateTodo, useUpdateTodo, useTodos } from "../hooks";
import {
  Button,
  Checkbox,
  ControlledInput,
  IconButton,
  Text,
} from "../components";
import { iconButtonTypes, textTypes } from "../components/constants";
import { TodosService } from "../services";
import styles from "./styles.module.scss";

const TodoList = () => {
  const [editedTask, setEditedTask] = useState("");
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [numOfCompletedTasks, setNumOfCompletedTasks] = useState(0);
  const [allTodos, setAllTodos] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const { createTodo, isCreating } = useCreateTodo();
  const { updateTodo, isUpdating } = useUpdateTodo();
  const { todos, isLoading: isTodosLoading } = useTodos(
    isCreating,
    isUpdating,
    isDeleting
  );

  useEffect(() => {
    setAllTodos(todos);
    setNumOfCompletedTasks(
      todos.filter((item) => item.isCompleted).length || 0
    );
    setCheckedTasks(
      todos.filter((item) => item.isCompleted).map((item) => item.id) || []
    );
  }, [todos]);

  const validate = (values) => {
    const errors = {};

    if (!values.task) {
      errors.overall = "Enter a task.";
    }
    return errors;
  };

  if (isTodosLoading) {
    return;
  }

  return (
    <div className={styles.TodoList}>
      <Text type={textTypes.HEADING.LG}>Todo Lists</Text>

      <Formik
        initialValues={{
          task: "",
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const currentFormValues = {
            task: values.task,
          };

          const errors = validate(values);
          if (!isEmpty(errors)) {
            setErrors(errors);
            return;
          }

          const { responseCode: createTodoResponseCode } = await createTodo(
            currentFormValues
          );

          const createTodoCallBacks = {
            created: () => {
              setFieldValue("task", "");
            },
            invalidFields: () => {
              errors.overall = "Invalid input.";
              setErrors(errors);
            },
            internalError: () => {
              errors.overall = "Internal error.";
              setErrors(errors);
            },
          };

          switch (createTodoResponseCode) {
            case 201:
              createTodoCallBacks.created();
              break;
            case 400:
              createTodoCallBacks.invalidFields();
              break;
            case 500:
              createTodoCallBacks.internalError();
              break;
            default:
              break;
          }
        }}
      >
        {({ errors, values, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.TodoList_form}>
              <ControlledInput
                className={styles.TodoList_form_input}
                placeholder="Add a task..."
                name="task"
                value={values.task}
                error={errors.task}
                onChange={(e) => {
                  setFieldValue("task", e.target.value);
                }}
              />

              {errors.overall && (
                <Text
                  className={styles.TodoList_form_error}
                  colorClass={GLOBALS.COLOR_CLASSES.RED["200"]}
                  type={textTypes.BODY.SM}
                >
                  {errors.overall}
                </Text>
              )}

              <IconButton
                icon="add"
                kind={GLOBALS.BUTTON_KINDS.SUBMIT}
                className={styles.TodoList_form_buttonGroup_button}
                onClick={() => {}}
              >
                Add Todo
              </IconButton>
            </form>
          );
        }}
      </Formik>

      {allTodos.length != 0 && (
        <>
          <div className={styles.TodoList_list}>
            {allTodos.map((todo) => {
              return (
                <div key={todo.id} className={styles.TodoList_list_item}>
                  <Checkbox
                    checked={todo.isCompleted}
                    className={styles.checkbox}
                    name="task"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedTasks([...checkedTasks, todo.id]);
                      } else {
                        setCheckedTasks(
                          checkedTasks.filter((item) => item !== todo.id)
                        );
                      }

                      const currentFormValues = {
                        task: todo.task,
                        isCompleted: e.target.checked,
                      };

                      updateTodo(todo.id, currentFormValues);
                    }}
                  />
                  {editedTask === todo.id ? (
                    <Formik
                      initialValues={{
                        task: todo.task,
                      }}
                      onSubmit={async (values, { setErrors }) => {
                        const currentFormValues = {
                          task: values.task,
                        };

                        const errors = validate(values);
                        if (!isEmpty(errors)) {
                          setErrors(errors);
                          return;
                        }
                        const { responseCode: updateTodoResponseCode } =
                          await updateTodo(todo.id, currentFormValues);

                        const updateTodoCallBacks = {
                          updated: () => {
                            setEditedTask("");
                          },
                        };

                        switch (updateTodoResponseCode) {
                          case 200:
                            updateTodoCallBacks.updated();
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {({ errors, values, handleSubmit, setFieldValue }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            <ControlledInput
                              className={styles.TodoList_list_edit}
                              name="task"
                              value={values.task}
                              error={errors.task}
                              onChange={(e) => {
                                setFieldValue("task", e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSubmit();
                                }
                              }}
                            />

                            {errors.overall && (
                              <Text
                                colorClass={GLOBALS.COLOR_CLASSES.RED["200"]}
                                type={textTypes.BODY.SM}
                              >
                                {errors.overall}
                              </Text>
                            )}
                          </form>
                        );
                      }}
                    </Formik>
                  ) : (
                    <Text
                      className={
                        todo.isCompleted
                          ? styles.TodoList_list_item_checked
                          : ""
                      }
                      colorClass={GLOBALS.COLOR_CLASSES.NEUTRAL["900"]}
                    >
                      {todo.task}
                    </Text>
                  )}
                  <div className={styles.TodoList_list_item_button}>
                    <IconButton
                      icon="edit"
                      disabled={todo.isCompleted}
                      type={iconButtonTypes.OUTLINE.MD}
                      colorName={GLOBALS.COLOR_NAMES.NEUTRAL}
                      onClick={() => {
                        setEditedTask(todo.id);
                      }}
                    />
                    <IconButton
                      icon="delete"
                      type={iconButtonTypes.OUTLINE.MD}
                      colorName={GLOBALS.COLOR_NAMES.NEUTRAL}
                      onClick={async () => {
                        setIsDeleting(true);
                        await TodosService.delete(todo.id);
                        setIsDeleting(false);
                        setAllTodos(
                          allTodos.filter((item) => item.id !== todo.id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.TodoList_footer}>
            <div className={styles.TodoList_progress}>
              <div className={styles.TodoList_progress_bar}>
                <div
                  className={styles.TodoList_progress_bar_fill}
                  style={{
                    width: `${
                      (numOfCompletedTasks / allTodos.length) * 100 || 0
                    }%`,
                  }}
                />

                <Text
                  className={styles.TodoList_progress_bar_text}
                  type={textTypes.BODY.MD}
                >
                  {numOfCompletedTasks} of {allTodos.length} tasks done
                </Text>
              </div>
            </div>

            <Button
              className={styles.TodoList_deleteAll}
              onClick={async () => {
                setIsDeleting(true);

                for (let i = 0; i < checkedTasks.length; i++) {
                  await TodosService.delete(checkedTasks[i]);
                }

                setIsDeleting(false);
                setAllTodos(
                  allTodos.filter((item) => !checkedTasks.includes(item.id))
                );
                setCheckedTasks([]);
              }}
            >
              Remove all checked
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default TodoList;
