function initializeStorage() {
    if (!localStorage.getItem('menuItems')) {
        localStorage.setItem('menuItems', JSON.stringify([]));
    }
}

function getMenuItems() {
    return JSON.parse(localStorage.getItem('menuItems')) || [];
}

function saveMenuItem(item) {
    const items = getMenuItems();
    if (item.id) {
        // Editar item existente
        const index = items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            items[index] = item;
        }
    } else {
        // Adicionar novo item
        item.id = Date.now().toString();
        item.dateAdded = new Date().toISOString();
        items.push(item);
    }
    localStorage.setItem('menuItems', JSON.stringify(items));
    return item;
}

function deleteMenuItem(id) {
    let items = getMenuItems();
    items = items.filter(item => item.id !== id);
    localStorage.setItem('menuItems', JSON.stringify(items));
}

function searchMenuItems(searchTerm) {
    const items = getMenuItems();
    if (!searchTerm) return items;
    
    return items.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.price.toString().includes(searchTerm)
    );
}