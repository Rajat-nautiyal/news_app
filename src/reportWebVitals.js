import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

function reportWebVitals(metric) {
  // Customize this function to send the metric data to your analytics platform.
}

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
getFCP(reportWebVitals);
getTTFB(reportWebVitals);

export default reportWebVitals