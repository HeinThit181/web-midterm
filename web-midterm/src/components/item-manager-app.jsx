import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);


  //TODO: Your code goes here
  //for setting category and prices
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  // for dorp down menu
  const getCategoryIcon = (cat) => {
    if (cat === "Stationary") return stationaryLogo;
    if (cat === "Kitchenware") return kitchenwareLogo;
    if (cat === "Appliance") return applianceLogo;
  };
  // for adding items
  const addItem = () => {
    const name = itemName.current.value.trim();
  
    if (!name) {
      setErrorMsg("Item name must not be empty");
      return;
    }
    if (!price) {
      setErrorMsg("Price must not be empty");
      return;
    }
  
    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }
  
    if (price <= 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }
  
    const isDuplicate = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  
    if (isDuplicate) {
      setErrorMsg("Item must not be duplicated");
      return;
    }
  
    setErrorMsg("");
  
    const newItem = {
      id: items.length + 1,
      name,
      category,
      price: Number(price),
    };
  
    setItems([...items, newItem]);
  
    itemName.current.value = "";
    setPrice("");
    setCategory(""); // stay with NO default
  };  
  // for deleteing
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };



  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <br/><br/>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img src={getCategoryIcon(item.category)} alt=""/>
              </td>
              <td>{item.price}</td>
              <td>
                <img
                  src={deleteLogo}
                  alt="delete"
                  onClick={() => deleteItem(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td></td>
            <td>
              <input type="text" ref={itemName} />
            </td>
            <td>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled></option>
              <option value="Stationary">Stationary</option>
              <option value="Kitchenware">Kitchenware</option>
              <option value="Appliance">Appliance</option>
            </select>
            </td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>
            <td>
              <button onClick={addItem}>Add item</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         {errorMsg}
      </div>
    </>
  );
}

export default ItemManager