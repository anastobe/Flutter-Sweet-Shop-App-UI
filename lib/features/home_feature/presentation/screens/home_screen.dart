import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_sweet_shop_app_ui/core/theme/theme.dart';
import 'package:flutter_sweet_shop_app_ui/core/widgets/app_scaffold.dart';
import 'package:flutter_sweet_shop_app_ui/core/widgets/app_svg_viewer.dart';
import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/cart_tab.dart';
import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/orders_tab.dart';
import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/profile_tab.dart';

import '../../../../core/gen/assets.gen.dart';
import '../bloc/bottom_navigation_cubit.dart';
import '../widgets/home_app_bar.dart';
import '../widgets/tabs/home_tab.dart';
import '../widgets/tabs/map_tab.dart';
import 'package:flutter_sweet_shop_app_ui/core/constants/app_colors.dart';
import 'package:flutter_sweet_shop_app_ui/core/constants/assets.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider<BottomNavigationCubit>(
      create: (context) => BottomNavigationCubit(),
      child: const _HomeScreen(),
    );
  }
}

class _HomeScreen extends StatelessWidget {
  const _HomeScreen();

  @override
  Widget build(BuildContext context) {
    final watch = context.watch<BottomNavigationCubit>();
    final read = context.read<BottomNavigationCubit>();

    final List<Widget> tabs = [
      const HomeTab(),
      const CartTab(),
      const MapTab(),
      const ProfileTab(),
    ];

    return AppScaffold(
      appBar: watch.state.selectedIndex == 0 ? HomeAppBar() : null,
      body: tabs[watch.state.selectedIndex],
      padding: EdgeInsets.zero,
      bottomNavigationBar: _FigmaBottomNav(
        selectedIndex: watch.state.selectedIndex,
        onTap: (i) => read.onItemTap(index: i),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Figma-matching bottom nav
// ─────────────────────────────────────────────────────────────────────────────

class _FigmaBottomNav extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onTap;

  const _FigmaBottomNav({required this.selectedIndex, required this.onTap});

  static const _labels = ['Account', 'Payment', 'Card', 'Settings'];

  // Using image assets for the tabs
  static const _images = [
    AppAssets.accountTab,
    AppAssets.paymentTab,
    AppAssets.cardTab,
    AppAssets.settingTab,
  ];

  // Figma palette
  static const _darkSecondary = AppColors.darkSecondary;
  static const primary = AppColors.primary;
  static const _white = AppColors.white;


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        height: 70,
        decoration: BoxDecoration(color: _darkSecondary),
        child: Row(
          children: List.generate(_labels.length, (i) {
            return Expanded(
              child: GestureDetector(
                onTap: () => onTap(i),
                behavior: HitTestBehavior.opaque,
                child: _NavTile(
                  imageAsset: _images[i],
                  label: _labels[i],
                  isSelected: i == selectedIndex,
                  activeColor: primary,
                  idleColor: _white,
                ),
              ),
            );
          }),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Single tile
// ─────────────────────────────────────────────────────────────────────────────

class _NavTile extends StatelessWidget {
  final String? imageAsset;
  final String label;
  final bool isSelected;
  final Color activeColor;
  final Color idleColor;

  const _NavTile({
    this.imageAsset,
    required this.label,
    required this.isSelected,
    required this.activeColor,
    required this.idleColor,
  });

  @override
  Widget build(BuildContext context) {
    const activeIconColor = Color(0xFF0D1626); // dark icon on cyan bg

    return
      SizedBox(
        child: Container(
          margin: const EdgeInsets.fromLTRB(17,8,17,8), // thoda gap around the cyan box
          decoration: BoxDecoration(
            color: isSelected ? activeColor : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                color: isSelected ? activeIconColor : idleColor,
                imageAsset!,
                width: 24,
                height: 24
              ),
              const SizedBox(height: 2),
              Text(
                label,
                style: TextStyle(
                  color: isSelected ? activeIconColor : idleColor,
                  fontSize: 9,
                  fontFamily: 'Matter',
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ),
        ),
      );


  }
}

// import 'package:flutter/material.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:flutter_sweet_shop_app_ui/core/theme/theme.dart';
// import 'package:flutter_sweet_shop_app_ui/core/widgets/app_scaffold.dart';
// import 'package:flutter_sweet_shop_app_ui/core/widgets/app_svg_viewer.dart';
// import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/cart_tab.dart';
// import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/orders_tab.dart';
// import 'package:flutter_sweet_shop_app_ui/features/home_feature/presentation/widgets/tabs/profile_tab.dart';
//
// import '../../../../core/gen/assets.gen.dart';
// import '../bloc/bottom_navigation_cubit.dart';
// import '../widgets/home_app_bar.dart';
// import '../widgets/tabs/home_tab.dart';
// import '../widgets/tabs/map_tab.dart';
//
// class HomeScreen extends StatelessWidget {
//   const HomeScreen({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return BlocProvider<BottomNavigationCubit>(
//       create: (context) => BottomNavigationCubit(),
//       child: const _HomeScreen(),
//     );
//   }
// }
//
// class _HomeScreen extends StatelessWidget {
//   const _HomeScreen();
//
//   @override
//   Widget build(BuildContext context) {
//     final watch = context.watch<BottomNavigationCubit>();
//     final read = context.read<BottomNavigationCubit>();
//     final colors = context.theme.appColors;
//     final List<Widget> tabs = [
//       const HomeTab(),
//       const CartTab(),
//       const OrdersTab(),
//       const ProfileTab(),
//     ];
//     return AppScaffold(
//       appBar: watch.state.selectedIndex == 0 ? HomeAppBar() : null,
//       body: tabs[watch.state.selectedIndex],
//       padding: EdgeInsets.zero,
//       bottomNavigationBar: Container(
//         decoration: BoxDecoration(
//           color: Theme.of(context).scaffoldBackgroundColor,
//           borderRadius: BorderRadius.only(
//             topLeft: Radius.circular(32),
//             topRight: Radius.circular(32),
//           ),
//           boxShadow: [
//             BoxShadow(
//               color: Colors.black.withValues(alpha: 0.2),
//               spreadRadius: 3,
//               blurRadius: 5,
//               offset: Offset(0, 3),
//             ),
//           ],
//         ),
//         padding: EdgeInsets.only(top: 8, left: 8, right: 8),
//         child: NavigationBar(
//           selectedIndex: watch.state.selectedIndex,
//           onDestinationSelected: (final int index) {
//             read.onItemTap(index: index);
//           },
//
//           labelTextStyle: WidgetStateProperty.resolveWith<TextStyle>(
//                 (states) {
//               if (states.contains(WidgetState.selected)) {
//                 return TextStyle(
//                   color: colors.primary,
//                   fontWeight: FontWeight.bold,
//                 );
//               }
//               return TextStyle(
//                 color: Colors.grey,
//               );
//             },
//           ),
//
//           destinations: [
//             NavigationDestination(
//               icon: AppSvgViewer(Assets.icons.home2),
//               selectedIcon: AppSvgViewer(
//                 Assets.icons.home2,
//                 color: colors.primary,
//               ),
//               label: 'Home',
//             ),
//             NavigationDestination(
//               icon: AppSvgViewer(Assets.icons.shoppingCart),
//               selectedIcon: AppSvgViewer(
//                 Assets.icons.shoppingCart,
//                 color: colors.primary,
//               ),
//               label: 'Cart',
//             ),
//             NavigationDestination(
//               icon: AppSvgViewer(Assets.icons.map1),
//               selectedIcon: AppSvgViewer(
//                 Assets.icons.map1,
//                 color: colors.primary,
//               ),
//               label: 'Map',
//             ),
//             NavigationDestination(
//               icon: AppSvgViewer(Assets.icons.user),
//               selectedIcon: AppSvgViewer(
//                 Assets.icons.user,
//                 color: colors.primary,
//               ),
//               label: 'Profile',
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
