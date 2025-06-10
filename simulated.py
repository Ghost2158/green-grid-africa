import json
import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import threading
import logging
from typing import Dict, List, Optional
import requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class IoTDataCollector:
    """
    IoT Data Collector for GreenGrid Africa
    Collects data from various sensors and weather APIs
    """

    def __init__(self, db_path='greengrid_data.db'):
        self.db_path = db_path
        self.setup_database()
        self.is_collecting = False
        self.collection_thread = None

    def setup_database(self):
        """Initialize SQLite database for storing IoT data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Create tables for different data types
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS solar_sensors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                panel_id TEXT,
                voltage REAL,
                current REAL,
                power REAL,
                temperature REAL,
                irradiance REAL
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS weather_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                location TEXT,
                temperature REAL,
                humidity REAL,
                pressure REAL,
                wind_speed REAL,
                wind_direction TEXT,
                cloud_cover REAL,
                sun_elevation REAL,
                sun_direction REAL
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS energy_consumption (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                household_id TEXT,
                power_consumption REAL,
                voltage REAL,
                frequency REAL
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS battery_status (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                battery_id TEXT,
                voltage REAL,
                current REAL,
                state_of_charge REAL,
                temperature REAL,
                health_status TEXT
            )
        ''')

        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")

    def simulate_solar_sensor_data(self, panel_id: str) -> Dict:
        """Simulate solar panel sensor data"""
        # Simulate realistic solar panel data based on time of day
        current_hour = datetime.now().hour

        # Base values that change throughout the day
        if 6 <= current_hour <= 18:  # Daylight hours
            base_irradiance = 800 * np.sin(np.pi * (current_hour - 6) / 12)
            base_power = base_irradiance * 0.2  # Rough conversion
        else:
            base_irradiance = 0
            base_power = 0

        # Add some realistic noise
        irradiance = max(0, base_irradiance + np.random.normal(0, 50))
        voltage = 24 + np.random.normal(0, 2)
        current = base_power / voltage if voltage > 0 else 0
        power = voltage * current
        temperature = 25 + np.random.normal(0, 5) + (irradiance / 100)

        return {
            'panel_id': panel_id,
            'voltage': round(voltage, 2),
            'current': round(current, 2),
            'power': round(power, 2),
            'temperature': round(temperature, 2),
            'irradiance': round(irradiance, 2)
        }

    def simulate_weather_data(self, location: str) -> Dict:
        """Simulate weather sensor data"""
        current_hour = datetime.now().hour

        # Simulate daily temperature pattern
        base_temp = 25 + 10 * np.sin(np.pi * (current_hour - 6) / 12)
        temperature = base_temp + np.random.normal(0, 2)

        # Calculate sun position (simplified)
        sun_elevation = max(0, 90 * np.sin(np.pi * (current_hour - 6) / 12))
        sun_direction = (current_hour - 6) * 15  # Rough approximation

        return {
            'location': location,
            'temperature': round(temperature, 2),
            'humidity': round(60 + np.random.normal(0, 10), 2),
            'pressure': round(1013 + np.random.normal(0, 5), 2),
            'wind_speed': round(abs(np.random.normal(15, 5)), 2),
            'wind_direction': np.random.choice(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']),
            'cloud_cover': round(abs(np.random.normal(30, 20)), 2),
            'sun_elevation': round(sun_elevation, 2),
            'sun_direction': round(sun_direction, 2)
        }

    def simulate_consumption_data(self, household_id: str) -> Dict:
        """Simulate household energy consumption data"""
        current_hour = datetime.now().hour

        # Simulate daily consumption pattern
        if 6 <= current_hour <= 22:  # Active hours
            base_consumption = 2 + 3 * np.sin(np.pi * (current_hour - 6) / 16)
        else:
            base_consumption = 0.5  # Standby consumption

        consumption = max(0.1, base_consumption + np.random.normal(0, 0.5))

        return {
            'household_id': household_id,
            'power_consumption': round(consumption, 2),
            'voltage': round(230 + np.random.normal(0, 5), 2),
            'frequency': round(50 + np.random.normal(0, 0.1), 2)
        }

    def simulate_battery_data(self, battery_id: str) -> Dict:
        """Simulate battery status data"""
        return {
            'battery_id': battery_id,
            'voltage': round(48 + np.random.normal(0, 2), 2),
            'current': round(np.random.normal(10, 3), 2),
            'state_of_charge': round(np.random.uniform(20, 95), 2),
            'temperature': round(30 + np.random.normal(0, 3), 2),
            'health_status': np.random.choice(['Good', 'Fair', 'Poor'], p=[0.8, 0.15, 0.05])
        }

    def store_data(self, table: str, data: Dict):
        """Store data in the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Prepare column names and values
        columns = ', '.join(data.keys())
        placeholders = ', '.join(['?' for _ in data])
        values = list(data.values())

        query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        cursor.execute(query, values)
        conn.commit()
        conn.close()

    def collect_data_cycle(self):
        """Single data collection cycle"""
        try:
            # Collect solar panel data
            for panel_id in ['PANEL_001', 'PANEL_002', 'PANEL_003']:
                solar_data = self.simulate_solar_sensor_data(panel_id)
                self.store_data('solar_sensors', solar_data)

            # Collect weather data
            weather_data = self.simulate_weather_data('Rural_Community_A')
            self.store_data('weather_data', weather_data)

            # Collect consumption data
            for household_id in ['HH_001', 'HH_002', 'HH_003', 'HH_004', 'HH_005']:
                consumption_data = self.simulate_consumption_data(household_id)
                self.store_data('energy_consumption', consumption_data)

            # Collect battery data
            for battery_id in ['BAT_001', 'BAT_002']:
                battery_data = self.simulate_battery_data(battery_id)
                self.store_data('battery_status', battery_data)

            logger.info("Data collection cycle completed")

        except Exception as e:
            logger.error(f"Error in data collection cycle: {e}")

    def start_collection(self, interval_seconds: int = 60):
        """Start continuous data collection"""
        if self.is_collecting:
            logger.warning("Data collection is already running")
            return

        self.is_collecting = True

        def collection_loop():
            while self.is_collecting:
                self.collect_data_cycle()
                time.sleep(interval_seconds)

        self.collection_thread = threading.Thread(target=collection_loop)
        self.collection_thread.daemon = True
        self.collection_thread.start()

        logger.info(
            f"Started data collection with {interval_seconds}s interval")

    def stop_collection(self):
        """Stop data collection"""
        self.is_collecting = False
        if self.collection_thread:
            self.collection_thread.join()
        logger.info("Data collection stopped")

    def get_recent_data(self, table: str, hours: int = 24) -> pd.DataFrame:
        """Get recent data from specified table"""
        conn = sqlite3.connect(self.db_path)

        query = f"""
            SELECT * FROM {table} 
            WHERE timestamp >= datetime('now', '-{hours} hours')
            ORDER BY timestamp DESC
        """

        df = pd.read_sql_query(query, conn)
        conn.close()

        return df

    def get_summary_stats(self) -> Dict:
        """Get summary statistics of collected data"""
        conn = sqlite3.connect(self.db_path)

        stats = {}

        # Solar panel stats
        solar_query = """
            SELECT 
                COUNT(*) as total_readings,
                AVG(power) as avg_power,
                MAX(power) as max_power,
                AVG(temperature) as avg_temp
            FROM solar_sensors 
            WHERE timestamp >= datetime('now', '-24 hours')
        """
        solar_stats = pd.read_sql_query(solar_query, conn).iloc[0].to_dict()
        stats['solar'] = solar_stats

        # Consumption stats
        consumption_query = """
            SELECT 
                COUNT(*) as total_readings,
                AVG(power_consumption) as avg_consumption,
                SUM(power_consumption) as total_consumption
            FROM energy_consumption 
            WHERE timestamp >= datetime('now', '-24 hours')
        """
        consumption_stats = pd.read_sql_query(
            consumption_query, conn).iloc[0].to_dict()
        stats['consumption'] = consumption_stats

        conn.close()
        return stats


# Example usage and testing
if __name__ == "__main__":
    # Initialize collector
    collector = IoTDataCollector()

    # Run a few collection cycles for testing
    print("Running test data collection...")
    for i in range(5):
        collector.collect_data_cycle()
        time.sleep(2)

    # Get recent data
    print("\nRecent solar sensor data:")
    solar_data = collector.get_recent_data('solar_sensors', hours=1)
    print(solar_data.head())

    print("\nRecent weather data:")
    weather_data = collector.get_recent_data('weather_data', hours=1)
    print(weather_data.head())

    # Get summary stats
    print("\nSummary statistics:")
    stats = collector.get_summary_stats()
    for category, data in stats.items():
        print(f"{category.upper()}:")
        for key, value in data.items():
            print(f"  {key}: {value}")

    print("\nIoT Data Collector test completed!")
