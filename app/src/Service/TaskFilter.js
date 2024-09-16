import Tasks from "./Task";

class  TaskFilters {
        setFilter = (titulo, order) =>
        {
             localStorage.setItem("filter", JSON.stringify({titulo: titulo, order:order}));
        }
        getFilter = () =>
        {
            let objectFilter = localStorage.getItem("filter");
            objectFilter = objectFilter ? JSON.parse(objectFilter) : null;
            return objectFilter;
        }
        clearFilter =() =>
        {
            localStorage.removeItem("filter");
        }
        filter = (term = null, property = 'titulo') => {
                let tasks =  new Tasks('todos');
                if (!term)  {
                        return tasks.list();
                 }
                if (tasks.list().length ===  0) {
                        return [];
                }
                return tasks.list().filter(item =>  item[property] && item[property].includes(term))
        }
        orderBy = (term = null, propertyFilter = 'titulo', propertyOrder = 'titulo') =>
        {
                let tasks =  new Tasks('todos');
                let resultFiltered = tasks.list();

                if (!term)  {
                       return resultFiltered;
                }
                resultFiltered = this.filter(`${term}`, `${propertyFilter}`);
        
                let resultFinal = resultFiltered;
                if (propertyOrder === 'data' || propertyOrder === "data_conclusao") {
                        resultFinal = resultFiltered.sort((a, b) => {
                                
                                if (!a[propertyOrder] && !b[propertyOrder]) {
                                        return 0;
                                }
                                return Date(a[propertyOrder]) - new Date(b[propertyOrder]) 
                        } );
                        return resultFinal;
                }
                resultFinal = resultFiltered.sort((a, b) => 
                {
                    return a[propertyOrder] < b[propertyOrder];
                });
                return resultFinal;
        }
}

export default TaskFilters;