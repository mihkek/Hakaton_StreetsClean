import React from 'react'
import {  TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "leaflet-routing-machine";
import RoutingMachine from './routing/Routing';
import L from "leaflet";
import TehnikDirection from './routing/TehnikDirection';
import { MapConsumer } from 'react-leaflet';
import vehicle1 from '../styles/images/vehicle1.png' 

const  Map = (props) =>{
    /*
      Props
      1.onclick
    */
    const routs = useSelector(state => state.routs)
    const [state, setState] = useState({
      lat: 52.60383,
      lng: 39.58271,
      zoom: 13,
      isMapInit: false,
      map: {},
      clickedLat: 52.60383,
      clickedlng: 39.58271
    })
      const position = [state.lat, state.lng];

      return (
          <div className="map-wrapper" >
                <MapContainer
                  center={position}
                  zoom={6}
                  //maxZoom={10}
                  attributionControl={true}
                  zoomControl={true}
                  doubleClickZoom={true}
                  scrollWheelZoom={true}
                  dragging={true}
                  animate={true}
                  easeLinearity={0.35}
                  >
                  {routs.map((e, index) => 
                      <TehnikDirection 
                          RouteId={e.routeId}
                          Routs={e.points}
                          Line_color={e.line_color}
                          Route_name={e.name}
                          TypeTeh={e.typeTeh}
                          SendRouteParams={props.onclick}
                          TehnikMarkerPosiniton = {e.tehnikPosition}
                          MarkerIconShadow = {undefined}
                          LastPoint = {e.lastPoint}
                      />
                  )}
                  <TileLayer
                      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  
                  {/* <Marker position={[57.74, 11.94]}>
                      <Popup>
                      Popup for any custom information.
                      </Popup>
                  </Marker> */}
                </MapContainer>
        </div>
      );
}
export default Map