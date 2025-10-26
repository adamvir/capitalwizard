import 'package:shared_preferences/shared_preferences.dart';

/// Singleton wrapper for SharedPreferences
/// Provides type-safe storage methods with error handling
class StorageService {
  static final StorageService _instance = StorageService._internal();
  factory StorageService() => _instance;
  StorageService._internal();

  SharedPreferences? _prefs;

  /// Initialize the storage service
  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  /// Get SharedPreferences instance, initializing if needed
  Future<SharedPreferences> get _prefsInstance async {
    if (_prefs == null) {
      await init();
    }
    return _prefs!;
  }

  // String operations
  Future<bool> saveString(String key, String value) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.setString(key, value);
    } catch (e) {
      print('Error saving string for key $key: $e');
      return false;
    }
  }

  Future<String?> getString(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getString(key);
    } catch (e) {
      print('Error getting string for key $key: $e');
      return null;
    }
  }

  // Int operations
  Future<bool> saveInt(String key, int value) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.setInt(key, value);
    } catch (e) {
      print('Error saving int for key $key: $e');
      return false;
    }
  }

  Future<int?> getInt(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getInt(key);
    } catch (e) {
      print('Error getting int for key $key: $e');
      return null;
    }
  }

  // Bool operations
  Future<bool> saveBool(String key, bool value) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.setBool(key, value);
    } catch (e) {
      print('Error saving bool for key $key: $e');
      return false;
    }
  }

  Future<bool?> getBool(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getBool(key);
    } catch (e) {
      print('Error getting bool for key $key: $e');
      return null;
    }
  }

  // Double operations
  Future<bool> saveDouble(String key, double value) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.setDouble(key, value);
    } catch (e) {
      print('Error saving double for key $key: $e');
      return false;
    }
  }

  Future<double?> getDouble(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getDouble(key);
    } catch (e) {
      print('Error getting double for key $key: $e');
      return null;
    }
  }

  // StringList operations
  Future<bool> saveStringList(String key, List<String> value) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.setStringList(key, value);
    } catch (e) {
      print('Error saving string list for key $key: $e');
      return false;
    }
  }

  Future<List<String>?> getStringList(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getStringList(key);
    } catch (e) {
      print('Error getting string list for key $key: $e');
      return null;
    }
  }

  // Remove a key
  Future<bool> remove(String key) async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.remove(key);
    } catch (e) {
      print('Error removing key $key: $e');
      return false;
    }
  }

  // Clear all data
  Future<bool> clear() async {
    try {
      final prefs = await _prefsInstance;
      return await prefs.clear();
    } catch (e) {
      print('Error clearing storage: $e');
      return false;
    }
  }

  // Check if key exists
  Future<bool> containsKey(String key) async {
    try {
      final prefs = await _prefsInstance;
      return prefs.containsKey(key);
    } catch (e) {
      print('Error checking key $key: $e');
      return false;
    }
  }

  // Get all keys
  Future<Set<String>> getAllKeys() async {
    try {
      final prefs = await _prefsInstance;
      return prefs.getKeys();
    } catch (e) {
      print('Error getting all keys: $e');
      return <String>{};
    }
  }
}
