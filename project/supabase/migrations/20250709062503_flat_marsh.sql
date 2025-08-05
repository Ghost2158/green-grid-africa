/*
  # GreenGrid Africa - Complete Database Schema
  
  This comprehensive schema supports a solar energy management platform with:
  1. User Management (consumers, operators, administrators)
  2. Site Management (solar installations, equipment)
  3. Real-time Monitoring (sensor data, performance metrics)
  4. AI Predictions (generation, maintenance, consumption)
  5. Personal Solar Systems (individual user setups)
  6. Energy Management (generation tracking, billing)
  7. Alerts & Notifications
  8. Maintenance Management
  9. Financial Tracking
  10. Security & Audit Logging
*/

-- =============================================
-- 1. EXTENSIONS AND SETUP
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =============================================
-- 2. CORE USER MANAGEMENT
-- =============================================

-- Users table with role-based access
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    password_hash text NOT NULL,
    name text NOT NULL,
    role text NOT NULL CHECK (role IN ('user', 'operator', 'admin')),
    phone text,
    address text,
    city text,
    country text,
    is_active boolean DEFAULT true,
    email_verified boolean DEFAULT false,
    last_login timestamptz,
    login_attempts integer DEFAULT 0,
    locked_until timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- User permissions for fine-grained access control
CREATE TABLE IF NOT EXISTS user_permissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    permission text NOT NULL,
    granted_at timestamptz DEFAULT now(),
    granted_by uuid REFERENCES users(id),
    UNIQUE(user_id, permission)
);

-- User sessions for security tracking
CREATE TABLE IF NOT EXISTS user_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    session_token text UNIQUE NOT NULL,
    ip_address inet,
    user_agent text,
    expires_at timestamptz NOT NULL,
    created_at timestamptz DEFAULT now(),
    last_activity timestamptz DEFAULT now()
);

-- =============================================
-- 3. PERSONAL SOLAR SYSTEMS
-- =============================================

-- Individual user solar installations
CREATE TABLE IF NOT EXISTS user_solar_systems (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    system_name text NOT NULL DEFAULT 'My Solar System',
    panel_count integer NOT NULL CHECK (panel_count > 0),
    panel_capacity_watts integer NOT NULL CHECK (panel_capacity_watts > 0),
    total_capacity_kw decimal(8, 3) NOT NULL CHECK (total_capacity_kw > 0),
    panel_type text NOT NULL DEFAULT 'Monocrystalline Silicon',
    inverter_efficiency decimal(5, 2) NOT NULL DEFAULT 96.0 CHECK (inverter_efficiency > 0 AND inverter_efficiency <= 100),
    battery_capacity_kwh decimal(8, 3),
    installation_date date NOT NULL,
    commissioning_date date,
    warranty_expiry date,
    installer_company text,
    system_status text NOT NULL DEFAULT 'active' CHECK (system_status IN ('active', 'maintenance', 'inactive', 'decommissioned')),
    location_latitude decimal(10, 8) NOT NULL,
    location_longitude decimal(11, 8) NOT NULL,
    location_address text,
    location_city text,
    location_country text,
    timezone text DEFAULT 'UTC',
    metadata jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Solar system components (panels, inverters, batteries, etc.)
CREATE TABLE IF NOT EXISTS solar_system_components (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    component_type text NOT NULL CHECK (component_type IN ('panel', 'inverter', 'battery', 'meter', 'optimizer', 'monitoring')),
    component_name text NOT NULL,
    manufacturer text,
    model text,
    serial_number text,
    capacity_watts decimal(8, 2),
    efficiency_percentage decimal(5, 2),
    installation_date date,
    warranty_expiry date,
    status text NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'faulty', 'replaced')),
    location_description text,
    specifications jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- =============================================
-- 4. COMMERCIAL SITE MANAGEMENT
-- =============================================

-- Commercial solar installation sites
CREATE TABLE IF NOT EXISTS commercial_sites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    site_type text NOT NULL DEFAULT 'commercial' CHECK (site_type IN ('commercial', 'utility', 'industrial', 'community')),
    latitude decimal(10, 8) NOT NULL,
    longitude decimal(11, 8) NOT NULL,
    address text,
    city text,
    country text,
    capacity_kw decimal(10, 2) NOT NULL,
    installation_date date,
    commissioning_date date,
    status text NOT NULL DEFAULT 'online' CHECK (status IN ('online', 'offline', 'maintenance', 'warning')),
    timezone text DEFAULT 'UTC',
    operator_company text,
    maintenance_contact text,
    emergency_contact text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Site access control for operators
CREATE TABLE IF NOT EXISTS site_access (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    access_level text NOT NULL DEFAULT 'read' CHECK (access_level IN ('read', 'write', 'admin')),
    granted_at timestamptz DEFAULT now(),
    granted_by uuid REFERENCES users(id),
    UNIQUE(user_id, site_id)
);

-- Commercial site equipment tracking
CREATE TABLE IF NOT EXISTS site_equipment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('inverter', 'panel_array', 'battery_bank', 'transformer', 'meter', 'sensor', 'monitoring_system')),
    model text,
    manufacturer text,
    serial_number text,
    capacity_kw decimal(10, 2),
    installation_date date,
    warranty_expiry date,
    status text NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'faulty', 'offline')),
    location_description text,
    specifications jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- =============================================
-- 5. REAL-TIME MONITORING & SENSOR DATA
-- =============================================

-- Personal solar system readings
CREATE TABLE IF NOT EXISTS personal_solar_readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    component_id uuid REFERENCES solar_system_components(id) ON DELETE SET NULL,
    timestamp timestamptz NOT NULL,
    power_output_kw decimal(8, 3),
    energy_generated_kwh decimal(10, 4),
    voltage decimal(6, 2),
    current decimal(6, 2),
    frequency decimal(5, 2),
    power_factor decimal(4, 3),
    temperature decimal(5, 2),
    efficiency_percentage decimal(5, 2),
    status text DEFAULT 'normal' CHECK (status IN ('normal', 'warning', 'error')),
    created_at timestamptz DEFAULT now()
);

-- Commercial site sensor readings
CREATE TABLE IF NOT EXISTS commercial_sensor_readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    equipment_id uuid REFERENCES site_equipment(id) ON DELETE SET NULL,
    timestamp timestamptz NOT NULL,
    temperature decimal(5, 2),
    humidity decimal(5, 2),
    solar_irradiance decimal(8, 2),
    wind_speed decimal(5, 2),
    power_output_kw decimal(10, 2),
    voltage decimal(8, 2),
    current decimal(8, 2),
    frequency decimal(5, 2),
    power_factor decimal(4, 3),
    energy_produced_kwh decimal(12, 4),
    efficiency_percentage decimal(5, 2),
    status text DEFAULT 'normal' CHECK (status IN ('normal', 'warning', 'error')),
    metadata jsonb,
    created_at timestamptz DEFAULT now()
);

-- Environmental data (weather conditions)
CREATE TABLE IF NOT EXISTS environmental_data (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    location_latitude decimal(10, 8) NOT NULL,
    location_longitude decimal(11, 8) NOT NULL,
    timestamp timestamptz NOT NULL,
    temperature decimal(5, 2),
    humidity decimal(5, 2),
    solar_irradiance decimal(8, 2),
    wind_speed decimal(5, 2),
    wind_direction integer CHECK (wind_direction >= 0 AND wind_direction <= 360),
    cloud_cover decimal(5, 2) CHECK (cloud_cover >= 0 AND cloud_cover <= 100),
    uv_index decimal(4, 2),
    atmospheric_pressure decimal(7, 2),
    weather_condition text,
    visibility_km decimal(6, 2),
    precipitation_mm decimal(6, 2),
    data_source text DEFAULT 'weather_api',
    created_at timestamptz DEFAULT now()
);

-- =============================================
-- 6. AI MODELS AND PREDICTIONS
-- =============================================

-- AI model registry
CREATE TABLE IF NOT EXISTS ai_models (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('generation', 'weather', 'demand', 'maintenance', 'consumption', 'optimization')),
    version text NOT NULL,
    description text,
    algorithm text,
    accuracy_percentage decimal(5, 2),
    training_data_period daterange,
    last_trained timestamptz,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'training', 'deprecated', 'inactive')),
    hyperparameters jsonb,
    performance_metrics jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Personal solar generation predictions
CREATE TABLE IF NOT EXISTS personal_generation_predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id uuid REFERENCES ai_models(id),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    target_timestamp timestamptz NOT NULL,
    predicted_power_kw decimal(8, 3) NOT NULL,
    predicted_energy_kwh decimal(10, 4),
    confidence_score decimal(4, 3) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    weather_factor decimal(4, 3),
    temperature_factor decimal(4, 3),
    efficiency_factor decimal(4, 3),
    input_features jsonb,
    weather_conditions jsonb,
    created_at timestamptz DEFAULT now()
);

-- Commercial solar generation predictions
CREATE TABLE IF NOT EXISTS commercial_generation_predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id uuid REFERENCES ai_models(id),
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    target_timestamp timestamptz NOT NULL,
    predicted_power_kw decimal(10, 2) NOT NULL,
    predicted_energy_kwh decimal(12, 4),
    confidence_score decimal(4, 3) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    input_features jsonb,
    weather_conditions jsonb,
    created_at timestamptz DEFAULT now()
);

-- Predictive maintenance recommendations
CREATE TABLE IF NOT EXISTS maintenance_predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id uuid REFERENCES ai_models(id),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    component_id uuid,
    maintenance_type text NOT NULL CHECK (maintenance_type IN ('cleaning', 'angle_adjustment', 'repair', 'replacement', 'inspection', 'calibration')),
    priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    predicted_date date NOT NULL,
    confidence_score decimal(4, 3) NOT NULL,
    description text,
    estimated_cost decimal(10, 2),
    estimated_downtime_hours integer,
    potential_savings decimal(10, 2),
    risk_factors jsonb,
    recommendations jsonb,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT maintenance_predictions_system_or_site CHECK (
        (system_id IS NOT NULL AND site_id IS NULL) OR 
        (system_id IS NULL AND site_id IS NOT NULL)
    )
);

-- =============================================
-- 7. ENERGY GENERATION & FINANCIAL TRACKING
-- =============================================

-- Personal energy generation records
CREATE TABLE IF NOT EXISTS personal_energy_generation (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    date date NOT NULL,
    total_generation_kwh decimal(10, 4) NOT NULL,
    peak_power_kw decimal(8, 3),
    average_efficiency decimal(5, 2),
    weather_impact_factor decimal(4, 3),
    system_uptime_percentage decimal(5, 2),
    estimated_value_usd decimal(8, 2),
    carbon_offset_kg decimal(8, 3),
    created_at timestamptz DEFAULT now(),
    UNIQUE(system_id, date)
);

-- Personal energy consumption tracking
CREATE TABLE IF NOT EXISTS personal_energy_consumption (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE SET NULL,
    timestamp timestamptz NOT NULL,
    consumption_kwh decimal(10, 4) NOT NULL,
    generation_kwh decimal(10, 4) DEFAULT 0,
    grid_import_kwh decimal(10, 4) DEFAULT 0,
    grid_export_kwh decimal(10, 4) DEFAULT 0,
    battery_charge_kwh decimal(10, 4) DEFAULT 0,
    battery_discharge_kwh decimal(10, 4) DEFAULT 0,
    cost_usd decimal(8, 2),
    savings_usd decimal(8, 2),
    carbon_offset_kg decimal(8, 3),
    tariff_rate decimal(6, 4),
    time_of_use_period text,
    created_at timestamptz DEFAULT now()
);

-- Commercial site revenue tracking
CREATE TABLE IF NOT EXISTS commercial_revenue_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    date date NOT NULL,
    energy_sold_kwh decimal(12, 4) NOT NULL,
    revenue_usd decimal(12, 2) NOT NULL,
    tariff_rate decimal(6, 4),
    grid_export_revenue decimal(12, 2),
    carbon_credit_revenue decimal(12, 2),
    incentive_revenue decimal(12, 2),
    created_at timestamptz DEFAULT now(),
    UNIQUE(site_id, date)
);

-- Operating expenses for both personal and commercial systems
CREATE TABLE IF NOT EXISTS operating_expenses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    date date NOT NULL,
    expense_type text NOT NULL CHECK (expense_type IN ('maintenance', 'insurance', 'monitoring', 'cleaning', 'repairs', 'upgrades', 'other')),
    amount_usd decimal(10, 2) NOT NULL,
    description text,
    vendor text,
    invoice_number text,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT expenses_system_or_site CHECK (
        (system_id IS NOT NULL AND site_id IS NULL) OR 
        (system_id IS NULL AND site_id IS NOT NULL)
    )
);

-- =============================================
-- 8. ALERTS AND NOTIFICATIONS
-- =============================================

-- System alerts for both personal and commercial systems
CREATE TABLE IF NOT EXISTS alerts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL CHECK (type IN ('generation', 'maintenance', 'performance', 'system', 'weather', 'security', 'financial')),
    severity text NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    title text NOT NULL,
    message text NOT NULL,
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    ai_generated boolean DEFAULT false,
    action_required boolean DEFAULT false,
    estimated_impact text,
    recommendations jsonb,
    acknowledged boolean DEFAULT false,
    acknowledged_by uuid REFERENCES users(id),
    acknowledged_at timestamptz,
    resolved boolean DEFAULT false,
    resolved_by uuid REFERENCES users(id),
    resolved_at timestamptz,
    resolution_notes text,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT alerts_system_or_site CHECK (
        (system_id IS NOT NULL AND site_id IS NULL) OR 
        (system_id IS NULL AND site_id IS NOT NULL)
    )
);

-- User notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    alert_type text NOT NULL,
    email_enabled boolean DEFAULT true,
    sms_enabled boolean DEFAULT false,
    push_enabled boolean DEFAULT true,
    severity_threshold text DEFAULT 'warning' CHECK (severity_threshold IN ('info', 'warning', 'error', 'critical')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, alert_type)
);

-- =============================================
-- 9. MAINTENANCE MANAGEMENT
-- =============================================

-- Maintenance records for both personal and commercial systems
CREATE TABLE IF NOT EXISTS maintenance_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id uuid REFERENCES user_solar_systems(id) ON DELETE CASCADE,
    site_id uuid REFERENCES commercial_sites(id) ON DELETE CASCADE,
    component_id uuid,
    maintenance_type text NOT NULL,
    priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'postponed')),
    scheduled_date timestamptz NOT NULL,
    started_at timestamptz,
    completed_at timestamptz,
    assigned_to uuid REFERENCES users(id),
    performed_by text,
    description text,
    work_performed text,
    parts_used jsonb,
    cost_usd decimal(10, 2),
    downtime_hours decimal(6, 2),
    efficiency_improvement decimal(5, 2),
    next_maintenance_date date,
    prediction_id uuid REFERENCES maintenance_predictions(id),
    photos jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT maintenance_system_or_site CHECK (
        (system_id IS NOT NULL AND site_id IS NULL) OR 
        (system_id IS NULL AND site_id IS NOT NULL)
    )
);

-- =============================================
-- 10. SYSTEM CONFIGURATION & SECURITY
-- =============================================

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text NOT NULL,
    data_type text NOT NULL CHECK (data_type IN ('string', 'number', 'boolean', 'json')),
    description text,
    category text,
    is_public boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Audit log for security and compliance
CREATE TABLE IF NOT EXISTS audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name text NOT NULL,
    record_id uuid,
    action text NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values jsonb,
    new_values jsonb,
    user_id uuid REFERENCES users(id),
    ip_address inet,
    user_agent text,
    created_at timestamptz DEFAULT now()
);

-- API keys and integrations
CREATE TABLE IF NOT EXISTS api_integrations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('weather', 'monitoring', 'billing', 'maintenance', 'analytics')),
    api_key_encrypted text,
    endpoint_url text,
    configuration jsonb,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    last_sync timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- =============================================
-- 11. INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Solar system indexes
CREATE INDEX IF NOT EXISTS idx_user_solar_systems_user_id ON user_solar_systems(user_id);
CREATE INDEX IF NOT EXISTS idx_user_solar_systems_status ON user_solar_systems(system_status);
CREATE INDEX IF NOT EXISTS idx_solar_system_components_system_id ON solar_system_components(system_id);

-- Commercial site indexes
CREATE INDEX IF NOT EXISTS idx_commercial_sites_status ON commercial_sites(status);
CREATE INDEX IF NOT EXISTS idx_site_equipment_site_type ON site_equipment(site_id, type);

-- Sensor data indexes (time-series optimized)
CREATE INDEX IF NOT EXISTS idx_personal_solar_readings_system_timestamp ON personal_solar_readings(system_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_commercial_sensor_readings_site_timestamp ON commercial_sensor_readings(site_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_environmental_data_location_timestamp ON environmental_data(location_latitude, location_longitude, timestamp DESC);

-- Prediction indexes
CREATE INDEX IF NOT EXISTS idx_personal_generation_predictions_system_target ON personal_generation_predictions(system_id, target_timestamp);
CREATE INDEX IF NOT EXISTS idx_commercial_generation_predictions_site_target ON commercial_generation_predictions(site_id, target_timestamp);
CREATE INDEX IF NOT EXISTS idx_maintenance_predictions_system_date ON maintenance_predictions(system_id, predicted_date) WHERE system_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_maintenance_predictions_site_date ON maintenance_predictions(site_id, predicted_date) WHERE site_id IS NOT NULL;

-- Energy and financial indexes
CREATE INDEX IF NOT EXISTS idx_personal_energy_generation_system_date ON personal_energy_generation(system_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_personal_energy_consumption_user_timestamp ON personal_energy_consumption(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_commercial_revenue_records_site_date ON commercial_revenue_records(site_id, date DESC);

-- Alert indexes
CREATE INDEX IF NOT EXISTS idx_alerts_system_created ON alerts(system_id, created_at DESC) WHERE system_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_alerts_site_created ON alerts(site_id, created_at DESC) WHERE site_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_alerts_severity_created ON alerts(severity, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_unacknowledged ON alerts(acknowledged, created_at DESC) WHERE acknowledged = false;

-- Maintenance indexes
CREATE INDEX IF NOT EXISTS idx_maintenance_records_system_date ON maintenance_records(system_id, scheduled_date) WHERE system_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_maintenance_records_site_date ON maintenance_records(site_id, scheduled_date) WHERE site_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_maintenance_records_status ON maintenance_records(status);

-- =============================================
-- 12. FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_solar_systems_updated_at BEFORE UPDATE ON user_solar_systems FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_solar_system_components_updated_at BEFORE UPDATE ON solar_system_components FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commercial_sites_updated_at BEFORE UPDATE ON commercial_sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_equipment_updated_at BEFORE UPDATE ON site_equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_records_updated_at BEFORE UPDATE ON maintenance_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_integrations_updated_at BEFORE UPDATE ON api_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate total system capacity
CREATE OR REPLACE FUNCTION calculate_system_capacity()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_capacity_kw = (NEW.panel_count * NEW.panel_capacity_watts) / 1000.0;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate total capacity
CREATE TRIGGER calculate_system_capacity_trigger 
    BEFORE INSERT OR UPDATE ON user_solar_systems 
    FOR EACH ROW EXECUTE FUNCTION calculate_system_capacity();

-- Function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, created_at)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), now());
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, created_at)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW), now());
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_values, created_at)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW), now());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Enable audit logging on sensitive tables
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_user_solar_systems AFTER INSERT OR UPDATE OR DELETE ON user_solar_systems FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_maintenance_records AFTER INSERT OR UPDATE OR DELETE ON maintenance_records FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =============================================
-- 13. VIEWS FOR COMMON QUERIES
-- =============================================

-- Personal solar system performance summary
CREATE VIEW personal_system_performance AS
SELECT 
    s.id as system_id,
    s.user_id,
    u.name as user_name,
    s.system_name,
    s.total_capacity_kw,
    s.panel_count,
    s.system_status,
    COALESCE(AVG(r.power_output_kw), 0) as avg_power_output_kw,
    COALESCE(MAX(r.power_output_kw), 0) as max_power_output_kw,
    COALESCE(AVG(r.efficiency_percentage), 0) as avg_efficiency,
    COUNT(r.id) as reading_count,
    MAX(r.timestamp) as last_reading
FROM user_solar_systems s
JOIN users u ON s.user_id = u.id
LEFT JOIN personal_solar_readings r ON s.id = r.system_id 
    AND r.timestamp >= now() - interval '24 hours'
GROUP BY s.id, s.user_id, u.name, s.system_name, s.total_capacity_kw, s.panel_count, s.system_status;

-- Commercial site performance summary
CREATE VIEW commercial_site_performance AS
SELECT 
    s.id as site_id,
    s.name as site_name,
    s.capacity_kw,
    s.status,
    COALESCE(AVG(r.power_output_kw), 0) as avg_power_output_kw,
    COALESCE(MAX(r.power_output_kw), 0) as max_power_output_kw,
    COALESCE(AVG(r.temperature), 0) as avg_temperature,
    COALESCE(AVG(r.solar_irradiance), 0) as avg_solar_irradiance,
    COUNT(r.id) as sensor_readings_count,
    MAX(r.timestamp) as last_reading
FROM commercial_sites s
LEFT JOIN commercial_sensor_readings r ON s.id = r.site_id 
    AND r.timestamp >= now() - interval '24 hours'
GROUP BY s.id, s.name, s.capacity_kw, s.status;

-- Active alerts summary
CREATE VIEW active_alerts_summary AS
SELECT 
    type,
    severity,
    COUNT(*) as alert_count,
    COUNT(CASE WHEN acknowledged = false THEN 1 END) as unacknowledged_count,
    MIN(created_at) as oldest_alert,
    MAX(created_at) as newest_alert
FROM alerts 
WHERE resolved = false
GROUP BY type, severity
ORDER BY 
    CASE severity 
        WHEN 'critical' THEN 1 
        WHEN 'error' THEN 2 
        WHEN 'warning' THEN 3 
        WHEN 'info' THEN 4 
    END,
    alert_count DESC;

-- User energy summary
CREATE VIEW user_energy_summary AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    COALESCE(SUM(ec.consumption_kwh), 0) as total_consumption_kwh,
    COALESCE(SUM(ec.generation_kwh), 0) as total_generation_kwh,
    COALESCE(SUM(ec.savings_usd), 0) as total_savings_usd,
    COALESCE(SUM(ec.carbon_offset_kg), 0) as total_carbon_offset_kg,
    COUNT(ec.id) as consumption_records_count
FROM users u
LEFT JOIN personal_energy_consumption ec ON u.id = ec.user_id 
    AND ec.timestamp >= date_trunc('month', now())
WHERE u.role = 'user'
GROUP BY u.id, u.name, u.email;

-- =============================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_solar_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_system_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_solar_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_energy_generation ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_energy_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Solar system policies
CREATE POLICY "Users can view own solar systems" ON user_solar_systems
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own solar systems" ON user_solar_systems
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own system components" ON solar_system_components
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_solar_systems 
            WHERE user_solar_systems.id = solar_system_components.system_id 
            AND user_solar_systems.user_id = auth.uid()
        )
    );

-- Personal solar readings policies
CREATE POLICY "Users can view own solar readings" ON personal_solar_readings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_solar_systems 
            WHERE user_solar_systems.id = personal_solar_readings.system_id 
            AND user_solar_systems.user_id = auth.uid()
        )
    );

-- Energy consumption policies
CREATE POLICY "Users can view own consumption" ON personal_energy_consumption
    FOR SELECT USING (auth.uid() = user_id);

-- Operators and admins can see commercial site data
CREATE POLICY "Operators can view commercial sensor data" ON commercial_sensor_readings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('operator', 'admin')
        )
    );

-- Alert policies
CREATE POLICY "Users can view own system alerts" ON alerts
    FOR SELECT USING (
        (system_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM user_solar_systems 
            WHERE user_solar_systems.id = alerts.system_id 
            AND user_solar_systems.user_id = auth.uid()
        )) OR
        (site_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('operator', 'admin')
        ))
    );

-- =============================================
-- 15. SAMPLE DATA INSERTION
-- =============================================

-- Insert default system settings
INSERT INTO system_settings (key, value, data_type, description, category) VALUES
('app_name', 'GreenGrid Africa', 'string', 'Application name', 'general'),
('default_timezone', 'UTC', 'string', 'Default timezone for the system', 'general'),
('energy_rate_per_kwh', '0.12', 'number', 'Default energy rate per kWh in USD', 'billing'),
('carbon_offset_per_kwh', '0.5', 'number', 'Carbon offset in kg per kWh generated', 'environmental'),
('maintenance_alert_threshold', '72', 'number', 'Hours before maintenance to send alerts', 'maintenance'),
('ai_prediction_confidence_threshold', '0.75', 'number', 'Minimum confidence score for AI predictions', 'ai'),
('max_login_attempts', '5', 'number', 'Maximum login attempts before account lockout', 'security'),
('session_timeout_hours', '24', 'number', 'Session timeout in hours', 'security'),
('weather_api_key', '', 'string', 'API key for weather data service', 'integrations'),
('default_panel_efficiency', '20.5', 'number', 'Default solar panel efficiency percentage', 'solar'),
('default_inverter_efficiency', '96.0', 'number', 'Default inverter efficiency percentage', 'solar'),
('battery_depth_of_discharge', '80.0', 'number', 'Safe depth of discharge for batteries', 'battery');

-- Insert AI models
INSERT INTO ai_models (name, type, version, description, accuracy_percentage, status) VALUES
('Personal Solar Generation LSTM v3.0', 'generation', '3.0', 'LSTM neural network for personal solar generation prediction', 92.5, 'active'),
('Commercial Solar Generation LSTM v2.1', 'generation', '2.1', 'LSTM neural network for commercial solar generation prediction', 94.2, 'active'),
('Weather Forecast CNN v1.8', 'weather', '1.8', 'Convolutional neural network for weather prediction', 89.7, 'active'),
('Personal Maintenance Predictor v2.0', 'maintenance', '2.0', 'Random forest classifier for personal system maintenance', 85.3, 'active'),
('Commercial Maintenance Predictor v1.5', 'maintenance', '1.5', 'Random forest classifier for commercial system maintenance', 87.3, 'active'),
('Energy Optimization AI v1.0', 'optimization', '1.0', 'AI model for energy usage optimization recommendations', 88.9, 'active');

-- Insert sample commercial sites
INSERT INTO commercial_sites (name, description, latitude, longitude, address, city, country, capacity_kw, installation_date, status) VALUES
('Lagos Solar Farm', 'Primary commercial solar installation in Lagos', 6.5244, 3.3792, 'Victoria Island', 'Lagos', 'Nigeria', 50000.00, '2023-01-15', 'online'),
('Nairobi Green Grid', 'Commercial solar facility in Nairobi business district', -1.2921, 36.8219, 'Westlands', 'Nairobi', 'Kenya', 35000.00, '2023-03-20', 'online'),
('Cape Town Solar Hub', 'Large-scale coastal solar installation', -33.9249, 18.4241, 'Table Bay', 'Cape Town', 'South Africa', 75000.00, '2022-11-10', 'maintenance'),
('Accra Power Station', 'Urban commercial solar grid in Accra', 5.6037, -0.1870, 'Airport Residential Area', 'Accra', 'Ghana', 40000.00, '2023-05-05', 'online');

-- Insert API integrations
INSERT INTO api_integrations (name, type, endpoint_url, configuration, status) VALUES
('OpenWeatherMap', 'weather', 'https://api.openweathermap.org/data/2.5', '{"units": "metric", "lang": "en"}', 'active'),
('SolarEdge Monitoring', 'monitoring', 'https://monitoringapi.solaredge.com', '{"version": "1.0"}', 'active'),
('Enphase Enlighten', 'monitoring', 'https://api.enphaseenergy.com', '{"version": "2.0"}', 'active');

-- =============================================
-- 16. MATERIALIZED VIEWS FOR ANALYTICS
-- =============================================

-- Daily personal energy production summary
CREATE MATERIALIZED VIEW daily_personal_energy_production AS
SELECT 
    system_id,
    date_trunc('day', timestamp) as production_date,
    SUM(power_output_kw) as total_power_kw,
    AVG(power_output_kw) as avg_power_kw,
    MAX(power_output_kw) as peak_power_kw,
    AVG(efficiency_percentage) as avg_efficiency,
    COUNT(*) as reading_count
FROM personal_solar_readings
WHERE power_output_kw IS NOT NULL
GROUP BY system_id, date_trunc('day', timestamp)
ORDER BY system_id, production_date DESC;

-- Daily commercial energy production summary
CREATE MATERIALIZED VIEW daily_commercial_energy_production AS
SELECT 
    site_id,
    date_trunc('day', timestamp) as production_date,
    SUM(power_output_kw) as total_power_kw,
    AVG(power_output_kw) as avg_power_kw,
    MAX(power_output_kw) as peak_power_kw,
    AVG(temperature) as avg_temperature,
    AVG(solar_irradiance) as avg_solar_irradiance,
    COUNT(*) as reading_count
FROM commercial_sensor_readings
WHERE power_output_kw IS NOT NULL
GROUP BY site_id, date_trunc('day', timestamp)
ORDER BY site_id, production_date DESC;

-- Create indexes on materialized views
CREATE INDEX idx_daily_personal_energy_production_system_date ON daily_personal_energy_production(system_id, production_date DESC);
CREATE INDEX idx_daily_commercial_energy_production_site_date ON daily_commercial_energy_production(site_id, production_date DESC);

-- Refresh materialized view functions
CREATE OR REPLACE FUNCTION refresh_daily_energy_production()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_personal_energy_production;
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_commercial_energy_production;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 17. UTILITY FUNCTIONS
-- =============================================

-- Function to get system performance metrics
CREATE OR REPLACE FUNCTION get_system_performance_metrics(p_system_id uuid, p_days integer DEFAULT 30)
RETURNS TABLE (
    avg_daily_generation decimal,
    peak_power decimal,
    total_energy decimal,
    avg_efficiency decimal,
    uptime_percentage decimal
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        AVG(total_generation_kwh) as avg_daily_generation,
        MAX(peak_power_kw) as peak_power,
        SUM(total_generation_kwh) as total_energy,
        AVG(average_efficiency) as avg_efficiency,
        AVG(system_uptime_percentage) as uptime_percentage
    FROM personal_energy_generation
    WHERE system_id = p_system_id
    AND date >= CURRENT_DATE - INTERVAL '1 day' * p_days;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate carbon offset
CREATE OR REPLACE FUNCTION calculate_carbon_offset(p_energy_kwh decimal)
RETURNS decimal AS $$
DECLARE
    carbon_factor decimal;
BEGIN
    SELECT value::decimal INTO carbon_factor 
    FROM system_settings 
    WHERE key = 'carbon_offset_per_kwh';
    
    RETURN p_energy_kwh * COALESCE(carbon_factor, 0.5);
END;
$$ LANGUAGE plpgsql;

-- Function to get weather impact on generation
CREATE OR REPLACE FUNCTION get_weather_impact(p_latitude decimal, p_longitude decimal, p_timestamp timestamptz)
RETURNS TABLE (
    temperature decimal,
    solar_irradiance decimal,
    cloud_cover decimal,
    weather_factor decimal
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.temperature,
        e.solar_irradiance,
        e.cloud_cover,
        CASE 
            WHEN e.cloud_cover < 20 THEN 1.0
            WHEN e.cloud_cover < 50 THEN 0.8
            WHEN e.cloud_cover < 80 THEN 0.6
            ELSE 0.4
        END as weather_factor
    FROM environmental_data e
    WHERE e.location_latitude = p_latitude
    AND e.location_longitude = p_longitude
    AND e.timestamp <= p_timestamp
    ORDER BY e.timestamp DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SCHEMA COMPLETE
-- =============================================

-- Add comments for documentation
COMMENT ON DATABASE postgres IS 'GreenGrid Africa - Solar Energy Management Platform Database';
COMMENT ON TABLE users IS 'User accounts with role-based access control';
COMMENT ON TABLE user_solar_systems IS 'Individual user solar panel installations';
COMMENT ON TABLE commercial_sites IS 'Large-scale commercial solar installations';
COMMENT ON TABLE personal_solar_readings IS 'Real-time sensor data from personal solar systems';
COMMENT ON TABLE commercial_sensor_readings IS 'Real-time sensor data from commercial solar sites';
COMMENT ON TABLE ai_models IS 'Registry of AI models used for predictions';
COMMENT ON TABLE personal_generation_predictions IS 'AI-generated predictions for personal solar systems';
COMMENT ON TABLE maintenance_predictions IS 'Predictive maintenance recommendations';
COMMENT ON TABLE alerts IS 'System alerts and notifications';
COMMENT ON TABLE maintenance_records IS 'Maintenance history and scheduling';