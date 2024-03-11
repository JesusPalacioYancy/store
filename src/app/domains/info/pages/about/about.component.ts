import { Component, input, signal,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '@shared/components/counter/counter.component'
import { WaveAudioComponent } from './../../../info/components/wave-audio/wave-audio.component'
import { HighlightDirective } from '@shared/directives/highlight.directive'
import { HeaderComponent } from "../../../shared/components/header/header.component";


@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    imports: [CommonModule, CounterComponent, WaveAudioComponent, HighlightDirective, HeaderComponent]
})
export default class AboutComponent {

  postDuration = signal(1000);
  postMessage = signal('hello word');


  changeDuration(event: Event){
    const input = event.target as HTMLInputElement
    this.postDuration.set(input.valueAsNumber)
  };

  changeMessage(event: Event){
    const input = event.target as HTMLInputElement
    this.postMessage.set(input.value)
  };


};
