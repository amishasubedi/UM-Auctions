import { Fragment } from "react";

const NewAuction = () => {
  const currentDate = new Date();
  const defaultStartTime = getDateString(currentDate);
  const defaultEndTime = getDateString(
    new Date(currentDate.setHours(currentDate.getHours() + 1))
  );

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

  if (values.bidEnd < values.bidStart) {
    setValues({ ...values, error: "Auction cannot end before it starts" });
  }

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
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
                label="Auction Start Time"
                type="datetime-local"
                defaultValue={defaultStartTime}
                onChange={handleChange("bidStart")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Description</label>
              <input
                label="Auction End Time"
                type="datetime-local"
                defaultValue={defaultEndTime}
                onChange={handleChange("bidEnd")}
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
