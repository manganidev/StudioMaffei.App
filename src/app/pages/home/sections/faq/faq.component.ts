import { Component } from '@angular/core';
import { FAQ } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  protected readonly faq = FAQ;
}
