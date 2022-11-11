class APIProduct {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          // search
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    //console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
}

module.exports = APIProduct;
