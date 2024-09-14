import ConvertDataToBr from "../classes/ConvertDataToBr";
import Tasks from "./Tasks";

class  TaskFilters {
        filter (term, property)  {
                let tasks = Tasks.list();
                return tasks.filter(item => item[property].includes(term));
        }
        orderBy(propertyOrder) 
        {
                let resultFiltered = Tasks.list();
                if (term) {
                     resultFiltered = this.filter(term, propertyFilter);
                }
                //Ordenação
                const resultFinal = resultFiltered;
                if (propertyOrder == 'data' || propertyOrder === "data_final") {
                        resultFinal = resultFiltered.order((a, b) => new Date(a[propertyOrder]) - new Date(b[propertyOrder]) );
                        return resultFinal;
                }
                resultFinal = resultFiltered.sort((a, b) => 
                {
                    if (a[propertyOrder] < b[propertyOrder]) {
                        return -1;
                    }
                    if (a[propertyOrder] > b[propertyOrder]) {
                        return 1;
                    }
                });
                return resultFinal;
        }
}

export default TaskFilters;