/* eslint-disable react-hooks/exhaustive-deps */
import './Map.scss';
import React, { useState, memo, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import useGeoLocation from '../../custom-hooks/useGeoLocation';

const libraries = ['places'];
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  sensor: true
};

const Map = (props) => {
  const { width, height, selectedLocation } = props;
  const location = useGeoLocation();
  const containerStyle = {
    width: width ? width : '100vw',
    height: height ? height : '80vh'
  };
  const [center, setCenter] = useState({
    lat: 25.276987,
    lng: 55.296249
  });
  // const center = {
  //   lat: 25.276987,
  //   lng: 55.296249
  // };

  useEffect(() => {
    if (
      location?.loaded &&
      location?.coordinates?.lat &&
      location?.coordinates?.lng
    ) {
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
      });
    }
  }, [location.loaded]);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    // googleMapsApiKey: "AIzaSyDJUCAx7iYOa-BICreoXivNcuaNfbzlTW4",
    // googleMapsApiKey: "AIzaSyBENexJcroAZUzqkP9rXiIE-2hiqa36wC0",
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    googleMapsApiKey: '',
    libraries,
    language: 'ar'
  });

  // const onLoadMarker = marker => {
  // 	console.log("marker: ", marker);
  // };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'loading maps';
  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={
          selectedLocation.lat && selectedLocation.lng
            ? selectedLocation
            : center
        }
        zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        className="custom-google-map"
      >
        <>
          <Marker
            // icon={mapIcon}
            // onLoad={onLoadMarker}
            position={
              selectedLocation.lat && selectedLocation.lng
                ? selectedLocation
                : center
            }
          />
        </>
      </GoogleMap>
      {/* {location.loaded
        ? JSON.stringify(location, null, 2)
        : 'Location data not available yet.'}
      <h1>
        center:
        {JSON.stringify(center, null, 2)}
      </h1>
      <h1>
        selected location:
        {JSON.stringify(selectedLocation, null, 2)}
      </h1> */}
    </>
  );
};

export default memo(Map);
