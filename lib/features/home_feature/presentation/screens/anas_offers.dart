import 'package:flutter/material.dart';

class AppBannerWidget extends StatelessWidget {

  const AppBannerWidget({
    super.key,
    required this.title,
    this.leftText = '20 Categories',
  });

  final String title;
  final String leftText;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          // Left-side text (e.g. "20 Categories")
          Text(
            leftText,
            style: const TextStyle(
              color: Colors.black54,
              fontSize: 14.0,
              fontWeight: FontWeight.w600,
            ),
          ),

          const Spacer(),

          // Right-side title (kept from original)
          Text(title, style: const TextStyle(
            color: Colors.green, // Change text color
            fontSize: 16.0,     // Change font size
            fontWeight: FontWeight.bold, // Make text bold
            letterSpacing: 1.5, // Add spacing between characters
          ))
        ],
      ),
    );
  }

}