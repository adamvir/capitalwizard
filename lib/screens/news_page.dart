import 'package:flutter/material.dart';

/// News page - shows financial news and updates (placeholder for now)
class NewsPage extends StatelessWidget {
  const NewsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF0F172A),
            Color(0xFF1E3A8A),
            Color(0xFF0F172A),
          ],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          backgroundColor: const Color(0xFF1E40AF).withValues(alpha: 0.9),
          title: Row(
            children: const [
              Icon(Icons.article, color: Colors.white),
              SizedBox(width: 8),
              Text('Hírek', style: TextStyle(color: Colors.white)),
            ],
          ),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.newspaper,
                size: 80,
                color: const Color(0xFF3B82F6).withValues(alpha: 0.5),
              ),
              const SizedBox(height: 24),
              const Text(
                'Pénzügyi Hírek',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Hamarosan elérhető!',
                style: TextStyle(
                  color: Color(0xFF94A3B8),
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
