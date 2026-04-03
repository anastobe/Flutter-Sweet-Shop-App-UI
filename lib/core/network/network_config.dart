class NetworkConfig {
  // Base URL for API calls. Change this in one place for all requests.
  static const String baseUrl = 'http://fpapi.avengers.pk/api/';

  // Default headers used by ApiClient. Centralized so all calls use the same headers by default.
  // The backend you showed expects form-encoded login payload; keep application/x-www-form-urlencoded as default.
  // If you prefer JSON globally, change Content-Type to 'application/json'.
  static const Map<String, String> defaultHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  // Convenience constants for common content types
  static const String contentTypeJson = 'application/json';
  static const String contentTypeForm = 'application/x-www-form-urlencoded';
}
