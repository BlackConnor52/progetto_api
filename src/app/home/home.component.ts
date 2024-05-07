import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

declare var google: any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  map: any;

  utenti:any[]=[]
  idutente!:number
  utente:any[]=[]
  markerPosition!: google.maps.LatLngLiteral ;
  constructor(private service:ServiceService){}
  async ngOnInit(): Promise<void>  {
    this.service.getUtenti().subscribe((data)=> {
      this.utenti=data
    },
    (error) => {
      console.error('Errore durante il recupero dei dati', error);
    })
    await this.initMap();
  }


  async initMap(): Promise<void> {
    const position = this.markerPosition;

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.map = new Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 4,
        center: position,
        mapId: 'DEMO_MAP_ID',
      }
    );

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      title: 'Uluru'
    });
  }

  getUtenteService(idutente:number){
    this.utente=[]
    this.service.getUtente(idutente).subscribe((data)=>{
      this.utente.push(data)
      const geoObject = this.utente[0].address.geo;
      if (geoObject && typeof geoObject.lat === 'string' && typeof geoObject.lng === 'string') {
        this.markerPosition = {
          lat: parseFloat(geoObject.lat), 
          lng: parseFloat(geoObject.lng)  
        };
        console.log(this.markerPosition);
        this.initMap(); 
      } else {
        console.error('Coordinate non valide:', geoObject);
      }
    },
    (error) => {
      console.error('Errore nella richiesta HTTP:', error);
      console.log(idutente)
    })
    
  }
  
  
}
