import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";

// console.log(KanbanAPI.insertItem(1, { id: 'asdfessde', title: 'UXZ Adjustment', description: 'hello description', tag: 'Research' }))

// KanbanAPI.updateItem('1ef7c0fc-55a5-4848-9f9d-21ffa463064b', {
//     columnId: 2,
//     position: 0,
//     item: { id: '1ef7c0fc-55a5-4848-9f9d-21ffa463064b', title: 'UI Adjustment', description: 'hello description', tag: 'Research' }
// })

// KanbanAPI.deleteItem('1ef7c0fc-55a5-4848-9f9d-21ffa463064b');

new Kanban(document.querySelector('.kanban'))