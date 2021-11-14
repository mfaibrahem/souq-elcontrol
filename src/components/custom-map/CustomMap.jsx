/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo, useEffect } from 'react';
import Geocode from 'react-geocode';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useLoadScript,
  InfoBox
} from '@react-google-maps/api';
import useGeoLocation from '../../custom-hooks/useGeoLocation';
import { useCallback } from 'react';
import './CustomMap.scss';

const libraries = ['places'];
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  sensor: true
};
const infoBoxOptions = {
  closeBoxURL: '',
  enableEventPropagation: true
};
const CustomMap = (props) => {
  const {
    width,
    height,
    selectedLocation,
    setSelecectedLocation,
    selectedAddress,
    setSelectedAddress
  } = props;
  const location = useGeoLocation();
  const containerStyle = {
    width: width ? width : '100vw',
    height: height ? height : '80vh'
  };

  const [autoComplete, setAutoComplete] = useState(null);
  const [center, setCenter] = useState({ lat: '', lng: '' });
  console.log('location : ', location);
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

  // useEffect(() => {
  //   setSelecectedLocation({
  //     lat: center.lat,
  //     lng: center.lng
  //   });
  // }, [center.lat, center.lng]);

  useEffect(() => {
    if (selectedLocation.lat && selectedLocation.lng) {
      Geocode.fromLatLng(selectedLocation.lat, selectedLocation.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          // console.log(response);
          // setAdd()
          setSelectedAddress(address);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [selectedLocation.lat, selectedLocation.lng]);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
    language: 'ar'
  });
  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  }, []);

  const autoCompOnLoad = useCallback((autocomp) => {
    // console.log('autocomplete: ', autocomp);
    setAutoComplete(autocomp);
  }, []);

  const onPlaceChanged = useCallback(() => {
    // console.log('auto complete : ', autoComplete);
    if (autoComplete !== null) {
      // console.log("autocomplete getPlace(): ", autoComplete.getPlace());
      // console.log("autocomplete", autoComplete);
      if (autoComplete.getPlace()?.geometry?.location) {
        setSelecectedLocation({
          lat: autoComplete.getPlace().geometry.location.lat(),
          lng: autoComplete.getPlace().geometry.location.lng()
        });
      }
      setSelectedAddress(autoComplete.getPlace().formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }, []);

  // const onLoadMarker = marker => {
  // 	console.log("marker: ", marker);
  // };
  const handleMarkerDragStart = useCallback(() => {
    setSelectedAddress('');
  }, []);
  const handleMarkerDragEnd = useCallback((e) => {
    console.log(e);
    setSelecectedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  }, []);

  const onLoadInfoBox = useCallback((info) => {
    console.log('infoBox: ', info);
  }, []);

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
          <Autocomplete onLoad={autoCompOnLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Enter your place..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `332px`,
                height: `48px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%)',
                textAlign: 'left',
                direction: 'ltr'
              }}
            />
          </Autocomplete>

          <Marker
            // icon={mapIcon}
            // onLoad={onLoadMarker}
            position={
              selectedLocation.lat && selectedLocation.lng
                ? selectedLocation
                : center
            }
            draggable={true}
            onDragStart={handleMarkerDragStart}
            onDragEnd={handleMarkerDragEnd}
          />

          {selectedAddress && (
            <InfoBox
              onLoad={onLoadInfoBox}
              options={infoBoxOptions}
              position={
                selectedLocation?.lat && selectedLocation?.lng
                  ? selectedLocation
                  : center
              }
              style={{
                transform: 'translate(-50%)'
              }}
            >
              <div
                style={{
                  backgroundColor: '#00a6ff',
                  opacity: 0.9,
                  padding: 12,
                  width: '220px',
                  borderRadius: '5px'
                }}
              >
                <div style={{ fontSize: 16, color: `#fff` }}>
                  {selectedAddress}
                </div>
              </div>
            </InfoBox>
          )}
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
      </h1>
      <h1>
        address:
        {selectedAddress}
      </h1> */}
    </>
  );
};

export default memo(CustomMap);
