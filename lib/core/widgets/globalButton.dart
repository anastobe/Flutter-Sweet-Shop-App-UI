import 'package:flutter/material.dart';


class CustomButton extends StatelessWidget {
  final String hint;
  final String? leftImage;
  final String? leftImageTintColor;
  final Color? btnColor;
  final Color? txtColor;
  final VoidCallback? onPressed;
  final double height;
  final Color? borderColor;
  final double? topMargin;

  const CustomButton({
    super.key,
    required this.hint,
    this.leftImage,
    this.btnColor,
    this.onPressed,
    this.height = 55.0, this.txtColor, this.leftImageTintColor, required this.borderColor, this.topMargin,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.only(top: topMargin ?? 0), // Add top margin if provided
      child: SizedBox(
        width: MediaQuery.sizeOf(context).width, // Specify your desired width
        height: height, // Optional: You can also specify the height
        child: ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: btnColor ?? theme.primaryColor, // Button's background color
            foregroundColor: txtColor ?? Colors.black, // Text/icon color
            shape: RoundedRectangleBorder( // Custom shape
              borderRadius: BorderRadius.circular(10),
              side: BorderSide(
                color: borderColor ?? Colors.transparent,
                width: 1,
              ),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children: [
              if (leftImage != null) ...[
                Image.asset(leftImage!, width: 22, height: 22, color: leftImageTintColor != null ? Color(int.parse(leftImageTintColor!)) : null),
                const SizedBox(width: 12),
              ],
              Text(hint, style: const TextStyle(fontSize: 18, fontFamily: "Matter", fontWeight: FontWeight.w400)),
            ],
          ),

        ),
      ),
    );
  }
}
