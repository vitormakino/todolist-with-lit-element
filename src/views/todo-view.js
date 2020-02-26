import { LitElement, html, css } from 'lit-element';

import '../components/todo-checkbox';

class TodoView extends LitElement {
    static get properties() {
        return {
            todos: { type: Array },
            task: { type: String },
        };

    }

    constructor() {
        super();
        this.todos = [];
        this.task = '';
    }

    static get styles() {
        return css`
             * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
             } 

            .todo-view {
                background: #fff;
                max-width: 800px;
                padding: 10px;
                border-radius: 2px;
                box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
            }

            .input-group {
                display: flex;
                margin-bottom: 20px;
            }

            input[type=text] {
                flex: 2;
                font-size: 14px;
                font-weight: bold;
                margin-right: 10px;
                padding: 10px;
                border: 0;
                background: #eee;
            }

            button {
                border: 0;
                padding: 5px 30px; 
                background: #6c30d6;
                color: #fff;
            }

            ul {
                list-style: none;
            }
        `;
    }

    render() {
        return html`
            <div class='todo-view' @keyup="${this.shortcutListener}">
                <div class='input-group'>
                    <input type="text"
                    placeholder="Task"
                    .value="${this.task}"
                    @change="${this.updateTask}" />
                    <button @click="${this.addTask}">Add Todo</button>
                </div>
                <ul>
                ${this.todos.map( todo => html`
                    <li>
                        <todo-checkbox 
                          ?checked="${todo.done}"
                          @change="${ e => this.updateStatus(todo, e.target.checked )}"
                          >
                        ${todo.task}
                        </input>
                    </li>
                ` )}
                </ul>
            </div>`
    }

    updateTask(e) {
        this.task = e.target.value;
    }

    addTask() {
        if(this.task) {
            this.todos = [...this.todos, { task: this.task, done: false }];
        }
        this.task = '';
    }

    shortcutListener(e) {
        if (e.key === 'Enter') { 
          this.addTask();
        }
    }

    updateStatus(todo, done) {
        this.todos = this.todos.map( t => t === todo ? { ...t, done } : t  );
    }
}

customElements.define('todo-view',TodoView);