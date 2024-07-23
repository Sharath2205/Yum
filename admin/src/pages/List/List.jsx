import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";

import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const backend_URL = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backend_URL}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        throw res;
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const deleteFood = async (_id) => {
    try {
      const res = await axios.post(`${backend_URL}/api/food/remove`, {
        id: _id,
      });
      if (res.data.success) {
        toast.success("Food deleted successfully");
        setList((prev) => prev.filter((item) => item._id !== _id));
      } else {
        throw res;
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h3 className="heading">All foods list</h3>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list &&
          list.map((item) => {
            return (
              <div key={item._id} className="list-table-format">
                <img src={`${backend_URL}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => deleteFood(item._id)}>
                  X
                </p>
              </div>
            );
          })}

        {list.length === 0 && <p className="empty">No items available</p>}
      </div>
    </div>
  );
};

export default List;
