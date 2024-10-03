/**
 * @class PaginationUtil
 * @description Utility class for managing pagination in queries.
 */
export class PaginationUtil {
    /**
     * @method paginate
     * @description Adds pagination options to a query.
     * @param {number} page - The current page number (1-based).
     * @param {number} limit - The number of records per page.
     * @returns {object} An object containing skip and take options.
     */
    public static paginate(page: number, limit: number): { skip: number; take: number } {
      const skip = (page - 1) * limit;
      return { skip, take: limit };
    }
  }