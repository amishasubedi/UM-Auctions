import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const NewAuction = () => {
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
  const currentDate = new Date();
  const defaultStartTime = getDateString(currentDate);
  const defaultEndTime = getDateString(
    new Date(currentDate.setHours(currentDate.getHours() + 1))
  );

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState(0);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-3">Create Auction</h1>

            <div className="form-group">
              <label htmlFor="email_field">Image URL</label>
              <input
                type="URL"
                id="image_field"
                className="form-control"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Item Name</label>
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
                value={startingBid}
                onChange={(event) => setStartingBid(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Auction Start Time</label>
              <input
                type="Date"
                id="bid_field"
                className="form-control"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Auction End Time</label>
              <input
                type="Date"
                id="bid_field"
                className="form-control"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </div>

            <Link
              to="/orders/myOrder"
              id="submit_button"
              type="submit"
              className="btn btn-block py-3"
            >
              SUBMIT
            </Link>

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
