import Status from "../enum/status";

export default class  Tasks  {

        construtor() {
                this.db = 'todos';
        }

        list() 
           {
                let todos = JSON.parse(localStorage.getItem(this.db));
                if (!todos) {
                        return [];
                }
                return todos;
            }
        setItem (todos)
           {
                    localStorage.setItem(this.db, JSON.stringify(todos));
            }
        removeItem (index) 
            {
                debugger
                   let todos = this.list()
                   let todosFiltered = todos.filter((_, i) => i !== index);
                   this.setItem(todosFiltered);
            }
        clear () 
           {
                this.setItem([]);
           }
        clearItemCompleted () 
           {
                let todos = this.list().filter((_, i) => i.status !== Status.concluido);
                this.setItem(todos);
           }
}