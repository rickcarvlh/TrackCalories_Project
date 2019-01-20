// Storage Controller

// Item Controller
const ItemCtrl = (function () {

    // Item contructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure // State

    const data = {
        items: [
            // {
            //     id: 0,
            //     name: 'Steak Dinner',
            //     calories: 1200
            // },
            // {
            //     id: 1,
            //     name: 'Cookie',
            //     calories: 400
            // },
            // {
            //     id: 2,
            //     name: 'Eggs',
            //     calories: 300
            // }
        ],
        currentItem: null,
        totalCalories: 0
    };

    // Public methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;

            // Create ID
            if (data.items.length > 0) {
                // ! Auto increment
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item - constructor
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            // return the new item
            return newItem;

        },
        logData: function () {
            return data;
        }
    }


})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    // Public methods
    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fas fa-pencil-alt"></i>
                </a>
                </li>`;
            });

            // Insert list items - UISelectors(private method)
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fas fa-pencil-alt"></i>
                </a>`;

            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        // Remove
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        //! ----------------- // RETURN // -----------------------------

        getSelectors: function () {
            return UISelectors;
        }

    }

})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {

    // Load event listeners
    const loadEventListeners = function () {

        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add Item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }


    // Add item Submit
    const itemAddSubmit = function (e) {

        // Get form input from UI controller
        const input = UICtrl.getItemInput();

        // making sure we are getting something
        // console.log(input);

        // Check for name and calorie input(they can't be empty)
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Clear Input
            UICtrl.clearInput();

        }

        e.preventDefault();
    }

    // Public methods
    return {
        init: function () {
            // console.log('INItializing App...');

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Populate list with items
            UICtrl.populateItemList(items);

            // Load event listener
            loadEventListeners();



        }
    }


})(ItemCtrl, UICtrl);


// Initialize App
App.init();