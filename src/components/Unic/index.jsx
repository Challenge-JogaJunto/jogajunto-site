import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";
import Title from "../../Title";

function UnicMap({ title, lat, lng, mapHeight, zoom = 15 }) {
  const [isOpen, setIsOpen] = useState(true);

  const position = {
    lat: isNaN(lat) ? 0 : lat,
    lng: isNaN(lng) ? 0 : lng,
  };

  const handleMarkerClick = () => {
    window.open(
      `https://www.google.com/maps?q=${position.lat},${position.lng}`,
      "_blank"
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: mapHeight || "400px",
          borderRadius: "10px",
        }}
        center={position}
        zoom={zoom}
      >
        <Marker
          position={position}
          title={title}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <InfoWindow position={position} onCloseClick={() => setIsOpen(false)}>
            <div>
              <Title>
                <h3 style={{ color: "#000", textAlign: "center" }}>{title}</h3>
              </Title>
              <button
                className="btn btn-primary w-100"
                onClick={handleMarkerClick}
              >
                Abrir no Google Maps
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default UnicMap;
