"use client";
import "../../upload_product/page.css";
import { useState } from "react";
export default function page() {
  const [rows, setRows] = useState([
    { price: "1000", unit: "1 pack of 1.5kg" },
    { price: "1000", unit: "1 pack of 1.5kg" },
    { price: "1000", unit: "1 pack of 1.5kg" },
    { price: "1000", unit: "1 pack of 1.5kg" },
  ]);
  const [images, setImages] = useState([]);
  const [Description, setDescription] = useState("This is a very good product");
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const addRow = () => {
    setRows([...rows, { price: "", unit: "" }]);
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <div className="upload_product_big_container">
      <div className="upload_product_container">
        <h3>Add new product to your shop</h3>
        <div className="input_name">
          <h3>Name</h3>
          <input type="text" />
        </div>
        <div className="input_price">
          <h3>Sale option</h3>
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>¥ per</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) =>
                        updateRow(index, "price", e.target.value)
                      }
                      placeholder="Ex: 100"
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      value={row.unit}
                      onChange={(e) => updateRow(index, "unit", e.target.value)}
                      placeholder="Ex: package of 1.5 kg"
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteRow(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addRow}>Add row</button>
        </div>
        <div className="input_description">
          <h3>Description</h3>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <h3>Product Image</h3>
          <input type="file" multiple onChange={handleImageChange} />
          <div className="img_array">
            {images.map((image, index) => (
              <div className="img_container">
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="product-image"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="submit_button">
          <button>Update</button>
        </div>
      </div>
    </div>
  );
}
