import Status from "../enum/status";

class  Task  {
        
        list = () => 
        {
                let todos = localStorage.getItem("todos");
                if (todos === undefined) {
                        localStorage.setItem("todos",JSON.stringify([]));
                }
                 todos = todos ? JSON.parse(todos) : [];
                return todos;
        }
        addItem (item)
        {
                let todos = this.list();
                todos.push(item);
                this.setUpdateItem(todos)
                
        }
        setUpdateItem (todos) 
        {
                localStorage.setItem("todos", JSON.stringify(todos));
        }
        removeItem (editIndex) 
        {
                let item = this.list();
                 let newItens  = item.filter((a_, index) => index !== editIndex);
                 this.setUpdateItem(newItens);
        }
        getItem(editIndex) {
                let item = this.list();
                return item.filter((a_, index) => index === editIndex);
        }
        clear () 
        {
                localStorage.removeItem("todos");
        }
        clearItemCompleted () 
        {
                let todos = this.list().filter( item => item.status === Status.pendente);
                this.setUpdateItem(todos);
        }
}

export default Task;