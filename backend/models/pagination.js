const mongoose = require('mongoose');

const paginate = function(schema, options) {
  schema.statics.paginate = function(query, options) {
    return new Promise((resolve, reject) => {
      const page = options.page || 1;
      const limit = options.limit || 10;
      const skip = (page - 1) * limit;
      const sort = options.sort || { createdAt: -1 };
      const select = options.select || '';
      const populate = options.populate || '';

      const countQuery = this.countDocuments(query);
      const dataQuery = this.find(query)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(p => {
            dataQuery.populate(p);
          });
        } else {
          dataQuery.populate(populate);
        }
      }

      Promise.all([countQuery, dataQuery])
        .then(([totalDocs, docs]) => {
          const totalPages = Math.ceil(totalDocs / limit);
          const hasNextPage = page < totalPages;
          const hasPrevPage = page > 1;

          resolve({
            docs,
            totalDocs,
            limit,
            page,
            totalPages,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null
          });
        })
        .catch(reject);
    });
  };
};

module.exports = paginate;
