import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';



class TodoView extends LitElement {

  static get properties(){
    return {
      todos : {type:Array},
      task: {type:String}
    }
  }

  constructor(){
    super();
    this.getAllTodos();
    this.todos = [];
    this.task = "";
  }

  render() {
    return html`
      <style>
      .delete-button{
        background-color:#CD5C5C;
        color:white;
      }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
          <vaadin-text-field
            placeholder="Task"
            value="${this.task}"
            @change = "${this.updateTask}"
          >
          </vaadin-text-field>
          <vaadin-button 
            theme="primary"
            @click="${this.addTodo}"
          >Add Todo</vaadin-button>
      </div>

      <div class="todos-list">
    
        ${this.todos.map(todo=> html`
          <div class="todo-item">
              <vaadin-checkbox
              ?checked = "${JSON.parse(todo.completed)}"
              @change= "${e=>this.updateTodoStatus(todo,e.target.checked)}"
              >${todo.task}
              </vaadin-checkbox>
              <vaadin-button 
                class="delete-button"
                theme="secondary"
                data_todoid = "${todo.id}"
                @click="${e => this.deleteTodo(e.target.getAttribute("data_todoid"))}"
              >Delete Todo</vaadin-button>
          </div>
        `)}
      </div>
    `;
  }
  
  getAllTodos(){
    const url = "http://localhost:5003/getAllTodos";
    fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
        this.todos = response.todos
    })
    .catch(error => console.log(error));
  }

  deleteTodo(id){
    fetch('http://localhost:5003/deleteTodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id})
      })
      .then(this.getAllTodos());
  }

  updateTodoStatus(updatedTodo,completed){
    this.todos.map(todo => {
      if(updatedTodo === todo){
        todo.completed = completed
      }
    })

    console.log("toggled the todo completed")
    console.log(this.todos)
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  addTodo(){

    //STATIC
    // if(this.task){
    //   this.todos = [...this.todos,{
    //     task:this.task,
    //     completed: false
    //   }]
    // }
    // console.log("added todo")
    // console.log(this.todos)
    // this.task = "";


    
      fetch('http://localhost:5003/addTodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"task":this.task})
      })
      .then(this.getAllTodos());
  

    
  }

  shortcutListener(e){
    if(e.key === 'Enter'){
      this.addTodo();
    }
  }

}

customElements.define('todo-polymer-app', TodoView);
