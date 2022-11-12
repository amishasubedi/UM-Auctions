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

  filter() {
    const dummy = { ...this.queryString };
    //console.log(dummy)

    // filter by category
    const filterCategory = ["keyword", "limit", "page"];
    filterCategory.forEach((i) => delete dummy[i]);

    // filter by price
    let queryString = JSON.stringify(dummy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g, // mongo operators to convert string into dollars
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(productsInPage) {
    const current = Number(this.queryString.page) || 1;
    const skip = productsInPage * current - 1;

    this.query = this.query.limit(productsInPage).skip(skip); // limit the number of items
    return this;
  }
}

module.exports = APIProduct;
