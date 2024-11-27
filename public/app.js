// app.js
let web3;
let contract;
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // You'll get this after deploying
const contractABI = []; // Add your contract ABI here after compilation

// Replace the Web3 initialization with:
web3 = new Web3('http://localhost:8545');

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    } else {
        console.error("No Web3 provider detected");
    }
    
    contract = new web3.eth.Contract(contractABI, contractAddress);
    loadItems();
}

async function createItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    
    const accounts = await web3.eth.getAccounts();
    await contract.methods.createItem(name, description)
        .send({ from: accounts[0] })
        .then(() => {
            loadItems();
            clearCreateForm();
        })
        .catch(console.error);
}

async function updateItem() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const description = document.getElementById('updateDescription').value;
    
    const accounts = await web3.eth.getAccounts();
    await contract.methods.updateItem(id, name, description)
        .send({ from: accounts[0] })
        .then(() => {
            loadItems();
            clearUpdateForm();
        })
        .catch(console.error);
}

async function deleteItem() {
    const id = document.getElementById('deleteId').value;
    
    const accounts = await web3.eth.getAccounts();
    await contract.methods.deleteItem(id)
        .send({ from: accounts[0] })
        .then(() => {
            loadItems();
            clearDeleteForm();
        })
        .catch(console.error);
}

async function loadItems() {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    
    const itemCount = await contract.methods.itemCount().call();
    
    for (let i = 1; i <= itemCount; i++) {
        try {
            const item = await contract.methods.readItem(i).call();
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>ID: ${item[0]}</h3>
                <p>Name: ${item[1]}</p>
                <p>Description: ${item[2]}</p>
            `;
            itemsList.appendChild(itemElement);
        } catch (error) {
            console.log(`Item ${i} does not exist or was deleted`);
        }
    }
}

function clearCreateForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
}

function clearUpdateForm() {
    document.getElementById('updateId').value = '';
    document.getElementById('updateName').value = '';
    document.getElementById('updateDescription').value = '';
}

function clearDeleteForm() {
    document.getElementById('deleteId').value = '';
}

window.onload = web3; //initWeb3;