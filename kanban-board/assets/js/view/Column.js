import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
    constructor(id, title) {
        const topDropZone = DropZone.createDropZone()
        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector('.kanban-title');
        this.elements.items = this.elements.root.querySelector('.kanban-items');
        this.elements.addBtn = this.elements.root.querySelector('.add-kanban');

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);
        this.elements.addBtn.addEventListener("click", () => {

            const newItem = KanbanAPI.insertItem(id, { title: 'Title', description: 'Description', tag: 'Tag' })
            this.renderItem(newItem);
        });

        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item)
        })
        
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban-column">
                <div class="kanban-header">
                    <div class="kanban-title">TODO</div>
                    <div class="add-kanban">
                        <h4> + Add</h4>
                    </div>
                </div>
                <div class="kanban-items">
                </div>
            </div>
        `).children[0]
    }

    renderItem(data) {
        const kanbanItem = new Item(data.id, data);
        this.elements.items.appendChild(kanbanItem.elements.root);
    }
}