import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import fixUtf8 from 'fix-utf8';

import { Legend, Square, Round, VBox, HBox } from '.../../components/legend'

import 'ol/ol.css';
import './map.css';

const setupMapLayers = (map) => {
  const TileLayer = require('ol/layer/Tile').default;
  const VectorLayer = require('ol/layer').Vector;
  const VectorSource = require('ol/source').Vector;
  const GeoJSON = require('ol/format/GeoJSON').default;
  const Stamen = require('ol/source/Stamen').default;
  const styles = require('./styles').default;


  // Base
  map.addLayer(
    new TileLayer({
      source: new Stamen({
        layer: 'terrain',
      }),
      opacity: 0.3,
      minZoom: 14.5,
    })
  )
  // Buildings
  /*import('./data/batiments-simple.json').then(data => {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data)
        }),
        zIndex: 100,
        minZoom: 16,
        style: styles.batiment
      })
    )
  })*/
  // Routes
  import('./data/routes-web-simple.json').then(data => {
    map.addLayer(
      new VectorLayer({
        id: 'routes',
        name: 'routes',
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data)
        }),
        zIndex: 80,
        style: styles.routes.base
      })
    )
  })
  // Data
  import('./data/ppb-web-simple.json').then(data => {
    map.addLayer(
      new VectorLayer({
        id: 'ppb',
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data)
        }),
        zIndex: 90,
        style: function(feature) {
          const ppb = feature.get('P_REL');
          var espacesStyle = styles.ppb.nodata;
          if (ppb < -5) {
            espacesStyle = styles.ppb.verylittle;
          }
          if (ppb >= -5 && ppb < 0) {
            espacesStyle = styles.ppb.little;
          }
          if (ppb >= 0 && ppb < 5) {
            espacesStyle = styles.ppb.more;
          }
          if (ppb >= 5 && ppb < 10) {
            espacesStyle = styles.ppb.enough;
          }
          if (ppb >= 10 && ppb < 15) {
            espacesStyle = styles.ppb.morethanenough;
          }
          if (ppb >= 15) {
            espacesStyle = styles.ppb.waymorethanenough;
          }
          return [ styles.ppb.background, espacesStyle ];
        }
      })
    )
  })
  // Commerce 
  import('./data/commerces-simple.json').then(data => {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data)
        }),
        minZoom: 15,
        zIndex: 110,
        style: function(feature) {
          var type = feature.get('COMMERCE');
          if (type === 'nourriture') {
            return styles.commerce.nourriture     
          } else if (type === 'pharmacie') {
            return styles.commerce.pharmacie     
          } else {
            return null
          }
        }
      })
    )
  })

  // Commerce 
  import('./data/places.json').then(data => {
    map.addLayer(
      new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data)
        }),
        zIndex: 120,
        style: styles.places
      })
    )
  })
  // End
}

const setupMapEvents = (map, messageContainer) => {
  const GeoJSON = require('ol/format/GeoJSON').default;
  const styles = require('./styles').default;


  var zoom = map.getView().getZoom();
  map.on('moveend', function(e) {
    var newZoom = map.getView().getZoom();
    if (zoom !== newZoom) {
      zoom = newZoom;

      let routesLayer = null;
      let dataLayer = null;
      map.getLayers().forEach(l => {
        if (l.get('id') === 'routes') {
          routesLayer = l
        }
        if (l.get('id') === 'ppb') {
          dataLayer = l
        }
      })
      if (zoom >= 16 && zoom < 18.5) {
          if (routesLayer.featuresType !== 'complete-zoomed') {
            let routesSource = routesLayer.getSource()
            import('./data/routes-web.json').then(data => {
              routesSource.clear()
              routesSource.addFeatures((new GeoJSON()).readFeatures(data)) // routes
              routesLayer.featuresType = 'complete-zoomed'
            })
          }

          if (dataLayer.featuresType !== 'complete-zoomed') {
            let dataSource = dataLayer.getSource()
            import('./data/ppb-web.json').then(data => {
              dataSource.clear()
              dataSource.addFeatures((new GeoJSON()).readFeatures(data)) // ppb
              dataLayer.featuresType = 'complete-zoomed'
            })
          }
      } else if (zoom >= 18.5) {
          if (routesLayer.featuresType !== 'complete-veryzoomed') {
            let routesSource = routesLayer.getSource()
            import('./data/routes-web.json').then(data => {
              routesSource.clear()
              routesSource.addFeatures((new GeoJSON()).readFeatures(data)) // routes
              routesLayer.featuresType = 'complete-veryzoomed' 
            })
          }
          if (dataLayer.featuresType !== 'complete-veryzoomed') {
            let dataSource = dataLayer.getSource()
            import('./data/ppb-web.json').then(data => {
              dataSource.clear()
              dataSource.addFeatures((new GeoJSON()).readFeatures(data)) // ppb
              dataLayer.featuresType = 'complete-veryzoomed'
            })
          }
      } else {
          if (routesLayer.featuresType !== 'complete-dezoomed') {
            let routesSource = routesLayer.getSource()
            import('./data/routes-web-simple.json').then(data => {
              routesSource.clear()
              routesSource.addFeatures((new GeoJSON()).readFeatures(data)) // routesSimple
              routesLayer.featuresType = 'complete-dezoomed'
            })
          }

          if (dataLayer.featuresType !== 'complete-dezoomed') {
            let dataSource = dataLayer.getSource()
            import('./data/ppb-web-simple.json').then(data => {
              dataSource.clear()
              dataSource.addFeatures((new GeoJSON()).readFeatures(data)) // ppb
              dataLayer.featuresType = 'complete-dezoomed'
            })
          }
      }

      if (zoom > 17) {
        routesLayer.setStyle(function(feature) { 
          var intervention = feature.get('INTERVENTI');
          var iStyle = styles.routesInterventions.base
          
          if (intervention === 'parking') {
            iStyle = styles.routesInterventions.parking
          } else if (intervention === 'velo') {
            iStyle = styles.routesInterventions.velo
          } else if (intervention === 'pieton') {
            iStyle = styles.routesInterventions.pieton
          } else if (intervention === 'demi-pieton') {
            iStyle = styles.routesInterventions.pieton
          } 

          return iStyle
        })
      } else {
        routesLayer.setStyle(styles.routes.base)
      }
    }
  });

  map.on('pointermove', function(e) {
    var selected = null;
    if (selected !== null) {
      selected = null;
    }

    map.forEachFeatureAtPixel(e.pixel, function(f) {
      selected = f
      return true;
    });

    if (selected) {
      var selection;
      var details;
      if (selected.get('INTERVENTI')) {
        selection = selected.get('INTERVENTI')

        details = selected.get('PK_INTER') || '';
        if (selection === 'no') {
          messageContainer.current.innerHTML = '🚗';
        } else if (selection === 'parking') {
          messageContainer.current.innerHTML = '🅿️';
        } else {
          messageContainer.current.innerHTML = '🚧 ' + fixUtf8(details);
        }
      } else if (selected.get('P_REL')) {
        messageContainer.current.innerHTML = '🚶🏿 Queuing places : available (<b>' + (selected.get('PLACES') / 2)  + '</b>) - need (<b>' + selected.get('P_BESOIN_s') + '</b>) = <b>' + selected.get('P_REL') + '</b>';
      } else if (selected.get('NOM')) {
        messageContainer.current.innerHTML = '<b>' + fixUtf8(selected.get('NOM')) + '</b>';
      } else if (selected.get('EGID')) {
        messageContainer.current.innerHTML = '🏢';
      }
    } else {
      messageContainer.current.innerHTML = 'Hover for more info';
    }
  });
}


const GenevCovidMapContainer = styled.div`
  label: geneva-covid-map-container;
  height: 600px;
  margin: 0;
  overflow: hidden;
  background: white;

  @media (max-width: 600px) {
    height: 400px;
    min-height: 400px;
  }
`

const Message = styled.div`
  width: calc(100% - 2px);
  max-width: 37rem;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-family:"IBM Plex Mono", -apple-system,BlinkMacSystemFont, sans-serif;
  font-size: 0.8rem;
  font-style: italic;
  line-height: 0.8rem;

  /*background: #ffe2be;*/
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-top-width: 0;
  color: black;
  border-color: #f0cbab;
  text-align: center;


  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`

const TheMap = () => {
  const mapContainer = useRef('map');
  const messageContainer = useRef('message');
  
  useEffect(() => {
      const { Map, View } = require('ol');
      const { fromLonLat } = require('ol/proj');
      const { defaults } = require('ol/interaction');

      let map = new Map({
        interactions: defaults({ mouseWheelZoom:false }),
        target: mapContainer.current,
        view: new View({
          center: fromLonLat([6.150, 46.204]),
          zoom: 16,
          minZoom: 13.6,
        })
      })
  
      if (map) {
        setupMapLayers(map);
        setupMapEvents(map, messageContainer);
      }
  }, [])

  return (
    <div className="map-container" style={{backgroundColor:  'white', color: 'black', margin: 0, overflow:'hidden'}}>
      <GenevCovidMapContainer 
        style={{width: '100%', height: 500}} 
        ref={mapContainer} 
        id="geneva-covid-map" />
      <Message id="geneva-covid-legend-message" ref={messageContainer}>
        <i>Hover your mouse over things for more details. Click on the +/- buttons to zoom</i>
      </Message>
      <Legend>
        <HBox>
            <Square bg="#fcae91" label=" > 5 (OK)" />
            <Square bg="#FC9272" label="< 5" />
            <Square bg="#CB181D" label="< 0" />
            <Square bg="#a50f15" label="< -5 (Critical)" />
        </HBox>
        <HBox>
            <Round bg="#74a9cf" outline="#5C87A5" label="Supermarket" />
            <Round bg="#addd8e" outline="#8AB071" label="Chemist" />
        </HBox>
      </Legend>
    </div>
  )
}


export default () => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return <TheMap />
  }
  return null;
}
