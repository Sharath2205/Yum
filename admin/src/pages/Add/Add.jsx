import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

import { toast } from "react-toastify";

import "./Add.css";

const Add = () => {
  const _URL = "http://localhost:4000";

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (e) =>
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));

    try {
      const response = await axios.post(`${_URL}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(false);
        toast.success("Food added successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Error adding food");
      console.error(err);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-veg">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              onChange={onChangeHandler}
              value={data.price}
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
