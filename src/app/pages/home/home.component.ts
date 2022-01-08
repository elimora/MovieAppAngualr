import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-responce';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies:Movie[]=[]; 
  public moviesSlideShow:Movie[]=[];
  

  @HostListener('window:scroll', ['$event'])
  miOnScroll(){
    const pos=(document.documentElement.scrollTop||document.body.scrollTop) + 1300; 
    const max=(document.documentElement.scrollHeight || document.body.scrollHeight)
    //console.log({pos, max}); 

    if (pos>max) {
    
      if (this.peliculasServices.cargando) {
        return
      }
      this.peliculasServices.getCartelera().subscribe(movies=>{

        this.movies.push(...movies)
      })

    }
  }



  constructor(private peliculasServices:PeliculasService){
   
  }

  ngOnInit(): void {
    this.peliculasServices.getCartelera()
    .subscribe(movies=>{
      this.movies=movies; 
      this.moviesSlideShow=movies
    })
  }

  ngOnDestroy(): void {
    
   this.peliculasServices.resetCarteleraPage(); 
  }

}
