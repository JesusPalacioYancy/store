import { Component, Input, SimpleChange, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration : number = 0;
  @Input({required: true}) message : string = '';
  counter = signal(0);
  counterRef: number | undefined

  constructor(){
    // NO ASYNC
    // antes de nuestro componente.
    // solo corre una vez.
    console.log('constructor');
    console.log('-'.repeat(10));
  };

  ngOnChanges(changes: SimpleChange){
    // Detecta los cambios.
    // antes de durante render 
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration']; // 
    if(duration && duration.currentValue !== duration.previousValue) {
      this.doSomthing();
    };  
  };

  ngOnInit(){
    // Despues del render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('Duration =>', this.duration)
    console.log('Message =>', this.message)
    this.counterRef = window.setInterval(()=>{ //
      console.log('Run counter');
      this.counter.update((statePrve)=> statePrve + 1)
    }, 1000);
  };

  ngAfterViewInit(){
    // Despues del render
    // hijos ya fueron renderisados.
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  };

  ngOnDestroy(){
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef)
  };

  doSomthing(){
    console.log('change duration')
  };



  



};
