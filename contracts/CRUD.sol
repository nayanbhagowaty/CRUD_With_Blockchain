// CRUD.sol - Smart Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CRUD {
    struct Item {
        uint id;
        string name;
        string description;
        bool exists;
    }
    
    mapping(uint => Item) public items;
    uint public itemCount;
    
    event ItemCreated(uint id, string name, string description);
    event ItemUpdated(uint id, string name, string description);
    event ItemDeleted(uint id);
    
    function createItem(string memory _name, string memory _description) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _description, true);
        emit ItemCreated(itemCount, _name, _description);
    }
    
    function readItem(uint _id) public view returns (uint, string memory, string memory) {
        require(items[_id].exists, "Item does not exist");
        return (items[_id].id, items[_id].name, items[_id].description);
    }
    
    function updateItem(uint _id, string memory _name, string memory _description) public {
        require(items[_id].exists, "Item does not exist");
        items[_id].name = _name;
        items[_id].description = _description;
        emit ItemUpdated(_id, _name, _description);
    }
    
    function deleteItem(uint _id) public {
        require(items[_id].exists, "Item does not exist");
        delete items[_id];
        emit ItemDeleted(_id);
    }
}