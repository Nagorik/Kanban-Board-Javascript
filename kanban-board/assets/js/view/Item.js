import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
    constructor(id, item) {
        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.title = this.elements.root.querySelector('.kanban-item__title');
        this.elements.description = this.elements.root.querySelector('.kanban-item__description');
        this.elements.tag = this.elements.root.querySelector('.kanban-item__tag');
        this.elements.deleteBtn = this.elements.root.querySelector('.kanban-item__delete');

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = item.title;
        this.elements.description.textContent = item.description;
        this.elements.tag.textContent = item.tag;
        this.item = item;

        const updateItem = (e) => {
            e.target.contentEditable = false;
            const newContent = e.target.textContent.trim();
            if(this.item.title == newContent) return;
            this.item[e.target.className.split('__')[1]] = newContent;
            KanbanAPI.updateItem(id, { item: this.item });
        }

        const inputElements = [this.elements.title, this.elements.description, this.elements.tag]
        
        inputElements.forEach(domEl => {
            domEl.addEventListener('click', e => {
                e.target.contentEditable = true;
                e.target.focus();
            })
        });
        
        inputElements.forEach(domEl => {
            domEl.addEventListener('blur', updateItem)
        });

        this.elements.deleteBtn.addEventListener('click', () => {
            const check = confirm("Are you sure you want to delete this item?");
            if(check) {
                KanbanAPI.deleteItem(id);
                
                inputElements.forEach(domEl => {
                    domEl.removeEventListener('blur', updateItem)
                });

                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        })

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id)
        })

        inputElements.forEach(domEl => {
            domEl.addEventListener('drop', e => {
                e.preventDefault();
            })
        });

        this.elements.root.appendChild(bottomDropZone);
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="kanban-item-container" draggable="true">
            <div class="kanban-item">
                <div contenteditable="false" class="kanban-item__title"></div>
                <div contenteditable="false" class="kanban-item__description"></div>
                <div contenteditable="false" class="kanban-item__tag"></div>
                <div class="kanban-item__delete"> &#10799; </div>
            <div>
        </div>
        `).children[0]
    }
}