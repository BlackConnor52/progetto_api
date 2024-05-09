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
    await this.initMap();
    let list=JSON.parse(localStorage.getItem('utenti')??'')
    if(list.length==0){
      this.service.getUtenti().subscribe({
      next: (data) => {
        this.utenti = data;
        
      },
      error: (error) => {
        console.error('Errore durante il recupero dei dati', error);
      },
      complete: () => {
    
      }
    });
    }
    else{
      this.utenti=list
    }
    
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
      title: 'geo'
    });
  }

  getUtenteService(idutente:number){
    this.utente=[]
    
    this.service.getUtente(idutente).subscribe((data)=>{
      console.log('sono dentro la ricerca '+data)
      this.utente.push(data)
      const geoObject = this.utente[0].address.geo;
      if (geoObject && typeof geoObject.lat === 'string' && typeof geoObject.lng === 'string') {
        this.markerPosition = {
          lat: parseFloat(geoObject.lat), 
          lng: parseFloat(geoObject.lng)  
        };
        this.initMap(); 
      } else {
        console.error('Coordinate non valide:', geoObject);
      }
    },
    (error) => {
      console.error('Errore nella richiesta HTTP:', error);
    })
    
  }
  
  
}
