import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import 'api_exception.dart';
import 'network_config.dart';

class ApiClient {
  final Dio _dio;

  ApiClient({String? baseUrl, Map<String, String>? defaultHeaders, Dio? dio})
      : _dio = dio ?? Dio(BaseOptions(
          baseUrl: baseUrl ?? NetworkConfig.baseUrl,
          headers: defaultHeaders ?? NetworkConfig.defaultHeaders,
          connectTimeout: const Duration(milliseconds: 15000),
          receiveTimeout: const Duration(milliseconds: 15000),
        )) {
    if (kDebugMode) {
      _dio.interceptors.add(
        LogInterceptor(
          request: true,
          requestHeader: true,
          requestBody: true,
          responseHeader: true,
          responseBody: true,
          error: true,
        ),
      );
    }
  }

  /// Attach a bearer token to default headers for subsequent requests
  void setAuthToken(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  /// Remove Authorization header
  void removeAuthToken() {
    _dio.options.headers.remove('Authorization');
  }

  Future<Map<String, dynamic>> get(
    String path, {
    Map<String, String>? headers,
    Map<String, dynamic>? queryParameters,
    Duration? timeout,
  }) async {
    try {
      final response = await _dio.get(
        path,
        queryParameters: queryParameters,
        options: Options(headers: headers, sendTimeout: timeout, receiveTimeout: timeout),
      );
      return _processResponse(response);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<Map<String, dynamic>> post(
    String path, {
    Map<String, dynamic>? body,
    Map<String, String>? headers,
    Duration? timeout,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: _encodeData(body, headers),
        options: Options(headers: headers, sendTimeout: timeout, receiveTimeout: timeout),
      );
      return _processResponse(response);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<Map<String, dynamic>> put(
    String path, {
    Map<String, dynamic>? body,
    Map<String, String>? headers,
    Duration? timeout,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: _encodeData(body, headers),
        options: Options(headers: headers, sendTimeout: timeout, receiveTimeout: timeout),
      );
      return _processResponse(response);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<Map<String, dynamic>> patch(
    String path, {
    Map<String, dynamic>? body,
    Map<String, String>? headers,
    Duration? timeout,
  }) async {
    try {
      final response = await _dio.patch(
        path,
        data: _encodeData(body, headers),
        options: Options(headers: headers, sendTimeout: timeout, receiveTimeout: timeout),
      );
      return _processResponse(response);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<Map<String, dynamic>> delete(
    String path, {
    Map<String, dynamic>? body,
    Map<String, String>? headers,
    Duration? timeout,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        data: _encodeData(body, headers),
        options: Options(headers: headers, sendTimeout: timeout, receiveTimeout: timeout),
      );
      return _processResponse(response);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Object? _encodeData(Map<String, dynamic>? body, Map<String, String>? headers) {
    final mergedContentType = (headers != null && headers.containsKey('Content-Type'))
        ? headers['Content-Type']
        : (_dio.options.headers['Content-Type']?.toString());

    if (mergedContentType != null && mergedContentType.contains('application/x-www-form-urlencoded')) {
      if (body == null) return null;
      // Dio will encode Map with this content-type as form URL encoded
      return body.map((k, v) => MapEntry(k, v.toString()));
    }

    // Default: JSON body
    return body;
  }

  ApiException _handleDioError(DioException e) {
    final resp = e.response;
    final status = resp?.statusCode ?? 0;
    String message = e.message ?? 'Request failed';
    dynamic body;
    try {
      body = resp?.data;
      if (body is Map && body['message'] != null) message = body['message'].toString();
    } catch (_) {}
    return ApiException(statusCode: status, message: message, body: body);
  }

  Map<String, dynamic> _processResponse(Response response) {
    final statusCode = response.statusCode ?? 0;
    final data = response.data;

    if (statusCode >= 200 && statusCode < 300) {
      if (data is Map<String, dynamic>) return data;
      // if server returned JSON array or other, wrap
      return {'data': data};
    }

    String message = 'Request failed with status: $statusCode.';
    if (data is Map && data['message'] != null) message = data['message'].toString();
    throw ApiException(statusCode: statusCode, message: message, body: data);
  }

  void dispose() {
    _dio.close();
  }
}
