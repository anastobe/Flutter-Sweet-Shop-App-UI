import 'package:flutter/material.dart';
import 'package:flutter_sweet_shop_app_ui/core/widgets/globalButton.dart';

import '../../../../core/widgets/globalTextInput.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _onLoginPressed() {

    if(_emailController.text.trim() == ""){
      showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text('Required fields'),
            content: const Text('Email is required.'),
            actions: [
              TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
            ],
          )
      );
      return;
    }
    else if(_passwordController.text.trim() == ""){
      showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text('Required fields'),
            content: const Text('Password is required.'),
            actions: [
              TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
            ],
          )
      );
      return;
    }
    else{
      final Map<String, String> payload = {
        "email": _emailController.text.trim(),
        "password": _passwordController.text.trim(),
      };

      // Print payload (correct Dart string interpolation)
      print('hello bhaji kia hal ha $payload');

      // For demo: show the entered values in a dialog (avoid showing passwords in real apps)
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Entered credentials'),
          content: Text('Email: ${payload["email"]}\nPassword: ${payload["password"]}'),
          actions: [
            TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
          ],
        ),
      );

    }

  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xdd0C1544),
      body:
    SafeArea(
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
                padding:  const EdgeInsets.symmetric(horizontal: 24),
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
                    CustomInput(hint: "Enter Email", controller: _emailController),
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
