import 'package:flutter/material.dart';
import 'package:flutter_sweet_shop_app_ui/core/widgets/globalButton.dart';

import '../../../../core/widgets/globalTextInput.dart';
import 'home_screen.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/network/api_exception.dart';
import '../../../../core/network/api_routes.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  late final ApiClient _apiClient;

  @override
  void initState() {
    super.initState();
    // ApiClient will use NetworkConfig.baseUrl and NetworkConfig.defaultHeaders by default
    _apiClient = ApiClient();

    // Prefill values (use correct username)
    _emailController.text = "mohtashim";
    _passwordController.text = "Uhf@1234";
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _apiClient.dispose();
    super.dispose();
  }

  void _showLoading() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(child: CircularProgressIndicator()),
    );
  }

  void _hideLoading() {
    if (Navigator.canPop(context)) Navigator.of(context).pop();
  }

  Future<void> _onLoginPressed() async {
    if (_emailController.text.trim() == '') {
      showDialog(
          context: context,
          builder: (_) => AlertDialog(
                title: const Text('Required fields'),
                content: const Text('Username is required.'),
                actions: [
                  TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
                ],
              ));
      return;
    } else if (_passwordController.text.trim() == '') {
      showDialog(
          context: context,
          builder: (_) => AlertDialog(
                title: const Text('Required fields'),
                content: const Text('Password is required.'),
                actions: [
                  TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
                ],
              ));
      return;
    } else {
      final Map<String, String> payload = {
        "username": _emailController.text.trim(),
        "password": _passwordController.text.trim(),
        // include defaults the server expects; replace device_token with real device token in production
        "mfa_code": "000000",
        "device_token": "euUjCjRGTsyJJpcOpDiFRb:APA91bGyZpyXB_7MMnsljugl5DjaIhB0B3SuRRZzlTi2g0JsKD9XeVUWcH4jYKZl77RGZsdX_ThkVqleT09HzIWUrlEXVjZ_OgfIdb79Bi-IKtXvRrrLlnc",
        "device_type": "android",
      };

      _showLoading();

      try {
        debugPrint('Payload => $payload');

        final response = await _apiClient.post(ApiRoutes.login, body: payload);
        _hideLoading();

        debugPrint('api response is==> $response');

        if (response['success'] == true) {
          debugPrint('Login successful, token: ${response['results']?['token']}');
          Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
        } else {
          final msg = response['message'] ?? 'Login failed';
          showDialog(
            context: context,
            builder: (_) => AlertDialog(
              title: const Text('Login failed'),
              content: Text(msg.toString()),
              actions: [TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK'))],
            ),
          );
        }
      } on ApiException catch (e) {
        _hideLoading();
        debugPrint('ApiException status: ${e.statusCode}');
        debugPrint('ApiException message: ${e.message}');
        debugPrint('ApiException body: ${e.body}');
        showDialog(
            context: context,
            builder: (_) => AlertDialog(
                  title: const Text('Login faileds'),
                  content: Text(e.message),
                  actions: [TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK'))],
                ));
      } catch (e) {
        _hideLoading();
        showDialog(
            context: context,
            builder: (_) => AlertDialog(
                  title: const Text('Error'),
                  content: Text(e.toString()),
                  actions: [TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK'))],
                ));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xdd0C1544),
      body: SafeArea(
        child: Stack(
          children: [
            // Background image
            Positioned.fill(
              child: Image.asset(
                'assets/images/universalBack.png',
                fit: BoxFit.cover,
              ),
            ),
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const SizedBox(height: 60),
                    Image.asset('assets/images/fp_logo.png', height: 60,),
                    const SizedBox(height: 24),
                    const Text(
                      'Let’s Sign you In.',
                      style: TextStyle(
                        color: Color(0xFFFFFFFF), // Button text color
                        fontSize: 22,
                        fontFamily: 'Matter',
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 60),
                    CustomInput(hint: "Username", controller: _emailController),
                    const SizedBox(height: 20),
                    CustomInput(hint: "Enter Password",
                        controller: _passwordController, isPassword: true),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () {
                          // Handle forgot password action
                        },
                        child: Text(
                          'Forgot Password?',
                          style: TextStyle(
                            color: Colors.white, // Button text color
                            fontSize: 14,
                            fontFamily: 'Matter',
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                    CustomButton(hint: "Login",
                      txtColor: Colors.black,
                      btnColor: Colors.primary,
                      height: 55,
                      topMargin: 10,
                      onPressed: _onLoginPressed,
                      borderColor: Colors.primary,
                    ),
                    const SizedBox(height: 20),
                    /// OR
                    Row(
                      children: const [
                        Expanded(child: Divider(color: Colors.white)),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Text("Or", style: TextStyle(color: Colors.white)),
                        ),
                        Expanded(child: Divider(color: Colors.white)),
                      ],
                    ),
                    const SizedBox(height: 10),
                    CustomButton(hint: "Login with Face ID",
                        txtColor: Colors.white,
                        leftImageTintColor: "0xFFFFFFFF",
                        leftImage: "assets/images/faceID.png",
                        btnColor: Colors.transparent,
                        height: 55,
                        topMargin: 16,
                        onPressed: () {
                          // Call your biometric auth logic here
                        }, borderColor: Colors.white),
                    Padding(padding: const EdgeInsets.only(top: 20), child: Text(
                      'Don’t have an account? Create Account',
                      style: TextStyle(
                        color: Colors.white, // Button text color
                        fontSize: 14,
                        fontFamily: 'Matter',
                        fontWeight: FontWeight.w500,
                      ),
                    ))

                  ],
                )
            )


            // Image.asset('assets/images/fp_logo.png'),



            // Centered login button
            //     Center(
            //       child: ElevatedButton(
            //         onPressed: () {
            //           // Navigate to the home screen when the button is pressed
            //           Navigator.pushReplacement(
            //             context,
            //             MaterialPageRoute(builder: (_) => const HomeScreen()),
            //           );
            //         },
            //         style: ElevatedButton.styleFrom(
            //           backgroundColor: Colors.white, // Button background color
            //           padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
            //           shape: RoundedRectangleBorder(
            //             borderRadius: BorderRadius.circular(30), // Rounded corners
            //           ),
            //         ),
            //         child: const Text(
            //           'Continue to App',
            //           style: TextStyle(
            //             color: Color(0xff0B0F3A), // Button text color
            //             fontSize: 16,
            //             fontWeight: FontWeight.bold,
            //           ),
            //         ),
            //       ),
            // )
          ],
        ),
      ),
    );
  }
}
