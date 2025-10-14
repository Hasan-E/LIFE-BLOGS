"use strict";
/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

module.exports = async (req, res, next) => {
  //* FILTERING
  const filter = req.query?.filter || {};
  //* SEARCHING
  const search = req.query?.search || {};
  for (let key in search) search[key] = { $regex: search[key], $options: "i" };
  //* SORTING
  const sort = req.query?.sort || {};
  //* PAGINATION
  let page = parseInt(req.query?.page);
  page = page > 0 ? page : 1;
  //* LIMIT
  let limit = parseInt(req.query?.limit);
  limit = limit > 0 ? limit : 20;
  //* SKIP
  let skip = parseInt(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;
  //* GetModelList
  res.getModelList = async (Model, customFilter = {}, populate = null) => {
    return await Model.find({ ...search, ...filter, ...customFilter })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };
  //* GetModelListDetails
  res.getModelListDetails = async (Model, customFilter = {}) => {
    const count = await Model.countDocuments({
      ...search,
      ...filter,
      ...customFilter,
    });

    return {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      totalRecords: count,
      pages:
        count <= limit
          ? false
          : {
              previous: page > 1 ? page - 1 : false,
              current: page,
              next: page < Math.ceil(count / limit) ? page + 1 : false,
              total: Math.ceil(count / limit),
            },
    };
  };
  next();
};
