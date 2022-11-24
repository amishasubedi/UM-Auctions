import { Fragment } from "react";
import Auction from "./Auction";

const NewAuction = () => {
  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            // onSubmit={submitHandler}
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mt-2 mb-5">Create Auction</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={nameChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Description</label>
              <input
                type="description"
                id="description_field"
                className="form-control"
                name="description"
                value={description}
                onChange={descriptionChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Auction Start Time</label>
              <input
                type="start_time"
                id="time_field"
                className="form-control"
                name="start_time"
                value={startTime}
                onChange={timeChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Auction End Time</label>
              <input
                type="end_time"
                id="time_field"
                className="form-control"
                name="end_time"
                value={endTime}
                onChange={timeChangeHandler}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
              //onClick={() => navigate("/myProfile")}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Auction;
