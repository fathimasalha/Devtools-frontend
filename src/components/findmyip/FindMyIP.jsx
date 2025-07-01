import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FindMyIP.css';
import { motion } from 'framer-motion';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAHxk_XmcsLaJ60WeDm3PrtBpK0PZ766Tw';

const FindMyIP = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8000/api/ipinfo/');
        setIpInfo(response.data);
      } catch (err) {
        setError('Failed to fetch IP information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchIpInfo();
  }, []);

  const handleMapError = () => {
    setMapError(true);
  };

  if (loading) {
    return (
      <div className="findmyip-flex-center">
        <div className="findmyip-spinner"></div>
        <div className="findmyip-title">Loading IP information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="findmyip-flex-center">
        <div className="findmyip-error"><i className="fas fa-exclamation-triangle mr-2" />{error}</div>
        <button
          className="findmyip-card-refresh"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-sync-alt mr-2" />Retry
        </button>
      </div>
    );
  }

  return (
    <div className={"findmyip-root findmyip-fadein-up"}>
      <h1 className="findmyip-title">FindMyIP</h1>
      <div className="findmyip-subtitle">Reveal your digital identity and network details</div>
      <div className="findmyip-grid">
        {/* IP Information Card */}
        <motion.div
          className="findmyip-card"
          whileHover={{ scale: 1.03, boxShadow: '0 4px 32px 0 rgba(102,126,234,0.18)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="findmyip-card-header">
            <div className="findmyip-card-icon">
              <i className="fas fa-server text-white text-xl" />
            </div>
            <h3 className="findmyip-card-title">IP Information</h3>
            <button
              className="findmyip-card-refresh"
              onClick={() => window.location.reload()}
              title="Refresh"
            >
              <i className="fas fa-sync-alt" />
            </button>
          </div>
          {ipInfo && (
            <div className="findmyip-info-list">
              {[
                { label: 'IPv4 Address', value: ipInfo.ip },
                { label: 'IPv6 Address', value: ipInfo.ipv6 || 'Not Detected' },
                { label: 'Location', value: [ipInfo.city, ipInfo.region, ipInfo.country].filter(Boolean).join(', ') || 'N/A' },
                { label: 'ISP', value: ipInfo.org || 'N/A' },
                { label: 'ASN', value: (ipInfo.asn || 'N/A').toString().split(' ')[0] },
                { label: 'Timezone', value: ipInfo.timezone || 'N/A' },
                { label: 'Postal Code', value: ipInfo.postal || 'N/A' },
              ].map((row, idx) => (
                <motion.div
                  className="findmyip-info-row"
                  key={row.label}
                  whileHover={{ backgroundColor: 'rgba(102,126,234,0.08)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="findmyip-info-label">{row.label}</span>
                  <span className="findmyip-info-value">{row.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        {/* Map Card */}
        <motion.div
          className="findmyip-map-card"
          whileHover={{ scale: 1.03, boxShadow: '0 4px 32px 0 rgba(102,126,234,0.18)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="findmyip-card-header">
            <div className="findmyip-card-icon">
              <i className="fas fa-map-marker-alt text-white text-xl" />
            </div>
            <h3 className="findmyip-card-title">Location Map</h3>
          </div>
          <div className="findmyip-map">
            {ipInfo && ipInfo.latitude && ipInfo.longitude && !mapError ? (
              <>
                <iframe
                  title="location-map"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  className="findmyip-map-iframe"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${ipInfo.latitude},${ipInfo.longitude}&zoom=12`}
                  allowFullScreen
                  onError={handleMapError}
                />
                {ipInfo && (ipInfo.city || ipInfo.country) && (
                  <div className="findmyip-map-label">
                    <i className="fas fa-map-pin" />
                    {`${ipInfo.city || ''}${ipInfo.city && ipInfo.country ? ', ' : ''}${ipInfo.country || ''}`}
                  </div>
                )}
              </>
            ) : (
              <div className="findmyip-map-error">
                <i className="fas fa-map-marker-alt text-3xl mb-2" />
                {mapError ? (
                  <p>Unable to load map. Please check your Google Maps API key.</p>
                ) : (
                  <p>Location data not available for map display.</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FindMyIP; 