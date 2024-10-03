/**
 * @class ValidationUtils
 * @description Utility class containing validation methods for incoming data.
 */
export class ValidationUtils {
    /**
     * @method isEmailValid
     * @description Validates an email address.
     * @param {string} email - The email address to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    public static isEmailValid(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    /**
     * @method isUUIDValid
     * @description Validates a UUID.
     * @param {string} uuid - The UUID to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    public static isUUIDValid(uuid: string): boolean {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(uuid);
    }
  }