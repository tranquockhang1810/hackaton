class ResponseFormatter {
  static success(data, message = "Success", code = 200) {
    return {
      code,
      message,
      data,
    };
  }

  static error(message, code = 500) {
    return {
      error: {
        code: code,
        message,
      },
    };
  }

  static formatUser(user) {
    if (!user) return null;

    return {
      ...user,
      password: undefined,
      __v: undefined
    };
  }

  static paginatedList(items, total, page, limit, message = "Success", code = 200) {
    return {
      code,
      message,
      data: items,
      paging: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = ResponseFormatter;
