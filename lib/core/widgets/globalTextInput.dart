import 'package:flutter/material.dart';


class CustomInput extends StatefulWidget {
  final String hint;
  final TextEditingController? controller;
  final bool isPassword;

  const CustomInput({super.key, required this.hint, this.controller, this.isPassword = false});

  @override
  State<CustomInput> createState() => _CustomInputState();
}

class _CustomInputState extends State<CustomInput> {
  late bool _obscure;

  @override
  void initState() {
    super.initState();
    _obscure = widget.isPassword;
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: widget.controller,
      obscureText: _obscure,
      style: const TextStyle(color: Colors.white, fontSize: 14, fontFamily: 'Matter', fontWeight: FontWeight.w500),
      decoration: InputDecoration(
        hintText: widget.hint,
        contentPadding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
        hintStyle: const TextStyle(color: Color(0xFFFFFFFF), fontSize: 14, fontFamily: 'Matter', fontWeight: FontWeight.w500),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0xFFFFFFFF), width: 1),
        ),

        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.white, width: 1),
        ),
        suffixIcon: widget.isPassword
            ? IconButton(
                onPressed: () {
                  setState(() => _obscure = !_obscure);
                },
                icon: Icon(
                  _obscure ? Icons.visibility_off : Icons.visibility,
                  color: Colors.white,
                ),
              )
            : null,
      ),
    );
  }
}
