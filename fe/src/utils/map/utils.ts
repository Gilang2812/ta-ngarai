import Swal from 'sweetalert2';

export const showError = (message: string) => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    customClass: {
      container: 'z-[1500]'
    }
  });
};

 

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker&v=weekly`;
  script.async = true;
  script.defer = true;

  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });
};

export const removeGoogleMapsScript = () => {
  const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
  
  if ('initMap' in window) {
    window.initMap = undefined;
  }
};