let menuItems = [];

function loadMenuItems() {
    menuItems = getMenuItems();
    const table = document.getElementById('menuTable');
    const emptyState = document.getElementById('emptyState');
    
    if (menuItems.length === 0) {
        table.innerHTML = '';
        emptyState.classList.remove('d-none');
        return;
    }
    
    emptyState.classList.add('d-none');
    table.innerHTML = '';
    
    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id.substring(0, 8)}</td>
            <td>${item.name}</td>
            <td>R$ ${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.description}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        table.appendChild(row);
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            editMenuItem(itemId);
        });
    });
}

function editMenuItem(id) {
    const item = menuItems.find(i => i.id === id);
    
    if (item) {
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemDescription').value = item.description;
        
        document.getElementById('itemModalLabel').textContent = 'Editar Item';
        document.getElementById('deleteButton').style.display = 'block';
        
        const modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();
    }
}

function clearForm() {
    document.getElementById('itemId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemDescription').value = '';
    
    document.getElementById('itemModalLabel').textContent = 'Adicionar Frutas';
    document.getElementById('deleteButton').style.display = 'none';
}

function searchItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredItems = searchMenuItems(searchTerm);
    const table = document.getElementById('menuTable');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredItems.length === 0) {
        table.innerHTML = '';
        emptyState.classList.remove('d-none');
        if (searchTerm) {
            emptyState.innerHTML = `
                <i class="bi bi-search"></i>
                <h4>Nenhum item encontrado</h4>
                <p>Nenhum item corresponde à sua pesquisa por "${searchTerm}"</p>
            `;
        }
        return;
    }
    
    emptyState.classList.add('d-none');
    table.innerHTML = '';
    
    filteredItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id.substring(0, 8)}</td>
            <td>${item.name}</td>
            <td>R$ ${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.description}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        table.appendChild(row);
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            editMenuItem(itemId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    loadMenuItems();
    
    document.getElementById('itemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const item = {
            id: document.getElementById('itemId').value,
            name: document.getElementById('itemName').value,
            price: document.getElementById('itemPrice').value,
            description: document.getElementById('itemDescription').value
        };
        
        saveMenuItem(item);
        loadMenuItems();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
        modal.hide();
        
        clearForm();
    });
    
    document.getElementById('deleteButton').addEventListener('click', function() {
        const itemId = document.getElementById('itemId').value;
        
        if (confirm('Tem certeza que deseja excluir este item?')) {
            deleteMenuItem(itemId);
            loadMenuItems();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
            modal.hide();
            
            clearForm();
        }
    });
    
    document.getElementById('searchInput').addEventListener('input', searchItems);
    
    document.getElementById('itemModal').addEventListener('hidden.bs.modal', clearForm);
    
    if (getMenuItems().length === 0) {
        const sampleItems = [
            { name: "", price: 0, description: "" },
            { name: "", price: 0, description: "" },
            { name: "", price: 0, description: "" }
        ];
        
        sampleItems.forEach(item => {
            saveMenuItem(item);
        });
        
        loadMenuItems();
    }
});