import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban-item__dropzone"></div>
        `).children[0];

        dropZone.addEventListener('dragover', e => {
            e.preventDefault();

            dropZone.classList.add("active");
        })

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove("active");
        })

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            dropZone.classList.remove("active");

            const columnElement = dropZone.closest(".kanban-column");
            const columnId = Number(columnElement.dataset.id);
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban-item__dropzone"));
            const dropIndex = dropZonesInColumn.indexOf(dropZone);
            const itemId = e.dataTransfer.getData("text/plain");
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)
            const insertAfter = dropZone.parentElement.classList.contains("kanban-item-container") ? dropZone.parentElement : dropZone;

            if(droppedItemElement.contains(dropZone)) return;

            insertAfter.after(droppedItemElement);
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: dropIndex
            }) 

        })
        return dropZone;
    }  
}