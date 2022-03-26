import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId);

        if(!column) return [];
        return column.items;
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId);

        const item = { id: uuidv4(), ...content }

        if(!column) throw new Error("Column dose not exist");
        column.items.push(item);
        save(data);

        return item
    }

    static updateItem(itemId, newProps) {
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);
                if(item) {
                    return [item, column];
                }
            }
        })();

        if(!item) throw new Error("Item not found!!");
        if(newProps.item !== undefined) {
            item.title = newProps.item.title;
            item.description = newProps.item.description;
            item.tag = newProps.item.tag;
        }

        if(newProps.columnId !== undefined && newProps.position !== undefined) {
            const targetColumn = data.find(column => column.id == newProps.columnId);

            if(!targetColumn) throw new Error("Target column is not found!!");
            // console.log(newProps.item)
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
            targetColumn.items.splice(newProps.position, 0 , item);
        }

        save(data);
    }

    static deleteItem(itemId) {
        const data = read();
        for (const column of data) {
            const item = column.items.find(item => item.id == itemId);
            if(item) {
                column.items.splice(column.items.indexOf(item), 1)
            }
        }

        save(data)
    }
}

function read() {
    const jason = localStorage.getItem("kanban-data");

    if(!jason) {
        return[
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ]
    }

    return JSON.parse(jason);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}