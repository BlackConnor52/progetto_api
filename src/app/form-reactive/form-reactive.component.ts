import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})
export class FormReactiveComponent implements OnInit{
  
  utenti:any[]=[]
  formReactive!: FormGroup;
  lastid!:any

  constructor(private service:ServiceService){}

  ngOnInit(): void {

    this.formReactive = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl(null),
        suite: new FormControl(null),
        city: new FormControl(null),
        zipcode: new FormControl(null),
        geo: new FormGroup({
          lat: new FormControl(null, [Validators.required, Validators.pattern('[/^(-?\d{1,2}\.\d{4})$/]*')]),
          lng: new FormControl(null, [Validators.required, Validators.pattern('[/^(-?\d{1,3}\.\d{4})$/]*')])
        })
      })
    })
    
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

  

  incremento_id(){
    this.lastid=this.utenti.length
    this.lastid++;
    this.formReactive.patchValue({
      id: this.lastid
    });
  }


  onSubmit(){
    this.incremento_id()
    console.log(this.lastid)
    this.utenti.push(this.formReactive.value)
    this.service.salvaDatiUtentiLocalStorage(this.utenti);
    console.log(this.utenti)
    this.formReactive.reset();

  }

}

