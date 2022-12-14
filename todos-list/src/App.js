import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am on Delete of", todo);
    // let index = todos.indexOf(todo); this way in react does not work
    // todos.slice(index, 1);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    // localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log("i am adding this ", myTodo);

    // localStorage.setItem("todos", JSON.stringify(todos));
  };
  const [todos, setTodos] = useState(
    initTodo
    // [
    // {
    //   sno: 1,
    //   title: "Go To Market",
    //   desc: "You Need to go to the market to get this job done",
    // },
    // {
    //   sno: 2,
    //   title: "Go To Mall",
    //   desc: "You Need to go to the Mall to get this job done",
    // },
    // {
    //   sno: 3,
    //   title: "Go To Ghat",
    //   desc: "You Need to go to the Ghat to get this job done",
    // },
    // ]
  );
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    // this is jsx
    <>
      <Router>
        <Header title="My Todo List" searchBar={false} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              );
            }}
          ></Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
