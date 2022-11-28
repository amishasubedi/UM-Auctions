import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleErrors } from "../../redux/actions/user_actions";
import { newProduct } from "../../redux/actions/product_actions";
import { useNavigate } from "react-router";
import { NEW_PRODUCT_RESET } from "../../redux/reducers/product_constants";

const NewAuction = () => {
  // default date setiing
  const getDateString = (date) => {
    let year = date.getFullYear();
    let day =
      date.getDate().toString().length === 1
        ? "0" + date.getDate()
        : date.getDate();
    let month =
      date.getMonth().toString().length === 1
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let hours =
      date.getHours().toString().length === 1
        ? "0" + date.getHours()
        : date.getHours();
    let minutes =
      date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes();
    let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
    return dateString;
  };

  // declare default bidding start time and end time
  const currentDate = new Date();
  const defaultStartTime = getDateString(currentDate);
  const defaultEndTime = getDateString(
    new Date(currentDate.setHours(currentDate.getHours() + 1))
  );

  // use state hook for the form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bidStart, setbidStart] = useState(defaultStartTime);
  const [price, setPrice] = useState(0);
  const [bidEnd, setBidEnd] = useState(defaultEndTime);
  const [images, setImages] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  const [stock, setStock] = useState(0);
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(handleErrors());
    }

    if (success) {
      navigate("/products/new");
      alert("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("stock", stock);
    formData.set("seller", name);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="application/json"
          >
            <h1 className="mb-3">Create Auction</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name "
                id="name_field"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Description</label>
              <input
                type="description"
                id="description_field"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Starting Bid</label>
              <input
                type="Number"
                id="bid_field"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Stock</label>
              <input
                type="description"
                id="description_field"
                className="form-control"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Auction Start Time</label>
              <input
                type="Date"
                id="bid_field"
                className="form-control"
                value={bidStart}
                onChange={(event) => setbidStart(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Auction End Time</label>
              <input
                type="Date"
                id="bid_field"
                className="form-control"
                value={bidEnd}
                onChange={(event) => setBidEnd(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                  multiple
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREATE
            </button>
            <Link to="/" className="float-right mt-3">
              CANCEL
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewAuction;
