const mongoose = require("mongoose");

class TransactionFilter {
  constructor(query) {
    this.query = query;
    this.queryString = {};
    this.page = query.page ? parseInt(query.page, 10) : 1;
    this.limit = query.limit ? parseInt(query.limit, 10) : 10;
  }

  filter() {
    if (this.query.walletId) this.queryString.walletId = this.query.walletId;
    if (this.query.memberId) this.queryString.memberId = this.query.memberId;
    if (this.query.type) this.queryString.type = this.query.type;
    if (this.query.startDate && this.query.endDate) {
      this.queryString.timeStamp = {
        $gte: new Date(this.query.startDate),
        $lte: new Date(this.query.endDate),
      };
    }
    return this;
  }

  sort() {
    if (this.query.sortBy) {
      const sortBy = this.query.sortBy === "asc" ? 1 : -1;
      this.queryString.sort = { timeStamp: sortBy };
    }
    return this;
  }

  paginate() {
    const skip = (this.page - 1) * this.limit;
    this.pagination = { skip, limit: this.limit };
    return this;
  }

  async exec() {
    const transactions = await mongoose
      .model("TransactionSchema")
      .find(this.queryString.sort ? this.queryString : {})
      .sort(this.queryString.sort)
      .limit(this.pagination.limit)
      .skip(this.pagination.skip);
    return transactions;
  }
}

class MemberFilter {
  constructor(query) {
    this.query = query;
    this.queryString = {};
    this.page = query.page ? parseInt(query.page, 10) : 1;
    this.limit = query.limit ? parseInt(query.limit, 10) : 10;
  }

  filter() {
    if (this.query.search) this.queryString.search = this.query.search;
    return this;
  }

  sort() {
    if (this.query.sortBy) {
      const sortBy = this.query.sortBy === "asc" ? 1 : -1;
      this.queryString.sort = { timeStamp: sortBy };
    }
    return this;
  }

  paginate() {
    const skip = (this.page - 1) * this.limit;
    this.pagination = { skip, limit: this.limit };
    return this;
  }

  async exec() {
    console.log(this.queryString, this.pagination);
    const members = await mongoose
      .model("MemberSchema")
      .find({
        $or: [
          { name: this.queryString.search },
          { email: this.queryString.search },
          { phone: this.queryString.search },
          { memberId: this.queryString.search },
        ],
      })
      .sort(this.queryString.sort)
      .skip(this.pagination.skip)
      .limit(this.pagination.limit)
      .populate("wallet");
    return members;
  }
}

module.exports = { TransactionFilter, MemberFilter };
